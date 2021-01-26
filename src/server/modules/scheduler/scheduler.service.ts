import { HttpService, Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Store, StoreService } from '../domain/store';
import { Item, ItemService } from '../domain/item';
import OnAxiosError from '../../util/types/OnAxiosError';
import { Price, PriceService } from '../domain/price';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { getPrice } from '~server/util/math.utils';

@Injectable()
export class SchedulerService {
    private readonly SEARCH_BY: string = 'крупа гречневая';
    private readonly STORES_URL: string = 'https://stores-api.zakaz.ua/stores';
    private readonly log = new Logger(SchedulerService.name);
    private readonly requestConfig: AxiosRequestConfig = {
        headers: {
            'Accept-Language': 'ru',
        },
    };

    private readonly priceService: PriceService;
    private readonly storeService: StoreService;
    private readonly itemService: ItemService;
    private readonly http: HttpService;

    public constructor(
        http: HttpService,
        storeService: StoreService,
        priceService: PriceService,
        itemService: ItemService,
    ) {
        this.http = http;
        this.storeService = storeService;
        this.itemService = itemService;
        this.priceService = priceService;
    }

    @Timeout(1000)
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    public async loadItems(): Promise<void> {
        this.log.log('STARTED [loadItems] JOB');
        const storesResponse: AxiosResponse = await this.getStores();
        const stores: Store[] = this.asStores(storesResponse.data);
        for (let i = 0; i < stores.length; i++) {
            const store: Store = await this.storeService.create(stores[i]);
            const storeId: string = store.id;
            const itemsResponse: AxiosResponse | null = await this.getItems(
                storeId,
            );
            if (itemsResponse === null) {
                continue;
            }
            const rawItems: undefined | any[] = itemsResponse.data?.results;
            if (typeof rawItems === 'undefined') {
                this.log.warn(`No items received from store [${storeId}]`);
                continue;
            }
            for (let ii = 0; ii < rawItems.length; ii++) {
                const rawItem: any = rawItems[ii];

                const item: Item = this.asItem(rawItem);
                item.store = store;
                const createdItem = await this.itemService.create(item);

                const price: Price = new Price();
                price.value = createdItem.currentPrice;
                price.item = createdItem;
                await this.priceService.create(price);
            }
        }
        this.log.log('FINISHED [loadItems] JOB');
    }

    private async getStores(): Promise<AxiosResponse> {
        const onUnexpected: OnAxiosError = (error: any) => {
            this.log.error(`Cannot retrieve stores`, error);
            return null;
        };
        return await this.getData(this.STORES_URL, onUnexpected, onUnexpected);
    }

    private async getItems(storeId: string): Promise<AxiosResponse> | null {
        const storeUrl: string = `${this.STORES_URL}/${storeId}`;
        const onUnexpected: OnAxiosError = (error: any) => {
            this.log.error(`Unexpected error in store [${storeId}]`, error);
            return null;
        };
        return await this.getData(
            `${storeUrl}/categories/buckwheat/products/`,
            async () => {
                const query: string = encodeURIComponent(this.SEARCH_BY);
                return await this.getData(
                    `${storeUrl}/products/search/?q=${query}`,
                    onUnexpected,
                    onUnexpected,
                );
            },
            onUnexpected,
        );
    }

    private async getData(
        url: string,
        onBadRequest: OnAxiosError,
        onUnexpected: OnAxiosError,
    ): Promise<AxiosResponse> | null {
        try {
            return await this.http.get(url, this.requestConfig).toPromise();
        } catch (e) {
            if (!e.isAxiosError || e.response?.status !== 404) {
                return await onUnexpected(e);
            }
            return await onBadRequest(e);
        }
    }

    private asStores(inbounds: any[]): Store[] {
        return inbounds.map((inbound: any) => {
            const store: Store = new Store();
            store.id = inbound.id;
            store.name = inbound.name;
            store.regionId = inbound.region_id;
            store.retailChain = inbound.retail_chain;
            return store;
        });
    }

    private asItem(rawItem: any): Item {
        const item: Item = new Item();
        const itemWeight: number = rawItem.weight;
        const isPacked: boolean = itemWeight !== 0;
        const newWeight: number = isPacked ? itemWeight : 1000;
        const price: number = rawItem.price;
        item.name = rawItem.title;
        item.weight = newWeight;
        item.imgUrl = rawItem.img?.s350x350;
        item.isPacked = isPacked;
        item.description = rawItem.description;
        item.webUrl = rawItem.web_url;
        item.sku = rawItem.sku;
        item.ean = rawItem.ean;
        item.producer = rawItem.producer?.trademark;
        item.currentPrice = getPrice(price, newWeight);
        item.packPrice = price;
        return item;
    }
}

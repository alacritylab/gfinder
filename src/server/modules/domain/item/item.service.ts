import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import {
    IPaginationOptions,
    paginate,
    Pagination,
} from 'nestjs-typeorm-paginate';
import SortBy from '../../../util/types/SortBy';
import { FilterDto } from './dto';

@Injectable()
export class ItemService {
    public constructor(
        @InjectRepository(Item)
        private readonly repository: Repository<Item>,
    ) {}

    /**
     * @date 2021-01-26
     * @param {any} item:Item
     * @returns {any}
     */
    public async create(item: Item): Promise<Item> {
        const existingItem: Item | null = await this.findOne(item);
        if (!!existingItem) {
            delete item.id;
            const newItem: Item = Object.assign(existingItem, item);
            await this.repository.update(existingItem.id, newItem);
            return newItem;
        }
        return await this.repository.save(item);
    }

    /**
     * @date 2021-01-26
     * @param {any} item:Item
     * @returns {any}
     */
    public async findOne(item: Item): Promise<Item | null> {
        const existing = await this.repository.findOne({
            store: item.store,
            name: item.name,
            weight: item.weight,
        });
        if (!existing) {
            return null;
        }
        return existing;
    }

    public async findById(id: string): Promise<Item | null> {
        const existing = await this.repository.findOne({ id });
        return !!existing ? existing : null;
    }

    /**
     * @returns Promise
     */
    public async findAll(): Promise<Item[]> {
        return await this.repository.find({ relations: ['storeId'] });
    }

    /**
     * @param  {IPaginationOptions} options
     * @param  {SortBy} sortBy
     * @param  {any} parameters
     * @returns Promise
     */
    async paginate(
        options: IPaginationOptions,
        sortBy: SortBy,
        parameters: FilterDto,
    ): Promise<Pagination<Item>> {
        const queryBuilder = this.repository.createQueryBuilder('item');
        parameters.minPrice
            ? queryBuilder.andWhere('item.currentPrice >= :minPrice', {
                  minPrice: parameters.minPrice,
              })
            : null;
        parameters.maxPrice
            ? queryBuilder.andWhere('item.currentPrice <= :maxPrice', {
                  maxPrice: parameters.maxPrice,
              })
            : null;
        parameters.producers
            ? queryBuilder.andWhere('item.producer IN (:...producers)', {
                  producers: parameters.producers.split(','),
              })
            : null;
        queryBuilder
            .leftJoinAndSelect('item.store', 'store')
            .leftJoinAndSelect('item.prices', 'prices')
            .orderBy('item.currentPrice', sortBy)
            .cache(60000);
        return paginate<Item>(queryBuilder, options);
    }

    async getFilters() {
        const filters = [
            { name: 'Вага', colomnName: 'weight', type: 'slider', dataSet: [] },
            {
                name: 'Виробник',
                colomnName: 'producer',
                type: 'selector',
                dataSet: [],
            },
        ];
        for (const filter of filters) {
            const queryBuilder = this.repository.createQueryBuilder('item');
            if (filter.type === 'selector') {
                queryBuilder.select(
                    `item.${filter.colomnName}`,
                    filter.colomnName,
                );
                queryBuilder.addGroupBy(filter.colomnName);
                filter.dataSet = (await queryBuilder.getRawMany()).map(
                    (rawItem) => rawItem[filter.colomnName],
                );
            } else {
                queryBuilder.select(`MAX(item.${filter.colomnName})`, 'max');
                queryBuilder.addSelect(`MIN(item.${filter.colomnName})`, 'min');
                filter.dataSet = await queryBuilder.getRawOne();
            }
            delete filter.colomnName;
        }
        return filters;
    }
}

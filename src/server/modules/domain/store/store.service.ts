import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class StoreService {
    public constructor(
        @InjectRepository(Store)
        private readonly repository: Repository<Store>,
    ) {}

    /**
     * @param  {Store} store
     * @returns Promise<Store | null>
     */
    public async create(store: Store): Promise<Store | null> {
        const existingStore: Store | null = await this.findOne(store);
        if (!!existingStore) {
            delete store.id;
            const newStore: Store = Object.assign(existingStore, store);
            await this.repository.update(existingStore.id, newStore);
            return newStore;
        }
        return await this.repository.save(store);
    }

    /**
     * @returns Promise<Store[]>
     */
    public async findAll(): Promise<Store[]> {
        return await this.repository.find();
    }

    /**
     * @param  {Store} store
     * @returns Promise<Store | null>
     */
    public async findOne(store: Store): Promise<Store | null> {
        const existing = await this.repository.findOne(store);
        if (!existing) {
            return null;
        }
        return existing;
    }

    /**
     * @param  {string} id
     * @param  {Store} store
     * @returns Promise
     */
    public async update(id: string, store: Store): Promise<Store> {
        const toUpdate = await this.repository.findOne({ id });
        const updated = Object.assign(toUpdate, store);
        return await this.repository.save(updated);
    }

    /**
     * @param  {IPaginationOptions} options
     * @param  {} query
     * @returns Promise
     */
    async paginate(
        options: IPaginationOptions,
        query,
    ): Promise<Pagination<Store>> {
        const queryBuilder = this.repository.createQueryBuilder('store');
        queryBuilder.leftJoinAndSelect('store.regionId', 'regionId');
        return paginate<Store>(queryBuilder, options);
    }
}

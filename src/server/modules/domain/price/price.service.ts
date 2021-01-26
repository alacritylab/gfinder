import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './price.entity';

@Injectable()
export class PriceService {
    public constructor(
        @InjectRepository(Price)
        private readonly repository: Repository<Price>,
    ) {}

    /**
     * @date 2021-01-26
     * @param price:Price
     * @returns Promise<Price>
     */
    public async create(price: Price): Promise<Price> {
        const existing: Price | null = await this.findOne(price);
        if (!!existing) {
            delete price.id;
            const newPrice: Price = Object.assign(existing, price);
            await this.repository.update(existing.id, newPrice);
            return newPrice;
        }
        return await this.repository.save(price);
    }

    /**
     * @date 2021-01-26
     * @param price:Price
     * @returns Promise<Price | null>
     */
    public async findOne(price: Price): Promise<Price | null> {
        const existing = await this.repository.findOne({
            item: price.item,
            createdAt: price.createdAt,
        });
        if (!existing) {
            return null;
        }
        return existing;
    }
}

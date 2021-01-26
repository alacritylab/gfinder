import { Test, TestingModule } from '@nestjs/testing';
import { PriceService } from '.';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Price } from './price.entity';
import { Item } from '../item';

describe('PriceService', () => {
    let service: PriceService;
    let module: TestingModule;
    let priceRepositoryMock: MockType<Repository<Price>>;
    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                PriceService,
                {
                    provide: getRepositoryToken(Price),
                    useFactory: repositoryMockFactory,
                },
            ],
        }).compile();
        service = module.get<PriceService>(PriceService);
        priceRepositoryMock = module.get(getRepositoryToken(Price));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should update if already exists', async () => {
        let price = new Price();
        price.id = '1';
        price.item = new Item();
        price.value = 1;
        price.createdAt = new Date();

        jest.spyOn(priceRepositoryMock, 'findOne').mockReturnValue(price);
        jest.spyOn(priceRepositoryMock, 'save').mockReturnValue('created');

        expect(await service.create(price)).toEqual(price);
    });

    it('should create', async () => {
        let price = new Price();
        price.id = '1';
        price.item = new Item();
        price.value = 1;
        price.createdAt = new Date();

        jest.spyOn(priceRepositoryMock, 'findOne').mockReturnValue(null);
        jest.spyOn(priceRepositoryMock, 'save').mockReturnValue('created');

        expect(await service.create(price)).toEqual('created');
    });
});
// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
        findOne: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
        remove: jest.fn(),
        createQueryBuilder: jest.fn(),
    }),
);
export type MockType<T> = {
    [P in keyof T]: jest.Mock<{}>;
};

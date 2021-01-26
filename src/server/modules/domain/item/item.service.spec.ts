import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from '.';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Store } from '../store';

describe('ItemService', () => {
    let service: ItemService;
    let module: TestingModule;
    let itemRepositoryMock: MockType<Repository<Item>>;
    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                ItemService,
                {
                    provide: getRepositoryToken(Item),
                    useFactory: repositoryMockFactory,
                },
            ],
        }).compile();
        service = module.get<ItemService>(ItemService);
        itemRepositoryMock = module.get(getRepositoryToken(Item));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should update if already exists', async () => {
        let item = new Item();
        item.id = '1';
        item.name = 'name';
        item.store = new Store();
        item.weight = 1;

        jest.spyOn(itemRepositoryMock, 'findOne').mockReturnValue(item);
        jest.spyOn(itemRepositoryMock, 'save').mockReturnValue('created');

        expect(await service.create(item)).toEqual(item);
    });

    it('should create', async () => {
        let item = new Item();
        item.id = '1';
        item.name = 'name';
        item.store = new Store();
        item.weight = 1;

        jest.spyOn(itemRepositoryMock, 'findOne').mockReturnValue(null);
        jest.spyOn(itemRepositoryMock, 'save').mockReturnValue('created');

        expect(await service.create(item)).toEqual('created');
    });

    it('should find by id', async () => {
        let item = new Item();

        jest.spyOn(itemRepositoryMock, 'findOne').mockReturnValue(item);

        expect(await service.findById('1')).toEqual(item);
    });

    it('should return null if not found by id', async () => {
        let item = new Item();

        jest.spyOn(itemRepositoryMock, 'findOne').mockReturnValue(undefined);

        expect(await service.findById('1')).toEqual(null);
    });

    it('should find one', async () => {
        let item = new Item();
        jest.spyOn(itemRepositoryMock, 'findOne').mockReturnValue(item);
        expect(await service.findOne(item)).toEqual(item);
    });

    it('should return null if not found one ', async () => {
        let item = new Item();

        jest.spyOn(itemRepositoryMock, 'findOne').mockReturnValue(undefined);

        expect(await service.findOne(item)).toEqual(null);
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

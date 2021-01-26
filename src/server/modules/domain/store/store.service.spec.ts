import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from '.';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Store } from './store.entity';

describe('StoreService', () => {
    let service: StoreService;
    let module: TestingModule;
    let storeRepositoryMock: MockType<Repository<Store>>;
    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                StoreService,
                {
                    provide: getRepositoryToken(Store),
                    useFactory: repositoryMockFactory,
                },
            ],
        }).compile();
        service = module.get<StoreService>(StoreService);
        storeRepositoryMock = module.get(getRepositoryToken(Store));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // it('should create all', async () => {
    //     let newStore = new Store();
    //     newStore.name = 'name';
    //     newStore.regionId = '1';
    //     newStore.retailChain = '1';
    //     newStore.id = '1';
    //
    //     jest.spyOn(storeRepositoryMock, 'save').mockReturnValue('created all');
    //
    //     expect(await service.createAll([newStore, newStore])).toEqual(
    //         'created all',
    //     );
    // });

    // //WHY????
    // it.skip('should create', async () => {
    //     let store = new Store();
    //
    //     let newStore = new Store();
    //     newStore.name = 'name';
    //     newStore.regionId = '1';
    //     newStore.retailChain = '1';
    //     newStore.id = '1';
    //
    //     jest.spyOn(storeRepositoryMock, 'findOne').mockReturnValue(null);
    //
    //     expect(await service.create(newStore)).toEqual('created');
    // });

    it('should update if already exists', async () => {
        let store = new Store();
        store.id = '0';
        store.name = 'some-name';

        let newStore = new Store();
        newStore.name = 'name';
        newStore.regionId = '1';
        newStore.retailChain = '1';
        newStore.id = '1';

        jest.spyOn(storeRepositoryMock, 'findOne').mockReturnValue(store);
        jest.spyOn(storeRepositoryMock, 'save').mockReturnValue('created');

        const expectedStore: Store = new Store();
        expectedStore.name = 'name';
        expectedStore.regionId = '1';
        expectedStore.retailChain = '1';
        expectedStore.id = '0';

        expect(await service.create(newStore)).toEqual(expectedStore);
    });

    it('should find all', async () => {
        let store = new Store();

        jest.spyOn(storeRepositoryMock, 'find').mockReturnValue([store, store]);

        expect(await service.findAll()).toEqual([store, store]);
    });

    it('should find one', async () => {
        const store = new Store('1');
        jest.spyOn(storeRepositoryMock, 'findOne').mockReturnValue(store);
        expect(await service.findOne(new Store('1'))).toEqual(store);
    });

    it('should return null if not found', async () => {
        jest.spyOn(storeRepositoryMock, 'findOne').mockReturnValue(undefined);

        expect(await service.findOne(new Store('1'))).toEqual(null);
    });

    it('should update', async () => {
        let store = new Store();
        store.id = '1';
        store.logoUrl = 'path/to/image';
        store.regionId = '1';
        store.retailChain = '1';
        store.name = 'name';

        let update = new Store();
        update.id = '1';
        update.name = 'name';
        update.regionId = '1';
        update.retailChain = '1';

        jest.spyOn(storeRepositoryMock, 'findOne').mockReturnValue(store);
        jest.spyOn(storeRepositoryMock, 'save').mockReturnValue(store);

        expect(await service.update('1', update)).toEqual(store);
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

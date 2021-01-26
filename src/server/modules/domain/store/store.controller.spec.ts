import { Test, TestingModule } from '@nestjs/testing';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Store } from '.';
jest.mock('./store.service');

describe('StoreController', () => {
    let controller: StoreController;
    let service: StoreService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreController],
            providers: [StoreService],
        }).compile();
        service = module.get<StoreService>(StoreService);
        controller = module.get<StoreController>(StoreController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should find all', async () => {
        let store = new Store();
        let paginationMeta = {
            itemCount: 1,
            totalItems: 1,
            itemsPerPage: 1,
            totalPages: 1,
            currentPage: 1,
        };
        let result = new Pagination<Store>([store], paginationMeta);

        jest.spyOn(service, 'paginate').mockResolvedValue(result);

        expect(await controller.findAll(1, 1, '1')).toEqual(result);
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Item } from '.';
jest.mock('./item.service');

describe('ItemController', () => {
    let controller: ItemController;
    let service: ItemService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ItemController],
            providers: [ItemService],
        }).compile();
        service = module.get<ItemService>(ItemService);
        controller = module.get<ItemController>(ItemController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should find all', async () => {
        let store = new Item();
        let paginationMeta = {
            itemCount: 1,
            totalItems: 1,
            itemsPerPage: 1,
            totalPages: 1,
            currentPage: 1,
        };
        let result = new Pagination<Item>([store], paginationMeta);

        jest.spyOn(service, 'paginate').mockResolvedValue(result);

        expect(await controller.findAll(1, 1, '1', {})).toEqual(result);
    });
});

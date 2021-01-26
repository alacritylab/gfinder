import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import SortBy from '../../../util/types/SortBy';

@Controller('api')
@ApiTags('item')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Get('item/list')
    @ApiResponse({ status: 200, description: 'Successful Request' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    public async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 12,
        @Query('sortBy') sortBy: string,
        @Query() query: any,
    ): Promise<Pagination<Item>> {
        const sortByPrice: SortBy =
            sortBy === 'ASC' || sortBy === 'DESC' ? sortBy : 'ASC';
        return await this.itemService.paginate(
            {
                page,
                limit: limit > 100 ? 100 : limit,
                route: '/api/item/list',
            },
            sortByPrice,
            query,
        );
    }

    @Get('item')
    @ApiResponse({ status: 200, description: 'Successful Request' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    public async getPrices(
        @Query('itemId') itemId: string,
    ): Promise<Item | null> {
        const item: Item | null = await this.itemService.findById(itemId);
        return item === null ? null : item;
    }

    @Get('item/filters')
    @ApiResponse({ status: 200, description: 'Successful Request' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    public async getFilters(): Promise<any> {
        return await this.itemService.getFilters();
    }
}

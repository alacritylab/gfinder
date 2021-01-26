import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Store } from '.';
@Controller('api')
@ApiTags('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Get('store/list')
    @ApiResponse({ status: 200, description: 'Successful Request' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query() query,
    ): Promise<Pagination<Store>> {
        return await this.storeService.paginate(
            {
                page,
                limit: limit > 100 ? 100 : limit,
                route: '/api/store/list',
            },
            query,
        );
    }
}

import { HttpModule, Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ConfigModule } from '../config';
import { StoreModule } from '../domain/store';
import { ItemModule } from '../domain/item';
import { PriceModule } from '../domain/price';

@Module({
    imports: [HttpModule, ConfigModule, StoreModule, ItemModule, PriceModule],
    providers: [SchedulerService],
    exports: [SchedulerService],
})
export class SchedulerModule {}

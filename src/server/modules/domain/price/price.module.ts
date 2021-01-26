import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './price.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Price])],
    exports: [PriceService],
    providers: [PriceService],
})
export class PriceModule {}

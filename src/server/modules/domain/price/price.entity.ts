import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Item } from '../item';

@Entity({
    name: 'prices',
})
export class Price extends BaseEntity {
    @Index()
    @IsNotEmpty()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column({ nullable: false })
    public value: number;

    @Index()
    @ManyToOne((type) => Item, (item: Item) => item.id, {
        onDelete: 'CASCADE',
    })
    public item: Item;

    @IsNotEmpty()
    @CreateDateColumn()
    public createdAt: Date;
}

import {
    BaseEntity,
    Column,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Store } from '../store';
import { Price } from '../price';

@Entity({
    name: 'items',
})
export class Item extends BaseEntity {
    @Index()
    @IsNotEmpty()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    public name: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    public sku: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    public ean: string;

    @IsNotEmpty()
    @Column({ nullable: false })
    public weight: number;

    @IsNotEmpty()
    @Column({ nullable: false })
    public currentPrice: number;

    @IsNotEmpty()
    @Column({ nullable: false })
    public packPrice: number;

    @IsNotEmpty()
    @Column({ nullable: true })
    public description: string;

    @IsNotEmpty()
    @Column({ length: 1024, nullable: true })
    public producer: string;

    @IsNotEmpty()
    @Column({ length: 1024, nullable: true })
    public imgUrl: string;

    @IsNotEmpty()
    @Column({ length: 1024, nullable: true })
    public webUrl: string;

    @IsNotEmpty()
    @Column({ nullable: true })
    public isPacked: boolean;

    @Index()
    @ManyToOne((type) => Store, (store: Store) => store.id, {
        onDelete: 'CASCADE',
    })
    public store: Store;

    @OneToMany(() => Price, (price) => price.item)
    prices: Price[];

    public constructor(id?: string, name?: string, weight?: number) {
        super();
        this.id = id;
        this.name = name;
        this.weight = weight;
    }
}

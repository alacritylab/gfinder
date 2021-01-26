import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity({
    name: 'stores',
})
export class Store extends BaseEntity {
    @Index()
    @IsNotEmpty()
    @PrimaryColumn()
    public id: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: true })
    public name: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: true })
    public retailChain: string;

    @IsNotEmpty()
    @Column({ length: 140, name: 'region_id' })
    public regionId: string;

    @IsNotEmpty()
    @Column({ length: 1000, nullable: true, name: 'logo_url' })
    public logoUrl: string;

    public constructor(
        id?: string,
        name?: string,
        retailChain?: string,
        regionId?: string,
        logoUrl?: string,
    ) {
        super();
        this.id = id;
        this.name = name;
        this.retailChain = retailChain;
        this.regionId = regionId;
        this.logoUrl = logoUrl;
    }
}

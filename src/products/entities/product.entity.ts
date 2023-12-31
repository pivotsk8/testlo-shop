import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./";

//Entitie es una representacion de una tabla en PG y de una collection en Mongo
@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column('float', {
        default: 0
    })
    price: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column('text', {
        unique: true
    })
    slug: string;

    @Column('int', {
        default: 0
    })
    stock: number;

    @Column('text', {
        array: true
    })
    sizes: string[];

    @Column('text')
    gender: string;

    @Column('text', {
        array: true,
        default: []
    })
    tags: string[]

    @OneToMany(
        () => ProductImage,
        (ProductImage) => ProductImage.product,
        {
            cascade: true,
            eager: true
        }
    )
    images?: ProductImage[];

    //verificaciones antes de
    @BeforeInsert()
    // cada vez que quiera insertar va a pasar por estas condiciones
    checkSlugInsert() {
        if (!this.slug) { this.slug = this.title }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

    // transforma antes de update
    @BeforeUpdate()
    checkSlugUpdate() {
        if (this.slug)
            this.slug = this.slug
                .toLowerCase()
                .replaceAll(' ', '_')
                .replaceAll("'", '')
    }

}


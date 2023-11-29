import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}


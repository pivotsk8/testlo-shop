import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//Entitie es una representacion de una tabla en PG y de una collection en Mongo
@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column('numeric', {
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

    @Column('int', {
        default: 0
    })

    @Column('text', {
        array: true
    })
    size: string[];

    @Column('text')
    gender: string;
}


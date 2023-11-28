import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//Entitie es una representacion de una tabla en PG y de una collection en Mongo
@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string
}


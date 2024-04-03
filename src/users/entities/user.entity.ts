import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User { // ? database table like schema 
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number; // ! auto incrementing int

    @ApiProperty()
    @Column()
    name?: string; // *** varchar

    @Column()
    other?: string // *** varchar

}
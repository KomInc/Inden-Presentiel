import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'utilisateurs' })
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public token: string;

    @Column()
    public calendar: string; //TODO : change type to iCals

}

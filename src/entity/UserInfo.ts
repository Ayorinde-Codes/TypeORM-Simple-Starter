import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Length} from 'class-validator';
import {User} from './User';

@Entity()
export class UserInfo{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 20)
    phone: number;

    @Column({name: "Sex"})
    sex: string;

    @Column({name: "Date of Birth"})
    dob: Date;

    @Column({name: "Address"})
    address: string;

    @Column({name: "Photo"})
    photo: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
}




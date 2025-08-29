import { BaseEntity, PrimaryGeneratedColumn, Column, Entity }  from "typeorm";

@Entity('User')

export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
    
   // @Column()
    //refreshToken: string;

    @Column()
    password: string;
}



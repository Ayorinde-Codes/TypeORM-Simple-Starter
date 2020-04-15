import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm";
  import { IsEmail, Length, IsNotEmpty } from "class-validator";
  import * as bcrypt from "bcryptjs";
  
  export type UserRoleType = "ADMIN" | "USER";

  @Entity()
  @Unique(["username"])
  @Unique(["email"])
  export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    firstName: string;

    @Column({nullable: true})
    lastName: string;
  
    @Column()
    @Length(4, 20)
    username: string;

    @Column({ name: 'email' })
    @IsEmail({}, { message: 'Incorrect email' })
    @IsNotEmpty({ message: 'The email field is required' })
    email: string;
  
    @Column()
    @Length(4, 100)
    password: string;
  
    @Column({
        type: "enum",
        enum: ["ADMIN", "USER"],
        default: "USER"
    })
    role: UserRoleType;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
  }

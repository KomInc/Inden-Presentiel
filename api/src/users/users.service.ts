import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(

        @InjectRepository(User)
        private repository: Repository<User>
    ) { }

    async create(): Promise<User> {

        const newUser = await this.repository.save({
            token: "token",
        });

        return newUser;

    }


    async getAllUsers(): Promise<User[]> {

        // return await this.repository.query("SELECT * FROM customer;");
        return await this.repository.find();
    }

    async getById(index: number): Promise<User> {

        const user = await this.repository.findOne(index);
        if (user) {
            return user;
        }
        throw new HttpException(`Could not find a user with the id ${index}`, HttpStatus.NOT_FOUND);

    }

    async getCalendar(index: number): Promise<any> {
        const user = await this.repository.findOne(index);
        if (user) {
            return user.calendar;
        }
        throw new HttpException(`Could not find a user with the id ${index}`, HttpStatus.NOT_FOUND);

    }

    async setCalendar(cl: any, index: number): Promise<void> {

        const user = await this.repository.findOne({ id: index });
        if (!user) {
            throw new HttpException(`Could not find a user with the id ${index}`, HttpStatus.NOT_FOUND);
        } else {
            await this.repository.update(index, { calendar: cl });
        }

    }

    async getToken(index: number): Promise<any> {
        const user = await this.repository.findOne(index);
        if (user) {
            return user.token;
        }
        throw new HttpException(`Could not find a user with the id ${index}`, HttpStatus.NOT_FOUND);

    }

    async setToken(tk: string, index: number): Promise<void> {

        const user = await this.repository.findOne({ id: index });
        if (!user) {
            throw new HttpException(`Could not find a user with the id ${index}`, HttpStatus.NOT_FOUND);
        } else {
            await this.repository.update(index, { token: tk });
        }

    }


    async update( cl: any, tk: string, index: number): Promise<User> {

        const user = await this.repository.findOne({ id: index });
        if (!user) {
            throw new HttpException(`Could not find a user with the id ${index}`, HttpStatus.NOT_FOUND);
        } else {
            user.calendar = (cl !== null) ? cl : user.calendar;
            user.token = (tk !== null) ? tk : user.token;
            const tmpUser = await this.repository.save(user);

            return tmpUser;
        }

    }


    async delete(index: number): Promise<boolean> {

        const deleteResponse = await this.repository.delete(index);
        if (!deleteResponse.affected) {
            throw new HttpException(`Could not find a user with the id ${index}`, HttpStatus.NOT_FOUND);

        } else
            return true;


    }

}

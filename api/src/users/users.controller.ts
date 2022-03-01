import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

// https://planning.univ-rennes1.fr/direct/myplanning.jsp?ticket=ST-1367723--IXEQKrhQ-HhwPDs08nOwPjwRp8vmjava-pcas1
// https://planning.univ-rennes1.fr/direct/myplanning.jsp?ticket=ST-1367723--IXEQKrhQ-HhwPDs08nOwPjwRp8vmjava-pcas1
// https://planning.univ-rennes1.fr/direct/myplanning.jsp?ticket=ST-1367723--IXEQKrhQ-HhwPDs08nOwPjwRp8vmjava-pcas1

@Controller('users')
export class UsersController {

    constructor(
        private service: UsersService
    ) { }

    @Post()
    create(@Body() input: any): Promise<User> {
        let user = this.service.create();
        return user;
    }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.service.getAllUsers();
    }

    @Get(':id')
    getById(@Param() parameter): Promise<User> {

        return this.service.getById(parameter.id);

    }

    @Put(':id')
    update(@Body() input: any, @Param() parameter: any): Promise<User> {
        return this.service.update(input.calendar, input.token, parameter.id);
    }

    @Delete(':id')
    delete(@Param() parameter:any): Promise<boolean> {
        return this.service.delete(parameter.id);
    }

    @Get(':id/calendar')
    getCalendar(@Param() parameter: any): Promise<number> {
        return this.service.getCalendar(parameter.id);
    }

}

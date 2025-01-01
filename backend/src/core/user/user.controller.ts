import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async findByTgId(@Param('id') id: number) {
        return await this.userService.findByTgId(id);
    }

    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Post()
    async create(@Body() data: CreateUserDto) {
        return await this.userService.create(data);
    }
}

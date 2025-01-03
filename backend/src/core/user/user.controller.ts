import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id/:lang')
    async findUserLanguages(@Param('id') tgId: string, @Param('lang') langSlug: string) {
        return await this.userService.findUserLanguages(tgId, langSlug);
    }

    @Get(':id/words')
    async findAllWords() {
        return await this.userService.findAllWords();
    }

    @Get(':id')
    async findByTgId(@Param('id') id: string) {
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

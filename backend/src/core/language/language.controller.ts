import { Body, Controller, Get, Post } from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLangDto } from './dto/create-lang.dto';

@Controller('language')
export class LanguageController {
    constructor(private readonly languageService: LanguageService) {}

    @Post()
    async create(@Body() data: CreateLangDto) {
        return await this.languageService.create(data);
    }

    @Get()
    async findAll() {
        return await this.languageService.findAll();
    }
}

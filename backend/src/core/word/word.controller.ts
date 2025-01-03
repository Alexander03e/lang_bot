import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { WordService } from './word.service';
import { EditWordDto } from './dto/edit-word.dto';
import { CreateWordDto } from './dto/create-word.dto';
import { CreateByUserLanguageDto } from './dto/create-by-user-language.dto';
import { WordQueries } from './types/query.interface';

@Controller('word')
export class WordController {
    constructor(private readonly wordService: WordService) {}

    @Post('byUser')
    @UsePipes(new ValidationPipe())
    async createByUser(@Body() data: CreateByUserLanguageDto) {
        return await this.wordService.createByUser(data);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() data: CreateWordDto) {
        return await this.wordService.create(data);
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        return await this.wordService.findById(id);
    }

    @Get()
    async findAll(@Query() query: WordQueries) {
        return await this.wordService.findAll(query);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: EditWordDto) {
        return await this.wordService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        console.log(id);
        return await this.wordService.delete(id);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordEntity } from './word.entity';
import { CreateWordDto } from './dto/create-word.dto';

@Injectable()
export class WordService {
    constructor(@InjectRepository(WordEntity) private wordRepository: Repository<WordEntity>) {}

    async create(data: CreateWordDto) {}

    async updateWord() {}
}

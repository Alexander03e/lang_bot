import { Injectable } from '@nestjs/common';
import { CreateLangDto } from './dto/create-lang.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageEntity } from './language.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguageService {
    constructor(
        @InjectRepository(LanguageEntity)
        private readonly languageRepository: Repository<LanguageEntity>,
    ) {}

    async create(data: CreateLangDto): Promise<LanguageEntity> {
        return await this.languageRepository.save(data);
    }

    async findAll(): Promise<LanguageEntity[]> {
        return await this.languageRepository.find();
    }
}

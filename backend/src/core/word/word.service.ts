import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordEntity } from './word.entity';
import { CreateWordDto } from './dto/create-word.dto';
import { EditWordDto } from './dto/edit-word.dto';
import { CreateByUserLanguageDto } from './dto/create-by-user-language.dto';
import { UserEntity } from '../user/user.entity';
import { LanguageEntity } from '../language/language.entity';
import { WordQueries } from './types/query.interface';
import dataSource from '../../../typeorm.config';
import { WordResponse } from './types/word-response.interface';

@Injectable()
export class WordService {
    constructor(
        @InjectRepository(WordEntity) private wordRepository: Repository<WordEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(LanguageEntity) private languageRepository: Repository<LanguageEntity>,
    ) {}

    async delete(id: number) {
        return await this.wordRepository.delete({ id });
    }

    async findById(id: number) {
        return await this.wordRepository.findOne({ where: { id } });
    }

    async createByUser(data: CreateByUserLanguageDto) {
        const { tgId, languageSlug, ...createdWord } = data;

        const word = new WordEntity();
        const user = await this.userRepository.findOne({
            where: {
                tgId,
            },
        });

        const language = await this.languageRepository.findOne({
            where: {
                slug: languageSlug,
            },
        });

        word.user = user;
        word.language = language;

        Object.assign(word, createdWord);

        return await this.wordRepository.save(word);
    }

    async create(data: CreateWordDto) {
        return await this.wordRepository.save(data);
    }

    async findAll(query: WordQueries): Promise<WordResponse> {
        const queryBuilder = dataSource
            .getRepository(WordEntity)
            .createQueryBuilder('words')
            .leftJoin('words.user', 'user');

        if (query?.tgId) {
            const user = await this.userRepository.findOne({
                where: {
                    tgId: query.tgId,
                },
            });

            queryBuilder.andWhere('words.userId = :id', {
                id: user.id,
            });
        }

        if (query?.languageSlug) {
            const language = await this.languageRepository.findOne({
                where: {
                    slug: query.languageSlug,
                },
            });

            queryBuilder.andWhere('words.languageId = :id', {
                id: language.id,
            });
        }

        if (query.limit) {
            queryBuilder.limit(query.limit);
        }

        if (query.offset) {
            queryBuilder.offset(query.offset);
        }

        const words = await queryBuilder.getMany();
        const total = await queryBuilder.getCount();

        return {
            words,
            total,
        };
    }

    async update(id: number, data: EditWordDto) {
        const findWord = await this.wordRepository.findOne({
            where: { id },
        });

        if (!findWord) {
            throw new NotFoundException('Слово не найдено');
        }

        Object.assign(findWord, data);
        return await this.wordRepository.save(findWord);
    }
}

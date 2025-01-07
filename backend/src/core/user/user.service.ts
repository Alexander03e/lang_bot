import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LanguageEntity } from '../language/language.entity';
import { WordEntity } from '../word/word.entity';
import { UserByIdResponse } from './types/user-by-id-response.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(LanguageEntity)
        private readonly languageRepository: Repository<LanguageEntity>,
        @InjectRepository(WordEntity)
        private readonly wordRepository: Repository<WordEntity>,
    ) {}

    async findAllWords(): Promise<WordEntity[]> {
        return await this.wordRepository.find();
    }

    async findByTgId(tgId: string, languageSlug?: string): Promise<UserByIdResponse> {
        const user = await this.userRepository.findOne({
            where: { tgId },
        });

        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        const wordsCount = await this.wordRepository.count({
            where: {
                user: {
                    id: user.id,
                },
                ...(languageSlug ? { language: { slug: languageSlug } } : {}),
            },
        });

        return { ...user, wordsCount };
    }

    async findUserLanguages(tgId: string, langSlug: string): Promise<LanguageEntity> {
        return await this.languageRepository.findOne({
            where: {
                slug: langSlug,
            },
        });
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async create(data: CreateUserDto): Promise<UserEntity> {
        const findUser = await this.userRepository.findOne({ where: { tgId: data.tgId } });

        if (findUser) {
            return findUser;
        }

        return await this.userRepository.save(data);
    }
}

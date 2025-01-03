import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from './word.entity';
import { LanguageEntity } from '../language/language.entity';
import { UserEntity } from '../user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([WordEntity]),
        TypeOrmModule.forFeature([LanguageEntity]),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [WordController],
    providers: [WordService],
})
export class WordModule {}

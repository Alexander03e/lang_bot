import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from './word.entity';
import { LanguageEntity } from '../language/language.entity';

@Module({
    imports: [TypeOrmModule.forFeature([WordEntity]), TypeOrmModule.forFeature([LanguageEntity])],
    controllers: [WordController],
    providers: [WordService],
})
export class WordModule {}

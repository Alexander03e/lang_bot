import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from './language.entity';
import { UserEntity } from '../user/user.entity';
import { WordEntity } from '../word/word.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([LanguageEntity]),
        TypeOrmModule.forFeature([UserEntity]),
        TypeOrmModule.forFeature([WordEntity]),
    ],
    controllers: [LanguageController],
    providers: [LanguageService],
})
export class LanguageModule {}

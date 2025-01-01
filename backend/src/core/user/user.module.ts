import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { LanguageEntity } from '../language/language.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), TypeOrmModule.forFeature([LanguageEntity])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { LanguageModule } from './core/language/language.module';
import { WordModule } from './core/word/word.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './core/user/user.module';
import { DatabaseModule } from './core/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        LanguageModule,
        WordModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

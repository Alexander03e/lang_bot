import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LanguageModule } from './core/language/language.module';
import { WordModule } from './core/word/word.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './core/user/user.module';
import { DatabaseModule } from './core/database/database.module';
import { AuthMiddleware } from './core/auth/auth.middleware';
import { AuthModule } from './core/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        LanguageModule,
        WordModule,
        UserModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude({ path: 'auth', method: RequestMethod.ALL })
            .forRoutes({
                path: '*',
                method: RequestMethod.ALL,
            });
    }
}

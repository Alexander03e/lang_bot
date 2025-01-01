require('module-alias/register');
import { ApiService } from '@app/core/api/api.service';
import { RedisService } from '@app/core/redis/redis.service';

import { Bot } from '@app/core/bot';
import * as dotenv from 'dotenv';

dotenv.config();

const bootstrap = async () => {
    const bot = new Bot(
        process.env.BOT_TOKEN as string,
        RedisService.getInstance(),
        ApiService.getInstance(),
    );

    await bot.launch();
};

bootstrap();

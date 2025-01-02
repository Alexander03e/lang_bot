import { Context, Markup } from 'telegraf';
import { emptyKeyboard } from '@app/shared/consts/common';
import { RedisService } from '@app/core/redis/redis.service';

export class MessageService {
    constructor(private readonly redisService: RedisService) {}

    async sendMessage(ctx: Context, message: string, keyboard?: Markup.Markup<any>) {
        if (!ctx?.chat?.id) return;

        try {
            const newMessage = await ctx.telegram.sendMessage(ctx.chat.id, message, {
                parse_mode: 'HTML',
                reply_markup: keyboard
                    ? keyboard.resize().reply_markup
                    : emptyKeyboard.reply_markup,
            });
        } catch (e) {}
    }
}

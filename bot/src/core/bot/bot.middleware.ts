import { Bot } from '@app/core/bot/index';

export class BotMiddleware {
    constructor(private readonly bot: Bot) {}

    launch() {
        this.bot.botInstance.use(async (ctx, next) => {
            if (ctx.callbackQuery) {
                ctx?.answerCbQuery();
            }

            next();
        });
    }
}

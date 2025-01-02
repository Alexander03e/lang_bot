import { Bot } from '@app/core/bot';

export class MessageController {
    constructor(private readonly bot: Bot) {}

    launch() {
        // this.bot.botInstance.on('message', ctx => {
        //     console.log(ctx);
        // });
        // this.bot.botInstance.command('menu', () => {});
    }
}

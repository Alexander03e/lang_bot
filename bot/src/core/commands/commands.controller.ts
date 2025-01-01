import { IController } from '@app/shared/types/controller.interface';
import { Bot } from '@app/core/bot';
import { DATA, ENTITIES } from '@app/shared/enums/api.enum';

export class CommandController implements IController {
    constructor(private readonly bot: Bot) {}

    launch() {
        this.bot.botInstance.start(async ctx => {
            console.log(ctx.from);
            // this.bot.stateService.setState(ctx.from.id.toString(), {test: 0})
            await this.bot.apiService.createUser({
                tgId: +ctx.from.id,
                username: ctx.from.username || DATA.HIDDEN,
            });
            ctx.reply(ctx.chat.id.toString());
        });
    }
}

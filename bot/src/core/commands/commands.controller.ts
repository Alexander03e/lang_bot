import { IController } from '@app/shared/types/controller.interface';
import { Bot } from '@app/core/bot';
import { DATA } from '@app/shared/enums/api.enum';
import { StartCommandMenu } from '@app/core/commands/commands.consts';
import { COMMANDS } from '@app/shared/consts/commands';
import { EScreen } from '@app/shared/enums/screens.enum';
import { Context } from 'telegraf';

export class CommandController implements IController {
    constructor(private readonly bot: Bot) {}

    launch() {
        this.bot.botInstance.start(async ctx => {
            console.log(ctx.from);
            // this.bot.stateService.setState(ctx.from.id.toString(), {test: 0})
            await this.bot.apiService.createUser({
                tgId: +ctx.from.id,
                username: ctx.from?.username || DATA.HIDDEN,
                first_name: ctx.from.first_name || null,
            });

            await this.bot.sendMessage(ctx, StartCommandMenu.text, StartCommandMenu.keyboard);
        });

        this.bot.botInstance.command(COMMANDS[EScreen.MAIN_MENU], (ctx: Context, next) => {
            this.bot.stateService.setState(ctx.chat?.id!, { openScreen: EScreen.WORDS });
            next();
        });
    }
}

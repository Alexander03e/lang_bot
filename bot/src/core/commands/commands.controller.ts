import { IController } from '@app/shared/types/controller.interface';
import { Bot } from '@app/core/bot';
import { DATA } from '@app/shared/enums/api.enum';
import { COMMANDS } from '@app/shared/consts/commands';
import { EScreen } from '@app/shared/enums/screens.enum';
import { Context } from 'telegraf';
import { StartCommandMenu } from '@app/shared/consts/common';

export class CommandController implements IController {
    constructor(private readonly bot: Bot) {}

    onStart() {
        this.bot.botInstance.start(async ctx => {
            await this.bot.apiService.createUser({
                tgId: +ctx.from.id,
                username: ctx.from?.username || DATA.HIDDEN,
                first_name: ctx.from.first_name || null,
            });

            await this.bot.sendMessage(ctx, StartCommandMenu.message, StartCommandMenu.keyboard);
        });
    }

    launch() {
        this.onStart();

        Object.entries(COMMANDS).map(([screen, command]) => {
            this.bot.botInstance.command(command, async (ctx: Context, next) => {
                await this.bot.stateService.setState(ctx.chat?.id!, {
                    openScreen: screen as EScreen,
                });
                await next();
            });
        });
    }
}

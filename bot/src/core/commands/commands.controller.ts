import { IController } from '@app/shared/types/controller.interface';
import { Bot } from '@app/core/bot';
import { DATA } from '@app/shared/enums/api.enum';
import { COMMANDS } from '@app/shared/consts/commands';
import { EBotLang, EScreen, EScreenAction } from '@app/shared/enums/screens.enum';
import { Context } from 'telegraf';
import { StateService } from '@app/shared/types/state.interface';
import { IState } from '@app/core/redis/redis.interface';
import { ScreenController } from '@app/core/screen/screen.controller';

export class CommandController implements IController {
    constructor(
        private readonly bot: Bot,
        private readonly stateService: StateService<IState>,
        private readonly screenController: ScreenController,
    ) {}

    onStart() {
        this.bot.botInstance.start(async ctx => {
            const tgId = ctx?.chat?.id;

            if (!tgId) return;

            const findUser = await this.bot.apiService.findByTgId(String(tgId));

            if (!findUser) {
                await this.bot.apiService.createUser({
                    tgId: String(ctx.from.id),
                    username: ctx.from?.username || DATA.HIDDEN,
                    first_name: ctx.from.first_name || null,
                });
            }

            const user = await this.stateService.setState(tgId, {
                tgId,
                lang: ctx.from.language_code === 'ru' ? EBotLang.RU : EBotLang.EN,
            });

            if (user?.language) {
                await this.screenController.open(ctx, EScreen.MAIN_MENU);

                return;
            }
            await this.screenController.open(ctx, EScreen.START_MENU);
        });
    }

    launch() {
        this.onStart();

        Object.entries(COMMANDS).map(([screen, command]) => {
            this.bot.botInstance.command(command, async (ctx: Context, next) => {
                //@ts-ignore
                await this.screenController.open(ctx, screen as EScreen, null, EScreenAction.SEND);

                await next();
            });
        });
    }
}

import { IController } from '@app/shared/types/controller.interface';
import { Bot } from '@app/core/bot';
import { EScreen } from '@app/shared/enums/screens.enum';
import { Context } from 'telegraf';
import { StartCommandMenu } from '@app/shared/consts/common';

export class ScreenController implements IController {
    constructor(private readonly bot: Bot) {}

    async open(ctx: Context, screen: EScreen) {
        switch (screen) {
            case EScreen.LANG_SELECT: {
                await this.bot.sendMessage(
                    ctx,
                    StartCommandMenu.message,
                    StartCommandMenu.keyboard,
                );
                return;
            }
            case EScreen.MAIN_MENU: {
                await this.bot.sendMessage(ctx, 'menu');
                return;
            }

            case EScreen.WORDS: {
                await this.bot.sendMessage(ctx, 'words');
                return;
            }

            default: {
                await this.bot.sendMessage(ctx, 'default');
            }
        }
    }

    launch() {
        this.bot.botInstance.use(async (ctx: Context, next) => {
            const tgId = ctx.chat?.id;
            if (!tgId) return;

            const state = await this.bot.stateService.getState(tgId);
            if (state.openScreen) {
                await this.bot.stateService.setState(tgId, {
                    prevScreen:
                        state.openScreen === state.currentScreen
                            ? state.prevScreen
                            : state.currentScreen,
                    currentScreen: state.openScreen,
                    openScreen: null,
                });

                await this.open(ctx, state.openScreen);
            }
            await next();
        });
    }
}

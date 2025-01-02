import { IController } from '@app/shared/types/controller.interface';
import { Bot } from '@app/core/bot';
import { EBotLang, EScreen, EScreenAction } from '@app/shared/enums/screens.enum';
import { Context, Markup } from 'telegraf';
import { ENTITIES } from '@app/shared/enums/api.enum';
import { TLanguage } from '@app/shared/types/api.types';
import { generateKeyboard } from '@app/core/screen/utils/generateKeyboard';
import { LANG_LABELS } from '@app/shared/consts/language';
import { ELangueage } from '@app/shared/enums/entities.enum';
import { SCREEN_TEXTS } from '@app/shared/consts/screens';
import { EBotActions } from '@app/shared/enums/actions.enum';
import { getMenuButtons } from '@app/shared/keyboards';
import { TRANSLATION } from '@app/shared/translation';

export class ScreenController implements IController {
    constructor(private readonly bot: Bot) {}

    async changeScreen(tgId: number, screen: EScreen) {
        const state = await this.bot.stateService.getState(tgId);
        await this.bot.stateService.setState(tgId, {
            prevScreen: screen === state.currentScreen ? state.prevScreen : state.currentScreen,
            currentScreen: screen,
            openScreen: null,
        });
    }

    async open(ctx: Context, screen: EScreen | null, action?: EScreenAction) {
        if (!screen) return;
        const user = await this.bot.stateService.getState(ctx?.chat?.id!);

        const userLang = user?.lang || EBotLang.RU;

        const botAction = (ctx: Context, message: string, keyboard?: Markup.Markup<any>) => {
            if (action === EScreenAction.EDIT || ctx.callbackQuery) {
                return this.bot.editMessage(ctx, message, keyboard);
            }

            return this.bot.sendMessage(ctx, message, keyboard);
        };

        const tgId = ctx?.chat?.id!;

        await this.changeScreen(tgId, screen);

        switch (screen) {
            case EScreen.START_MENU: {
                const languages = await this.bot.apiService.findAll<TLanguage[]>(ENTITIES.LANGUAGE);
                const formattedKeyboardData = languages.map(item => ({
                    label: LANG_LABELS[item.slug as ELangueage][userLang],
                    action: `action.${EBotActions.SELECT_LANGUAGE}.${item.slug}`,
                }));

                const message = SCREEN_TEXTS[screen][userLang];
                const keyboard = generateKeyboard(formattedKeyboardData);

                await botAction(ctx, message, keyboard);
                return;
            }

            case EScreen.LANG_SELECT: {
                const languages = await this.bot.apiService.findAll<TLanguage[]>(ENTITIES.LANGUAGE);
                const message = SCREEN_TEXTS[screen][userLang];

                const formattedKeyboardData = languages.map(item => ({
                    label: `${LANG_LABELS[item.slug as ELangueage][userLang]} ${user.language === item.slug ? '✅' : ''}`,
                    action: `action.${EBotActions.SELECT_LANGUAGE}.${item.slug}`,
                }));

                const keyboard = generateKeyboard(formattedKeyboardData);
                await botAction(ctx, message, keyboard);
                return;
            }

            case EScreen.MAIN_MENU: {
                const keyboard = getMenuButtons(userLang);
                const lang = TRANSLATION[user.language!][userLang];
                const message = TRANSLATION.mainMenu(0, lang);
                await botAction(ctx, message[userLang], keyboard);
                return;
            }

            case EScreen.WORDS: {
                await botAction(ctx, 'words');
                return;
            }

            default: {
                await this.bot.sendMessage(ctx, 'default');
            }
        }
    }

    onAction() {
        this.bot.botInstance.on('callback_query', async ctx => {
            //@ts-ignore
            const action = ctx.callbackQuery.data;

            const tgId = ctx?.chat?.id!;

            const splittedAction = action.split('.');

            switch (splittedAction[1] as EBotActions) {
                case EBotActions.BACK: {
                    const state = await this.bot.stateService.getState(tgId);
                    await this.open(ctx, state.prevScreen);
                    return;
                }
                case EBotActions.GO_TO_SELECT_LANG: {
                    await this.open(ctx, EScreen.LANG_SELECT);

                    return;
                }

                case EBotActions.SELECT_LANGUAGE: {
                    const state = await this.bot.stateService.setState(tgId, {
                        language: splittedAction[2],
                    });
                    await ctx.answerCbQuery();
                    // await this.open(ctx, state.currentScreen as EScreen);

                    return;
                }
            }
        });
        this.bot.botInstance.action('back', async ctx => {
            const { prevScreen, screenAction } = await this.bot.stateService.getState(
                ctx?.chat?.id!,
            );

            if (prevScreen) {
                await this.open(ctx, prevScreen, screenAction || undefined);
            }
        });
    }

    launch() {
        this.onAction();

        this.bot.botInstance.use(async (ctx: Context, next) => {
            console.log(ctx.message, 'MSG');

            await next();
        });
    }
}

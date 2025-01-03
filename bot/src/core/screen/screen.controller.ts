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
import { EBaseActions, EBotActions } from '@app/shared/enums/actions.enum';
import { getBackButton, getMenuButtons, getPaginationButton } from '@app/shared/keyboards';
import { TRANSLATION } from '@app/shared/translation';
import { LIMIT } from '@app/shared/consts/common';

export class ScreenController implements IController {
    constructor(private readonly bot: Bot) {}

    async changeScreenState(ctx: Context, tgId: number, screen: EScreen) {
        const state = await this.bot.stateService.getState(tgId);

        const prevScreen = () => {
            if (!ctx.callbackQuery) return null;
            if (screen === state.currentScreen) {
                return state.prevScreen;
            }

            const splittedScreen = screen.split('.');
            const prev = splittedScreen.slice(0, -1).join('.');

            if (splittedScreen.length > 1) {
                return prev as EScreen;
            }
            // TODO: Доработать навигацию
            return state.currentScreen;
        };

        const prev = prevScreen();

        await this.bot.stateService.setState(tgId, {
            prevScreen: prev,
            currentScreen: screen,
            openScreen: null,
        });
    }

    async open(ctx: Context, screen: EScreen | null, screenData?: unknown, action?: EScreenAction) {
        if (!screen) return;
        const user = await this.bot.stateService.getState(ctx?.chat?.id!);

        const userLang = user?.lang || EBotLang.RU;

        const botAction = (ctx: Context, message: string, keyboard?: Markup.Markup<any>) => {
            if (action === EScreenAction.SEND) {
                return this.bot.sendMessage(ctx, message, keyboard);
            }
            if (action === EScreenAction.EDIT || ctx.callbackQuery) {
                return this.bot.editMessage(ctx, message, keyboard);
            }

            return this.bot.sendMessage(ctx, message, keyboard);
        };

        const tgId = ctx?.chat?.id!;

        const backButton = getBackButton(userLang);

        await this.changeScreenState(ctx, tgId, screen);

        switch (screen) {
            case EScreen.START_MENU: {
                const languages = await this.bot.apiService.findAll<TLanguage[]>(ENTITIES.LANGUAGE);
                const formattedKeyboardData = languages.map(item => ({
                    label: LANG_LABELS[item.slug as ELangueage][userLang],
                    action: `action.${EBotActions.SELECT_LANGUAGE}.${item.slug}`,
                }));

                const message = SCREEN_TEXTS[screen][userLang];
                const keyboard = generateKeyboard(ctx, formattedKeyboardData);

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

                const keyboard = generateKeyboard(ctx, formattedKeyboardData, [backButton]);
                await botAction(ctx, message, keyboard);
                return;
            }

            case EScreen.WORD_DETAILS: {
                const wordId = screenData as number;
                const data = await this.bot.apiService.findWordById(wordId);

                const message = TRANSLATION.wordDetails(
                    data.word,
                    data.translation,
                    data?.description || '',
                );

                const keyboard = generateKeyboard(
                    ctx,
                    [
                        {
                            label: TRANSLATION.edit[userLang],
                            action: `edit.word.${wordId},`,
                        },
                        {
                            label: TRANSLATION.delete[userLang],
                            action: `delete.word.${wordId}`,
                        },
                    ],
                    [backButton],
                );

                await botAction(ctx, message[userLang], keyboard);
                return;
            }

            case EScreen.MAIN_MENU: {
                const data = await this.bot.apiService.findByTgId(String(tgId));

                await this.bot.stateService.setState(tgId, {
                    pagination: {
                        currentPage: 1,
                        total: 0,
                    },
                });
                const keyboard = getMenuButtons(userLang);
                const lang = TRANSLATION[user.language!][userLang];
                const message = TRANSLATION.mainMenu(data?.wordsCount || 0, lang);
                await botAction(ctx, message[userLang], keyboard);
                return;
            }

            case EScreen.WORDS: {
                const currentPage = user?.pagination?.currentPage || 1;

                const data = await this.bot.apiService.findWords(
                    {
                        tgId: String(tgId),
                        limit: LIMIT,
                        offset: LIMIT * (currentPage - 1),
                    },
                    // user?.language || undefined,
                );

                const formattedData = data.words?.map(item => ({
                    label: `${item.word} - ${item.translation}`,
                    action: `action.${EBotActions.WORD_DETAILS}.${item.id}`,
                }));

                const totalPages = Math.ceil(data.total / LIMIT);

                const pagination = getPaginationButton({
                    lang: userLang,
                    total: totalPages,
                    current: currentPage,
                    prefix: EScreen.WORDS,
                });

                const keyboard = generateKeyboard(ctx, formattedData, [pagination, backButton]);

                await botAction(ctx, TRANSLATION.wordsScreen(data.total)[userLang], keyboard);
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
                // Кнопка назад
                case EBotActions.BACK: {
                    const state = await this.bot.stateService.getState(tgId);
                    await this.open(ctx, state.prevScreen);
                    return;
                }

                // Заглушка
                case EBotActions.EMPTY: {
                    await ctx.answerCbQuery();
                    return;
                }

                // Перейти к выбору языка
                case EBotActions.GO_TO_SELECT_LANG: {
                    await this.open(ctx, EScreen.LANG_SELECT);

                    return;
                }

                // Пагинация - назад
                case EBotActions.PREV: {
                    const prefix = splittedAction.slice(2) || null;

                    if (!prefix) return null;

                    const user = await this.bot.stateService.getState(tgId);
                    await this.bot.stateService.setState(tgId, {
                        pagination: {
                            currentPage: (user?.pagination?.currentPage || 1) - 1,
                            total: user?.pagination.total,
                        },
                    });

                    await this.open(ctx, prefix.join('.'), null, EScreenAction.EDIT);
                    return;
                }

                // Пагинация - вперед
                case EBotActions.NEXT: {
                    const prefix = splittedAction.slice(2) || null;

                    if (!prefix) return null;

                    const user = await this.bot.stateService.getState(tgId);
                    await this.bot.stateService.setState(tgId, {
                        pagination: {
                            currentPage: (user?.pagination?.currentPage || 1) + 1,
                            total: user?.pagination.total,
                        },
                    });

                    await this.open(ctx, prefix.join('.'), null, EScreenAction.EDIT);
                    return;
                }

                // Создание слова
                case EBotActions.CREATE_WORD: {
                    await ctx.answerCbQuery();
                    ctx.scene.enter('create-word');

                    return;
                }

                // Все слова
                case EBotActions.WORDS: {
                    await this.open(ctx, EScreen.WORDS);

                    return;
                }

                case EBotActions.WORD: {
                    if (splittedAction[0] === EBaseActions.DELETE) {
                        await this.bot.apiService.deleteWord(splittedAction[2] as number);
                        await ctx.answerCbQuery('Слово удалено!');
                        await this.open(ctx, EScreen.WORDS);
                    }

                    return;
                }

                // Детали слова
                case EBotActions.WORD_DETAILS: {
                    const wordId = splittedAction[2];
                    await this.open(ctx, EScreen.WORD_DETAILS, wordId);

                    return;
                }

                // Выбор языка
                case EBotActions.SELECT_LANGUAGE: {
                    const prevState = await this.bot.stateService.getState(tgId);
                    const state = await this.bot.stateService.setState(tgId, {
                        language: splittedAction[2],
                    });

                    if (!state.prevScreen) {
                        await this.open(ctx, EScreen.MAIN_MENU);
                        return;
                    }

                    if (splittedAction[2] !== prevState.language) {
                        await this.open(ctx, EScreen.LANG_SELECT);
                    }

                    await ctx.answerCbQuery();
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
            await next();
        });
    }
}

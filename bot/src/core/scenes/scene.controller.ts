import { TRANSLATION } from '@app/core/scenes/translation';
import { Markup, Scenes } from 'telegraf';
import { RedisService } from '@app/core/redis/redis.service';
import { getLangTranslation } from '@app/shared/translation';
import { StateService } from '@app/shared/types/state.interface';
import { IState } from '@app/core/redis/redis.interface';
import { EBotLang, EScreen, EScreenAction } from '@app/shared/enums/screens.enum';
import { EBotActions, ESceneStatus } from '@app/shared/enums/actions.enum';
import { ApiService } from '@app/core/api/api.service';
import { Bot } from '@app/core/bot';
import { ScreenController } from '@app/core/screen/screen.controller';

const state = RedisService.getInstance() as StateService<IState>;
const api = ApiService.getInstance();

export class ScenesController {
    constructor(
        private readonly bot: Bot,
        private readonly screenController: ScreenController,
    ) {}

    public CreateWordScene = new Scenes.WizardScene<any>(
        'create-word',
        //@ts-ignore
        async ctx => {
            const user = await state.getState(ctx?.chat?.id!);
            const langWord = getLangTranslation[user?.language!].write[user.lang || EBotLang.RU];
            await ctx.reply(TRANSLATION.createWordFirst(langWord)['ru']);

            ctx.wizard.state.status = ESceneStatus.IN_PROGRESS;
            return ctx.wizard.next();
        },
        async ctx => {
            await ctx.reply(TRANSLATION.createWordSecond['ru']);

            if (!ctx?.message) {
                return;
            }
            // @ts-ignore
            ctx.wizard.state.word = ctx.message.text;

            return ctx.wizard.next();
        },
        async ctx => {
            const keyboard = Markup.inlineKeyboard([
                Markup.button.callback('Пропустить', EBotActions.SKIP),
            ]);
            await ctx.sendMessage(TRANSLATION.createWordEnd['ru'], keyboard);

            if (!ctx.message) {
                return;
            }
            // @ts-ignore
            ctx.wizard.state.translation = ctx.message.text;

            return ctx.wizard.next();
        },
        async ctx => {
            ctx.wizard.state.description = ctx.message ? ctx.message?.text : '';

            if (ctx.callbackQuery) {
                await ctx.answerCbQuery();
            }

            ctx.wizard.state.status = ESceneStatus.FINISH;

            const user = await state.getState(ctx?.chat?.id!);

            const wizardState = ctx.wizard.state;

            await api.createWord({
                tgId: String(user.tgId)!,
                languageSlug: user.language!,
                word: wizardState.word,
                description: wizardState.description,
                translation: wizardState.translation,
            });

            ctx.scene.leave();
            await this.screenController.open(ctx, EScreen.MAIN_MENU, null, EScreenAction.SEND);
        },
    );
}

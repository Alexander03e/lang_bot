import { Bot } from '@app/core/bot/index';
import { session } from 'telegraf';
import { IController } from '@app/shared/types/controller.interface';
import { Stage } from 'telegraf/scenes';
import { ScreenController } from '@app/core/screen/screen.controller';
import { EScreen } from '@app/shared/enums/screens.enum';
import { ScenesController } from '@app/core/scenes/scene.controller';

export class BotMiddleware implements IController {
    private sceneController: ScenesController;

    constructor(
        private readonly bot: Bot,
        private readonly screenController: ScreenController,
    ) {
        this.sceneController = new ScenesController(this.bot, screenController);
    }

    launch() {
        const scenes = [this.sceneController.CreateWordScene].map(scene => {
            // TODO: Зарефачить
            scene.command('start', async ctx => {
                await ctx?.scene?.leave();
                await this.screenController.open(ctx, EScreen.MAIN_MENU);
            });

            scene.command('lang', async ctx => {
                await ctx?.scene?.leave();
                await this.screenController.open(ctx, EScreen.LANG_SELECT);
            });

            return scene;
        });

        const stage = new Stage(scenes);
        this.bot.botInstance.use(session());
        this.bot.botInstance.use(stage.middleware());
    }
}

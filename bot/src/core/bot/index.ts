import { BotIntance } from './bot.interface';
import { Context, Telegraf } from 'telegraf';
import { CommandController } from '@app/core/commands/commands.controller';
import { IController } from '@app/shared/types/controller.interface';
import { StateService } from '@app/shared/types/state.interface';
import { ApiService } from '@app/core/api/api.service';
import { BotMiddleware } from '@app/core/bot/bot.middleware';
import { ScreenController } from '@app/core/screen/screen.controller';
import { MessageService } from '@app/core/message/message.service';
import { MessageController } from '@app/core/message/message.controller';
import { IState } from '@app/core/redis/redis.interface';

export class Bot implements BotIntance {
    readonly botInstance: Telegraf<any>;
    readonly stateService: StateService<IState>;
    readonly messageService: MessageService;
    readonly apiService: ApiService;
    private controllers: IController[] = [];

    constructor(
        private readonly token: string,
        stateService: StateService<IState>,
        apiService: ApiService,
        messageService: MessageService,
    ) {
        this.stateService = stateService;
        this.apiService = apiService;
        this.messageService = messageService;
        this.botInstance = new Telegraf(token);
        this.controllers = [
            new CommandController(this),
            new ScreenController(this),
            new BotMiddleware(this),
            new MessageController(this),
        ];
    }

    async editMessage(ctx: Context, message: string) {}

    async sendMessage(...props: Parameters<typeof this.messageService.sendMessage>) {
        await this.messageService.sendMessage(...props);
    }

    async clearKeyboard(ctx: Context) {}

    async launch() {
        this.controllers.forEach(controller => controller.launch());
        await this.botInstance.launch();
    }
}

import { BotIntance } from './bot.interface';
import { Telegraf } from 'telegraf';
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
        readonly token: string,
        stateService: StateService<IState>,
        apiService: ApiService,
        messageService: MessageService,
    ) {
        this.stateService = stateService;
        this.apiService = apiService;
        this.messageService = messageService;
        this.botInstance = new Telegraf(token);

        const screenController = new ScreenController(this);
        const commandController = new CommandController(this, stateService, screenController);
        const messageController = new MessageController(this);
        const middlewareController = new BotMiddleware(this, screenController);

        this.controllers = [
            middlewareController,
            screenController,
            commandController,
            messageController,
        ];
    }

    async editMessage(...props: Parameters<typeof this.messageService.editMessage>) {
        await this.messageService.editMessage(...props);
    }

    async sendMessage(...props: Parameters<typeof this.messageService.sendMessage>) {
        await this.messageService.sendMessage(...props);
    }

    async launchControllers() {
        this.controllers.forEach(controller => controller.launch());
    }

    async launch() {
        await this.launchControllers();
        await this.botInstance.launch();
    }
}

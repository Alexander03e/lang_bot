import { BotIntance } from './bot.interface';
import { Context, Markup, Telegraf } from 'telegraf';
import { CommandController } from '@app/core/commands/commands.controller';
import { IController } from '@app/shared/types/controller.interface';
import { StateService } from '@app/shared/types/state.interface';
import { ApiService } from '@app/core/api/api.service';

export class Bot implements BotIntance {
    readonly botInstance: Telegraf<any>;
    readonly stateService: StateService;
    readonly apiService: ApiService;
    private controllers: IController[] = [];

    constructor(
        private readonly token: string,
        stateService: StateService,
        apiService: ApiService,
    ) {
        this.stateService = stateService;
        this.apiService = apiService;
        this.botInstance = new Telegraf(token);
        this.controllers = [new CommandController(this)];
    }

    async editMessage(ctx: Context, message: string) {}

    async sendMessage(ctx: Context, message: string, keyboard?: Markup.Markup<any>) {
        await ctx.reply(message, keyboard);
    }

    async clearKeyboard(ctx: Context) {}

    async launch() {
        this.controllers.forEach(controller => controller.launch());
        await this.botInstance.launch();
    }
}

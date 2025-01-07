import axios from 'axios';
import { gpt } from 'gpti';

interface IAskResponse {
    message: string;
}

interface IMessage {
    role: 'user' | 'assistant';
    content: string;
}

export class AiService {
    messages: IMessage[] = [];

    constructor() {}

    async ask(msg?: string): Promise<IAskResponse> {
        this.messages.push({
            role: 'user',
            content: msg || '',
        });

        const response = (await gpt.v3({
            messages: this.messages,
            stream: false,
        })) as IAskResponse;

        this.messages.push({
            role: 'assistant',
            content: response.message,
        });

        return response;
    }
}

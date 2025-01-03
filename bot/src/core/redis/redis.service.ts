import { StateService } from '@app/shared/types/state.interface';
import { createClient, RedisClientType } from 'redis';
import { IState } from '@app/core/redis/redis.interface';

const initState: IState = {
    lastMessage: null,
    language: null,
    currentScreen: null,
    openScreen: null,
    prevScreen: null,
    screenAction: null,
    tgId: null,
    lang: null,
    sceneData: null,

    words: {
        total: 0,
        currentPage: 1,
        displayMode: 'BUTTONS',
    },

    pagination: {
        currentPage: 1,
        total: 0,
    },
};

export class RedisService implements StateService<IState> {
    private static _instance: RedisService | null = null;
    private client: RedisClientType;
    private readonly _db = process.env.REDIS_DB;

    constructor() {
        this.client = createClient();
        this.launch();
    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new RedisService();
            return this._instance;
        }

        return this._instance;
    }

    getKey(key: string | number) {
        return `${this._db}:${key.toString()}`;
    }

    async initState(key: number | string) {
        await this.client.set(this.getKey(key), JSON.stringify(initState));
    }

    async setState(key: number | string, payload: unknown) {
        const prevState = await this.getState(key);
        const merged = Object.assign({ ...prevState }, payload);

        await this.client.set(this.getKey(key), JSON.stringify({ ...merged }));

        return merged;
    }

    async getState(key: number | string) {
        const state = await this.client.get(this.getKey(key));
        if (!state) {
            await this.initState(key);
            return initState;
        }

        return JSON.parse(state);
    }

    async launch() {
        this.client.on('connect', () => console.log('INFO: redis connected'));
        this.client.on('error', () => console.log('ERROR: redis error'));
        await this.client.connect();
    }
}

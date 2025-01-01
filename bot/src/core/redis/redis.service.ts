import { StateService } from '@app/shared/types/state.interface';
import { createClient, RedisClientType } from 'redis';

export class RedisService implements StateService {
    private static _instance: RedisService | null = null
    private client: RedisClientType
    private readonly _db = process.env.REDIS_DB
    constructor() {
        this.client = createClient()
        this.launch()
    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new RedisService()
            return this._instance
        }

        return this._instance
    }

    async setState(key: number | string, payload: unknown) {
        await this.client.set(`${this._db}:${key.toString()}`, JSON.stringify(payload))
    }

    async getState(key: number | string) {
        const state = await this.client.get(`${this._db}:${key.toString()}`)
        if (!state) return {}

        const parsedData = JSON.parse(state)
    }

    async launch() {
        this.client.on('connect', () => console.log('INFO: redis connected'))
        this.client.on('error', () => console.log('ERROR: redis error'))
        await this.client.connect()
    }
}
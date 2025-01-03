import { ENTITIES } from '@app/shared/enums/api.enum';
import { AxiosInstance } from 'axios';
import { axiosInstance } from '@app/core/api/axios';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { TUserById, TUserWords, TWord } from '@app/shared/types/api.types';
import { CreateWordDto } from '@app/shared/dto/create-word.dto';

export class ApiService {
    private static baseInstance: ApiService;
    private httpInstance: AxiosInstance;

    constructor() {
        this.httpInstance = axiosInstance;
    }

    static getInstance() {
        if (!this.baseInstance) {
            this.baseInstance = new ApiService();
            return this.baseInstance;
        }

        return this.baseInstance;
    }

    async findAll<T = unknown>(entity: ENTITIES): Promise<T> {
        return (await this.httpInstance.get(entity)).data;
    }

    async findOne(entity: ENTITIES, id: number) {
        return (await this.httpInstance.get(`${entity}/${id}`)).data;
    }

    async createUser(dto: CreateUserDto) {
        return (await this.httpInstance.post(ENTITIES.USER, dto)).data;
    }

    async findByTgId(tgId: string): Promise<TUserById | null> {
        try {
            return (await this.httpInstance.get(`${ENTITIES.USER}/${tgId}`)).data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async findWords({
        tgId,
        languageSlug,
        limit,
        offset,
    }: {
        tgId?: string;
        languageSlug?: string;
        limit?: number;
        offset?: number;
    }): Promise<TUserWords> {
        let url = `${ENTITIES.WORD}?`;

        if (tgId) {
            url += `tgId=${tgId}`;
        }
        if (languageSlug) {
            url += `&languageSlug=${languageSlug}`;
        }

        if (offset) {
            url += `&offset=${offset}`;
        }

        if (limit) {
            url += `&limit=${limit}`;
        }

        return (await this.httpInstance.get(url)).data;
    }

    async findWordById(id: number): Promise<TWord> {
        return (await this.httpInstance.get(`${ENTITIES.WORD}/${id}`)).data;
    }

    async createWord({ description = '', ...data }: CreateWordDto) {
        return (await this.httpInstance.post(`${ENTITIES.WORD}/byUser`, { ...data, description }))
            .data;
    }

    async deleteWord(id: number) {
        return (await this.httpInstance.delete(`${ENTITIES.WORD}/${id}`)).data;
    }
}

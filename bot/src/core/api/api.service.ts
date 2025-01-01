import { ENTITIES } from '@app/shared/enums/api.enum';
import { AxiosInstance } from 'axios';
import { axiosInstance } from '@app/core/api/axios';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';

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

    async findAll(entity: ENTITIES) {
        return (await this.httpInstance.get(entity)).data;
    }

    async findOne(entity: ENTITIES, id: number) {
        return (await this.httpInstance.get(`${entity}/${id}`)).data;
    }

    async createUser(dto: CreateUserDto) {
        return (await this.httpInstance.post(ENTITIES.USER, dto)).data;
    }
}

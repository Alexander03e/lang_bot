import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findByTgId(tgId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { tgId } });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        return user;
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async create(data: CreateUserDto): Promise<UserEntity> {
        const findUser = await this.userRepository.findOne({ where: { tgId: data.tgId } });

        if (findUser) {
            return findUser;
        }

        return await this.userRepository.save(data);
    }
}

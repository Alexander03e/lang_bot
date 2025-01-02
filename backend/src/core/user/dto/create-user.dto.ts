import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly username: string;
    @IsNotEmpty()
    readonly tgId: number;
    readonly first_name: string;
}

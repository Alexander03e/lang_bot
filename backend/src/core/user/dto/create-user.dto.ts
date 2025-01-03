import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly username: string;
    @IsNotEmpty()
    readonly tgId: string;
    readonly first_name: string;
}

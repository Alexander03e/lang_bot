import { IsNotEmpty } from 'class-validator';

export class CreateWordDto {
    @IsNotEmpty()
    readonly word: string;

    @IsNotEmpty()
    readonly translation: string;

    readonly description: string;
}

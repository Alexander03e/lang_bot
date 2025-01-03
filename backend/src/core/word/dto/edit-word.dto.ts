import { IsNotEmpty } from 'class-validator';

export class EditWordDto {
    @IsNotEmpty()
    readonly word: string;

    @IsNotEmpty()
    readonly translation: string;

    @IsNotEmpty()
    readonly languageId: number;

    readonly description: string;
}

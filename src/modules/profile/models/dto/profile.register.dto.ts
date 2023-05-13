import { IsNumber, IsString,  IsNotEmpty, IsEmail, IsDate } from 'class-validator';

export class personDTO{

  @IsString()
  buscador: string;

  @IsString()
  donde: string;

}
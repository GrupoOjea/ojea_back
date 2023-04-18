import { IsNumber, IsString,  IsNotEmpty, IsEmail } from 'class-validator';

export class registerDTO{

  @IsNumber()
  @IsNotEmpty()
  tipo_perfil: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  clave: string;

}
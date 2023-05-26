import { IsNumber, IsString,  IsNotEmpty, IsEmail } from 'class-validator';

export class createDTO{

  @IsNumber()
  @IsNotEmpty()
  tipo_empleo: number;

  @IsNumber()
  @IsNotEmpty()
  estado: number;

  @IsNumber()
  @IsNotEmpty()
  fk_persona: number;

  @IsNumber()
  @IsNotEmpty()
  fk_empleo: number;

}

export class emailDTO{

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEmail()
  @IsNotEmpty()
  email_empresa: string;

  @IsString()
  @IsNotEmpty()
  nombre_empresa: string;

  @IsString()
  @IsNotEmpty()
  cargo: string;

}
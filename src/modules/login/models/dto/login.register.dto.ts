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

export class sessionDTO{

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  clave: string;

}

export class resetPasswordDTO{

  @IsEmail()
  @IsNotEmpty()
  email: string;

}


export class newPasswordDTO{

  @IsString()
  @IsNotEmpty()
  newpassword: string;

  @IsString()
  @IsNotEmpty()
  smstoken: string;

}
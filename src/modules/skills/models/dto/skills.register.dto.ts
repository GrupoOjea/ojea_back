import { IsNumber, IsString,  IsNotEmpty, IsEmail } from 'class-validator';

export class skillsRegisterDTO{

  @IsString()
  @IsNotEmpty()
  texto_habilidades: string;

  @IsString()
  @IsNotEmpty()
  habilidad_principal: string;

  @IsNumber()
  @IsNotEmpty()
  fk_persona: number;

}

export class skillsUpdateDTO{

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  texto_habilidades: string;
  
}
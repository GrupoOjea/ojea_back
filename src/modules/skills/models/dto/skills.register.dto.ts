import { IsNumber, IsString,  IsNotEmpty, IsEmail } from 'class-validator';

export class skillsRegisterDTO{

  @IsNumber()
  @IsNotEmpty()
  fk_subhabilidad: number;

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
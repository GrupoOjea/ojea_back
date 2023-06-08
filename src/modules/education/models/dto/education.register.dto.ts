import { IsNumber, IsString,  IsNotEmpty } from 'class-validator';

export class createEducationDTO{

  @IsString()
  @IsNotEmpty()
  institucion: string;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  mes_inicio: string;

  @IsNumber()
  @IsNotEmpty()
  ano_inicio: number;

  @IsString()
  @IsNotEmpty()
  mes_fin: string;

  @IsNumber()
  @IsNotEmpty()
  ano_fin: number;

  @IsNumber()
  @IsNotEmpty()
  fk_persona: number;

}

export class updateEducationDTO{

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  institucion: string;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  mes_inicio: string;

  @IsNumber()
  @IsNotEmpty()
  ano_inicio: number;

  @IsString()
  @IsNotEmpty()
  mes_fin: string;

  @IsNumber()
  @IsNotEmpty()
  ano_fin: number;

}

export class getEducationDTO{

  @IsNumber()
  @IsNotEmpty()
  id: number;

}
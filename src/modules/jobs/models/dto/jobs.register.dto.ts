import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createJobsDTO {

  @IsString()
  @IsNotEmpty()
  cargo: string;

  @IsString()
  @IsNotEmpty()
  contrato: string;

  @IsString()
  @IsNotEmpty()
  jornada: string;

  @IsNumber()
  @IsNotEmpty()
  experiencia: number;

  @IsString()
  @IsNotEmpty()
  modalidad: string;

  @IsString()
  @IsNotEmpty()
  aptitudes: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  fk_empresa: number;

}

export class updateJobsDTO {

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  cargo: string;

  @IsString()
  @IsNotEmpty()
  contrato: string;

  @IsString()
  @IsNotEmpty()
  jornada: string;

  @IsNumber()
  @IsNotEmpty()
  experiencia: number;

  @IsString()
  @IsNotEmpty()
  modalidad: string;

  @IsString()
  @IsNotEmpty()
  aptitudes: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
  
}

export class searchJobsDTO{

  @IsString()
  @IsNotEmpty()
  buscador: string;

  @IsString()
  @IsNotEmpty()
  donde: string;

}
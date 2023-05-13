import { IsNumber, IsString,  IsNotEmpty } from 'class-validator';

export class createCompanyDTO{

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  run: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  comuna: string;

  @IsString()
  @IsNotEmpty()
  rubro: string;

  @IsString()
  pagina_web: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  tipo_plan: number;


  @IsNumber()
  @IsNotEmpty()
  fk_login: number;

}

export class updateCompanyDTO{

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  run: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  comuna: string;

  @IsString()
  @IsNotEmpty()
  rubro: string;

  @IsString()
  pagina_web: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  tipo_plan: number;

}
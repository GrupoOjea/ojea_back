import { IsNumber, IsString,  IsNotEmpty } from 'class-validator';

export class createAdminDTO{

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

export class updateAdminDTO{

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  estatus_registro: string;

  @IsNumber() 
  tipo_perfil: number;


}
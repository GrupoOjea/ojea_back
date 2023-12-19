import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('admin')
export class AdminEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo_perfil: number;


  @Column()
  email: string;

  @Column()
  clave: string;

  @Column()
  estatus_registro: string;

  @Column()
  fecha_crecion: Date;

  @Column()
  fecha_modificacion: Date;

  @Column()
  estado: number;

  @Column()
  reset_token: string;



  @Column()
  nombre: string;

  @Column()
  run: string;

  @Column()
  telefono: string;

  @Column()
  region: string;

  @Column()
  comuna: string;

  @Column()
  rubro: string;

  @Column()
  pagina_web: string;

  @Column()
  descripcion: string;

  @Column()
  tipo_plan: string;

  @Column()
  fecha_creacion: Date;


 

  @Column()
  fk_login: number;

  @Column()
  nombreEmpresa: string;

}

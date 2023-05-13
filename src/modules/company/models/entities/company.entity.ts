import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('empresa')
export class CompanyEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

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
  fecha_modificacion: Date;

  @Column()
  fk_login: number;

}

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('empleos')
export class JobsEntity extends BaseEntity{
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cargo: string;

  @Column()
  contrato: string;
  
  @Column()
  jornada: string;

  @Column()
  experiencia: number;

  @Column()
  modalidad: string;

  @Column()
  aptitudes: string;

  @Column()
  descripcion: string;

  @Column()
  fecha_creacion: Date;

  @Column()
  fecha_modificacion: Date;

  @Column()
  fk_empresa: number;
}
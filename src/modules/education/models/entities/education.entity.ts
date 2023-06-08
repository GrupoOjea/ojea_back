import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('educacion')
export class EducationEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  institucion: string;

  @Column()
  titulo: string;

  @Column()
  mes_inicio: string;

  @Column()
  ano_inicio: number;

  @Column()
  mes_fin: string;

  @Column()
  ano_fin: number;

  @Column()
  fecha_creacion: Date;

  @Column()
  fecha_modificacion: Date;

  @Column()
  fk_persona: number;

}
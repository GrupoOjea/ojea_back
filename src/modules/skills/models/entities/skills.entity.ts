import { BaseEntity,Column, Entity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('habilidades')
export class SkillsEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto_habilidades: string;

  @Column()
  fecha_creacion: Date;

  @Column()
  fecha_modificacion: Date;

  @Column()
  fk_persona: number;

}
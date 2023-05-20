import { BaseEntity,Column, Entity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('postulacion')
export class PostulationEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo_empleo: number;

  @Column()
  estado: number;

  @Column()
  fecha_creacion: Date;

  @Column()
  fecha_modificacion: Date;

  @Column()
  fk_persona: number;

  @Column()
  fk_empleo: number;
  
}

export default PostulationEntity;
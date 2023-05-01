import LoginEntity from "src/modules/login/models/entities/login.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('persona')
export class ProfileEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  edad: number;

  @Column()
  profesion: string;

  @Column()
  telefono: string;

  @Column()
  region: string;

  @Column()
  comuna: string;

  @Column()
  fecha_creacion: Date;

  @Column()
  fecha_modificacion: Date;

  @Column()
  fk_login: number;

}
  @OneToOne(() => LoginEntity)
  @JoinColumn({ name: 'fk_login' })
  login: LoginEntity;
}

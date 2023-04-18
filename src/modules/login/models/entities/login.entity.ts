import { BaseEntity,Column, Entity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('login')
export class LoginEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo_perfil: number;

  @Column()
  email: string;

  @Column()
  clave: string;

  @Column()
  estado: number;

  @Column()
  reset_token: string;

  @Column()
  estatus_registro: number;

  @Column()
  fecha_creacion: Date;

  @Column()
  fecha_modificacion: Date;
    
}

export default LoginEntity;
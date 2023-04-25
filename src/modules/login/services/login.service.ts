import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginEntity } from '../models/entities/login.entity';
import { ProfileEntity } from 'src/modules/profile/models/entities/profile.entity';


@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)  
    private LoginReposository: Repository<LoginEntity>,
    @InjectRepository(ProfileEntity)
    private PersonaReposository: Repository<ProfileEntity>,
    private jwtService: JwtService
  ){}

  // Crea un usuario
  async createLogin(registerBody): Promise<any>{

    const existsUser = await this.LoginReposository.findOne({where: {email: registerBody.email}});
    if(existsUser){
     
      throw new HttpException('Usuario ya existente', HttpStatus.ACCEPTED);
    }
    else {
      const encryptPass = await this.encrypt(registerBody.clave);
      const dataBody = {
        tipo_perfil: registerBody.tipo_perfil,
        email: registerBody.email,
        clave: encryptPass,
        fecha_creacion: new Date(Date.now())
      }
      const dataInsert = await this.LoginReposository.save(dataBody);
      return {"id": dataInsert.id};
    }

  }

  // Funcion para encriptar password
  async encrypt(password): Promise<string>{
    try{
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);

      return await hash;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Inicio de sesion
  async sessionLogin(sessionBody): Promise<any>{

    const validateUser = await this.LoginReposository.findOne(
      {
        where:{
          email: sessionBody.email
        }
      }
    )

    if (validateUser) {
      const isMatch = await bcrypt.compare(sessionBody.clave, validateUser.clave);

      if(isMatch){
        const token =  this.jwtService.sign({userId: validateUser.id})
        const getPersona = await this.PersonaReposository.findOne({where:{fk_login: validateUser.id }})
        if(!getPersona){
          return {
            "id": validateUser.id,
            "estado": 0
          }
        }

      // Obtiene nombre y apellido hasta el primer espacio, luego concatene y deja el primer nombre y primer apellido
        const namePersona = getPersona.nombre.split(' ').shift()+' '+getPersona.apellido.split(' ').shift();
        const newBody = {
          "estado": validateUser.estado,
          "estatus_registro": validateUser.estatus_registro,
          "tipo_perfil":validateUser.tipo_perfil,
          "token":token,
          "nombre":namePersona
        }
        return newBody
      }
    }
    else {
      return "Usuario no encontrado"
    }
  }

}
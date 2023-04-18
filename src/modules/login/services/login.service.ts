import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import LoginEntity from '../models/entities/login.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {

  constructor(
    @InjectRepository(LoginEntity)  
    private LoginReposository: Repository<LoginEntity>
  ){}

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
}

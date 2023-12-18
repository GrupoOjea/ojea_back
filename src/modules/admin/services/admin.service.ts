import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '../models/entities/Admin.entity';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(AdminEntity)  
    private AdminReposository: Repository<AdminEntity>
  ){} 

  // Crea los datos de la empresa
  async createAdmin(AdminBody): Promise<any>{

    try{
      const data = {
        nombre: AdminBody.nombre,
        run: AdminBody.run,
        telefono: AdminBody.telefono,
        region: AdminBody.region,
        comuna: AdminBody.comuna,
        rubro: AdminBody.rubro,
        pagina_web: AdminBody.pagina_web,
        descripcion: AdminBody.descripcion,
        tipo_plan: AdminBody.tipo_plan,
        fecha_creacion: new Date(Date.now()),
        fk_login: AdminBody.fk_login
      }

      const insertAdmin = await this.AdminReposository.insert(data);
      return insertAdmin;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }

  // Modifica los datos de la empresa
  async updateAdmin(AdminBody): Promise<any>{

    try{
      const data = {
        nombre: AdminBody.nombre,
        run: AdminBody.run,
        telefono: AdminBody.telefono,
        region: AdminBody.region,
        comuna: AdminBody.comuna,
        rubro: AdminBody.rubro,
        pagina_web: AdminBody.pagina_web,
        descripcion: AdminBody.descripcion,
        tipo_plan: AdminBody.tipo_plan,
        fecha_modificacion: new Date(Date.now())
      }

      const updateAdmin = await this.AdminReposository.update(AdminBody.id, data);
      return updateAdmin;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }

  // Obtiene los datos de la empresa
  async getFkAdmin(id): Promise<any>{

    try{
      const getData = await this.AdminReposository.findOne(
        {
          where:{
            fk_login: id 
          }
        }
      )

      return getData
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }

  async getAllUser(): Promise<any>{

    try{

      const getAllUser = this.AdminReposository.query(
        `SELECT EMAIL, ESTATUS_REGISTRO, P.NOMBRE, P.APELLIDO, E.NOMBRE AS NOMBRE_EMPRESA, TIPO_PERFIL \
        FROM LOGIN L \
        LEFT JOIN PERSONA P ON L.ID = P.FK_LOGIN \
        LEFT JOIN EMPRESA E ON L.ID = E.FK_LOGIN \
        `
      );
      
      return getAllUser;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }


}

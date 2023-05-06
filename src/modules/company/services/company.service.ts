import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../models/entities/company.entity';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(CompanyEntity)  
    private CompanyReposository: Repository<CompanyEntity>
  ){}

  // Crea los datos de la empresa
  async createCompany(companyBody): Promise<any>{

    try{
      const data = {
        nombre: companyBody.nombre,
        run: companyBody.run,
        telefono: companyBody.telefono,
        region: companyBody.region,
        comuna: companyBody.comuna,
        rubro: companyBody.rubro,
        pagina_web: companyBody.pagina_web,
        descripcion: companyBody.descripcion,
        tipo_plan: companyBody.tipo_plan,
        fecha_creacion: new Date(Date.now()),
        fk_login: companyBody.fk_login
      }

      const insertCompany = await this.CompanyReposository.insert(data);
      return insertCompany;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }

  // Modifica los datos de la empresa
  async updateCompany(companyBody): Promise<any>{

    try{
      const data = {
        nombre: companyBody.nombre,
        run: companyBody.run,
        telefono: companyBody.telefono,
        region: companyBody.region,
        comuna: companyBody.comuna,
        rubro: companyBody.rubro,
        pagina_web: companyBody.pagina_web,
        descripcion: companyBody.descripcion,
        tipo_plan: companyBody.tipo_plan,
        fecha_modificacion: new Date(Date.now())
      }

      const updateCompany = await this.CompanyReposository.update(companyBody.id, data);
      return updateCompany;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }

  // Obtiene los datos de la empresa
  async getFkCompany(id): Promise<any>{

    try{
      const getData = await this.CompanyReposository.findOne(
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


}

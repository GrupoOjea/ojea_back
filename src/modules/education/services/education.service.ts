import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationEntity } from '../models/entities/education.entity';

@Injectable()
export class EducationService {

  constructor(
    @InjectRepository(EducationEntity)  
    private EducationReposository: Repository<EducationEntity>
  ){}

  // Crea los datos de la educacion
  async createEducation(educationBody): Promise<any>{
    try{
      const data = {
        institucion: educationBody.institucion,
        titulo: educationBody.titulo,
        mes_inicio: educationBody.mes_inicio,
        ano_inicio: educationBody.ano_inicio,
        mes_fin: educationBody.mes_fin,
        ano_fin: educationBody.ano_fin,
        fecha_creacion: new Date(Date.now()),
        fk_persona: educationBody.fk_persona
      }
      const insertEducation = await this.EducationReposository.insert(data);
      return insertEducation;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Edita los datos de la educacion
  async updateEducation(educationBody): Promise<any>{

    try{
      const data = {
        institucion: educationBody.institucion,
        titulo: educationBody.titulo,
        mes_inicio: educationBody.mes_inicio,
        ano_inicio: educationBody.ano_inicio,
        mes_fin: educationBody.mes_fin,
        ano_fin: educationBody.ano_fin,
        fecha_modificacion: new Date(Date.now())
      }

      const updateData = await this.EducationReposository.update(educationBody.id, data);
      return updateData;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Obtiene la educacion de un usuario
  async getEducation(id): Promise<any>{
    
    try{
      const getData = await this.EducationReposository.query(
        `SELECT \
          e.id, \
          e.institucion, \
          e.titulo, \
          e.mes_inicio, \
          e.ano_inicio, \
          e.mes_fin, \
          e.ano_fin \
        FROM login l \
        INNER JOIN persona p \
          ON l.id = p.fk_login \
        INNER JOIN educacion e \
          ON p.id = e.fk_persona \
        WHERE l.id = '${id}'
        `
      );
      return getData;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Obtiene la educacion de un usuario
  async getEducationEdit(id): Promise<any>{
    
    try{
      const getData = await this.EducationReposository.query(
        `SELECT \
          e.id, \
          e.institucion, \
          e.titulo, \
          e.mes_inicio, \
          e.ano_inicio, \
          e.mes_fin, \
          e.ano_fin \
        FROM login l \
        INNER JOIN persona p \
          ON l.id = p.fk_login \
        INNER JOIN educacion e \
          ON p.id = e.fk_persona \
        WHERE e.id = '${id}'
        `
      );
      return getData;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Eliminar una educacion
  async deleteEducation(id): Promise<any>{

    try{
      const deleteData = this.EducationReposository.delete(id);
      return deleteData;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }
  

}

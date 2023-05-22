import { BadRequestException, Injectable } from '@nestjs/common';
import PostulationEntity from '../models/entities/postulation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'http';

@Injectable()
export class PostulationService {
  constructor(
    @InjectRepository(PostulationEntity)
    private PostulationRepository: Repository<PostulationEntity>
   
  ){}   

  // Crea los registro en la tablas
  async createPostulation(postulationBody): Promise<any>{
    try{
      const data = {
        tipo_empleo: postulationBody.tipo_empleo,
        estado: postulationBody.estado,
        fecha_creacion: new Date(Date.now()),
        fk_persona: postulationBody.fk_persona,
        fk_empleo: postulationBody.fk_empleo
      }

      const insertData = this.PostulationRepository.insert(data);
      return insertData;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Obtiene los datos de la empresa
  async getPostulation(id): Promise<any>{

    try{
      const getPostulations = await this.PostulationRepository.count(
        {
          where:{
            fk_empleo: id,
            tipo_empleo: 1 
          }
        }
      )

      const getSave = await this.PostulationRepository.count({
        where: {
          fk_empleo: id,
          tipo_empleo: 2 
        }
      });

      return {"postulado": getPostulations, "guardado": getSave}
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }

  // Obtiene los datos de la empresa
  async getInformationPerson(id): Promise<any>{

    try{

      const getInformationP = this.PostulationRepository.query(
        `select pe.nombre,pe.apellido,pe.profesion,pe.telefono,pe.region,pe.comuna,ed.institucion,ed.titulo,ha.texto_habilidades \ 
        from persona pe\
        inner join educacion ed ON ed.fk_persona = pe.id\
        inner join habilidades ha on  ha.fk_persona =pe.id\
        inner join postulacion po on po.fk_persona =pe.id\
        where po.fk_empleo =${id};
        
          `
      );
      
      return getInformationP;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }
}

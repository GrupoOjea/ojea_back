import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillsEntity } from '../models/entities/skills.entity';

@Injectable()
export class SkillsService {

  constructor(
    @InjectRepository(SkillsEntity)
    private skillsRepository: Repository<SkillsEntity>
  ){}

  //Crear las habilidades
  async createSkills(skillsBody): Promise<any>{

    try{

      const data = {
        texto_habilidades: skillsBody.texto_habilidades,
        fecha_creacion: new Date(Date.now()),
        fk_persona: skillsBody.fk_persona
      }

      const insertData = await this.skillsRepository.insert(data);
      return insertData;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  async updateSkills(skillsBody): Promise<any>{
    try{

      const data = {
        texto_habilidades: skillsBody.texto_habilidades,
        fecha_modificacion: new Date(Date.now())
      }

      const updateData = this.skillsRepository.update(skillsBody.id, data);
      return updateData;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Busca empleos
  async searchSkills(id): Promise<any>{
    try{

      const getData = this.skillsRepository.query(
        `SELECT \
          pe.nombre, \
          pe.apellido, \
          pe.edad, \
          pe.profesion, \
          pe.telefono, \
          pe.region, \
          ed.institucion, \
          ed.titulo, \
          ed.mes_inicio, \
          ed.ano_inicio, \
          ed.mes_fin, \
          ed.ano_fin, \
          ha.texto_habilidades \
          FROM login lo \
        INNER JOIN persona pe \
          ON pe.fk_login = lo.id \
        LEFT JOIN educacion ed \
          ON ed.fk_persona = pe.id \
        LEFT JOIN habilidades ha \
          ON ha.fk_persona = pe.id \
        WHERE lo.id = 2
          `
      );
      return getData;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }

  }


}

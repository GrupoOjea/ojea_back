import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../models/entities/profile.entity';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(ProfileEntity)  
    private ProfileReposository: Repository<ProfileEntity>
  ){}

  async getPerson(personBody): Promise<any> {
    try {
      const data = {
        buscador: personBody.buscador,
        donde: personBody.donde
      };
      const getData = await this.ProfileReposository.query(
        `SELECT \
          p.region, \
          p.comuna, \
          e.institucion, \
          e.titulo, \
          e.mes_inicio, \
          e.ano_inicio, \
          e.mes_fin, \
          e.ano_fin, \
          h.texto_habilidades \
        FROM persona p \
        INNER JOIN educacion e \
          ON e.fk_persona = p.id \
        INNER JOIN habilidades h \
          ON e.fk_persona = p.id \
        WHERE CONCAT(h.texto_habilidades, e.institucion, e.titulo) ILIKE '%${data.buscador}%' \
          AND CONCAT(p.region, p.comuna) ILIKE '%${data.donde}%' \
        `
      );
      console.log(getData);
      return getData;
    } catch {
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Obtiene los datos de la persona
  async getIdPerson(id): Promise<any>{

    try{

      const getData = await this.ProfileReposository.query(
        `SELECT \
          p.region, \
          p.comuna, \
          e.institucion, \
          e.titulo, \
          e.mes_inicio, \
          e.ano_inicio, \
          e.mes_fin, \
          e.ano_fin, \
          h.texto_habilidades \
        FROM persona p \
        INNER JOIN educacion e \
          ON e.fk_persona = p.id \
        INNER JOIN habilidades h \ 
          ON e.fk_persona = p.id \
        WHERE p.id = ${id} \
        `
      );

      const jsonResponse = getData.reduce((accumulator, { region, comuna, institucion, titulo, mes_inicio, ano_inicio, mes_fin, ano_fin, texto_habilidades }) => ({
        ...accumulator,
        region,
        comuna,
        institucion,
        titulo,
        mes_inicio,
        ano_inicio,
        mes_fin,
        ano_fin,
        texto_habilidades
      }), {});
      
      return jsonResponse;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }

  
}
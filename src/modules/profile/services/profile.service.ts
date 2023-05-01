
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

  // Obtiene los datos de la persona
  async getPerson(personBody): Promise<any>{

    try{

      const data = {
        buscador: personBody.buscador,
        donde: personBody.donde
      }
      const getData = this.ProfileReposository.query(
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

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }


  
}
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {}

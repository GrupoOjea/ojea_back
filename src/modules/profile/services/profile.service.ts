import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from '../models/entities/profile.entity';
import { Repository } from 'typeorm';
import { profileDTO } from '../models/dto/profile.register.dto';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(ProfileEntity)  
    private ProfileReposository: Repository<ProfileEntity>
  ){}

  // Funcion para encriptar obtener personas segun sus habilidades
  async getProfile(data: profileDTO): Promise<string>{
    
    try{
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
          AND CONCAT(p.region, p.comuna) ILIKE '%${data.donde}%'
          `
      );
      return getData;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

}

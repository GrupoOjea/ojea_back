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
              p.id,  \
              p.nombre, \
              p.apellido, \
              p.edad, \
              p.profesion, \
              p.telefono, \
              p.region, \
              p.comuna, \
              h.id AS id_skill, \
              s.sub_habilidad,  \
              h2.habilidad_principal \ 
            FROM persona p \
            LEFT JOIN habilidades h ON h.fk_persona = p.id \
            left join subhabilidad s on s.id = h.fk_subhabilidad \ 
            left join habilidad h2 on h2.id = s.fk_habilidad  \
        WHERE p.fk_login = ${id}\
        `
      );

      const jsonResponse = getData.reduce((accumulator, item) => ({
        ...accumulator,
        id: item.id,
        nombre: item.nombre,
        apellido: item.apellido,
        edad: item.edad,
        profesion: item.profesion,
        telefono: item.telefono,
        region: item.region,
        comuna: item.comuna,
        institucion: item.institucion,
        titulo: item.titulo,
        mes_inicio: item.mes_inicio,
        ano_inicio: item.ano_inicio,
        mes_fin: item.mes_fin,
        ano_fin: item.ano_fin,
        habilidades: [
          ...(accumulator.habilidades || []),
          {
            id_skill: item.id_skill,
            sub_habilidad: item.sub_habilidad,
            habilidad_principal: item.habilidad_principal
          }
        ]
      }), {});
  
      return jsonResponse;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }

  
   // Crea los datos de la persona
   async createPerson(personBody): Promise<any>{

    try{

      const dataBody = {
        nombre: personBody.nombre,
        apellido: personBody.apellido,
        edad: personBody.edad,
        profesion: personBody.profesion,
        telefono: personBody.telefono,
        region: personBody.region,
        comuna: personBody.comuna,
        fecha_creacion: new Date(Date.now()),
        fk_login: personBody.fk_login
      }

      const insertPerson = await this.ProfileReposository.insert(dataBody);

      if (insertPerson){
        const updateLogin = await this.ProfileReposository.query(
          `UPDATE login
            SET estatus_registro = 1
          WHERE id = ${personBody.fk_login};
        `
        );
        return insertPerson;
      }
      else{
        throw new BadRequestException('Hubo un error', { cause: new Error() });
      }
      

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }

  // Modifica los datos de la persona
  async updatePerson(personBody): Promise<any>{

    try{

      const dataBody = {
        nombre: personBody.nombre,
        apellido: personBody.apellido,
        edad: personBody.edad,
        profesion: personBody.profesion,
        telefono: personBody.telefono,
        region: personBody.region,
        comuna: personBody.comuna,
        fecha_modificacion: new Date(Date.now())
      }

      const updatePerson = await this.ProfileReposository.update(personBody.id, dataBody);
      return updatePerson;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }

  

  
}
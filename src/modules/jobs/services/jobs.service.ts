import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobsEntity } from '../models/entities/jobs.entity';
import { CompanyEntity } from 'src/modules/company/models/entities/company.entity';

@Injectable()
export class JobsService {

  constructor(
    @InjectRepository(JobsEntity)
    private JobsRepository: Repository<JobsEntity>,
    @InjectRepository(CompanyEntity)
    private PersonaReposository: Repository<CompanyEntity>,
  ){}

  // Crea empleos
  async createJobs(jobsBody): Promise<any>{
    try{
      const data = {
        cargo: jobsBody.cargo,
        contrato: jobsBody.contrato,
        jornada: jobsBody.jornada,
        experiencia: jobsBody.experiencia,
        modalidad: jobsBody.modalidad,
        aptitudes: jobsBody.aptitudes,
        descripcion: jobsBody.descripcion,
        fecha_creacion: new Date(Date.now()),
        fk_empresa: jobsBody.fk_empresa
      }

      const insertData = this.JobsRepository.insert(data);
      return insertData;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Edita un empleo
  async updateJobs(jobsBody): Promise<any>{
    try{
      const data = {
        cargo: jobsBody.cargo,
        contrato: jobsBody.contrato,
        jornada: jobsBody.jornada,
        experiencia: jobsBody.experiencia,
        modalidad: jobsBody.modalidad,
        aptitudes: jobsBody.aptitudes,
        descripcion: jobsBody.descripcion,
        fecha_modificacion: new Date(Date.now())
      }

      const updateData = this.JobsRepository.update(jobsBody.id, data);
      return updateData;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Busca empleos
  async searchJobs(jobsBody): Promise<any>{
    try{

      const data = {
        buscador: jobsBody.buscador,
        donde: jobsBody.donde
      }

      const getData = this.JobsRepository.query(
        `SELECT \
          ep.nombre, \
          ep.region, \
          ep.comuna, \
          em.cargo, \
          em.contrato, \
          em.jornada, \
          em.modalidad, \
          em.aptitudes \
        FROM empresa ep \
        INNER JOIN empleos em \
          on em.fk_empresa = ep.id \
        WHERE CONCAT(ep.nombre, em.cargo, em.contrato, em.modalidad, em.aptitudes, em.descripcion) ILIKE '%${data.buscador}%' \
          and concat(ep.region, ep.comuna) ILIKE '%${data.donde}%'
          `
      );
      return getData;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }

  }

  // Busca los empleos que tienen el plan gold
  async loadJobs(): Promise<any>{
    try{

      const getData = this.JobsRepository.query(
        `SELECT \
          em.id, \
          ep.nombre, \
          ep.region, \
          ep.comuna, \
          em.cargo, \
          em.contrato, \
          em.jornada, \
          em.modalidad, \
          em.aptitudes \
        FROM empresa ep \
        INNER JOIN empleos em \
          ON ep.id = em.fk_empresa \
        WHERE ep.tipo_plan = 3 \
        `
      );
      return getData;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Busca empleo por id
  async idJobs(id): Promise<any>{
    try{
      
      const getData = await this.JobsRepository.query(
        `SELECT \
          em.cargo, \
          ep.nombre, \
          ep.region, \
          ep.comuna, \
          em.modalidad, \
          em.jornada, \
          em.experiencia, \
          em.aptitudes, \
          em.contrato, \
          em.descripcion \
          FROM empresa ep \
        INNER JOIN empleos em \
          ON ep.id = em.fk_empresa \
        WHERE em.id = ${id} \
        `
      );

      const jsonResponse = getData.reduce((accumulator, { cargo, nombre, region, comuna, modalidad, jornada, experiencia, aptitudes, contrato, descripcion }) => ({
        ...accumulator,
        cargo,
        nombre,
        region,
        comuna,
        modalidad,
        jornada,
        experiencia,
        aptitudes,
        contrato,
        descripcion
      }), {});
      
      return jsonResponse;

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }
}

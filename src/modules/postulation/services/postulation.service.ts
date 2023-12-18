import { BadRequestException, Injectable } from '@nestjs/common';
import PostulationEntity from '../models/entities/postulation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { transporter } from 'src/mailer/mailer';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';

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
  async getInformationPersonAll(id): Promise<any>{

    try{

      const getInformationP = this.PostulationRepository.query(
        `SELECT \
            po.id, \
            pe.nombre, \
            pe.apellido, \ 
            pe.telefono, \
            pe.region, \
            pe.comuna, \
            pe.id as id_persona, \
            tipo_empleo, \
            ed.institucion, \ 
                    ed.titulo, \
            (SELECT STRING_AGG(s.sub_habilidad, ', ') \
            FROM habilidades h \
            INNER JOIN subhabilidad s \
            ON s.id = h.fk_subhabilidad \
            WHERE h.fk_persona = pe.id) as habilidades \
          FROM persona pe \
          INNER JOIN postulacion po \
          ON po.fk_persona = pe.id  \
          LEFT JOIN educacion ed \
          ON ed.fk_persona = pe.id \
          WHERE po.fk_empleo = ${id} and tipo_empleo in ('1','2'); \
        `
      );
      
      return getInformationP;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }

    // Obtiene los datos de la empresa
    async getInformationPerson(id): Promise<any>{

      try{
  
        const getInformationP = this.PostulationRepository.query(
          `SELECT \
              po.id, \
              pe.nombre, \
              pe.apellido, \ 
              pe.telefono, \
              pe.region, \
              pe.comuna, \
              pe.id as id_persona, \
              tipo_empleo, \
              ed.institucion, \ 
                      ed.titulo, \
              (SELECT STRING_AGG(s.sub_habilidad, ', ') \
              FROM habilidades h \
              INNER JOIN subhabilidad s \
              ON s.id = h.fk_subhabilidad \
              WHERE h.fk_persona = pe.id) as habilidades \
            FROM persona pe \
            INNER JOIN postulacion po \
            ON po.fk_persona = pe.id  \
            LEFT JOIN educacion ed \
            ON ed.fk_persona = pe.id \
            WHERE po.id = ${id} and tipo_empleo in ('1','2'); \
          `
        );
        
        return getInformationP;
      }
      catch{
        throw new BadRequestException('Hubo un error', { cause: new Error() });
      }
      
    }

  // Obtiene los datos de la empresa
  async getMyJobs(id): Promise<any>{

    try{

      const getMyJobs = this.PostulationRepository.query(

            ` SELECT 
            p.id,
            p.tipo_empleo,
            p.fk_persona,
            p.fk_empleo,
            em.cargo,
            e.nombre,
            e.comuna, 
            em.modalidad,
            p.estado   
        FROM postulacion p 
        LEFT JOIN empleos em ON em.id  = p.fk_empleo 
        LEFT JOIN empresa e ON e.id = em.fk_empresa 
        WHERE fk_persona = ${id};
        `
      );
      
      return getMyJobs;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
    
  }

  async updatePostulationType(postulationBody): Promise<any> {
    try {
        const updatedData = await this.PostulationRepository.update(
            { id: postulationBody.id, fk_empleo: postulationBody.fk_empleo },
            { tipo_empleo: postulationBody.tipo_empleo }
        );
        return updatedData;
    } catch (error) {
        throw new BadRequestException('Hubo un error', { cause: error });
    }
}

async updatePostulationState(postulationBody): Promise<any> {
  try {
      const updatedData = await this.PostulationRepository.update(
          { id: postulationBody.id },
          { estado: postulationBody.estado }
      );
      return updatedData;
  } catch (error) {
      throw new BadRequestException('Hubo un error', { cause: error });
  }
}


  // Email para contacto
  async sendEmail(body){
    try{
      let info = await transporter.sendMail({
        from: "Contacto Ojea",
        to: body.email, 
        subject: "Nueva fase de postulación", 
        text: "Postulación", 
        html: 
          `  
        <head>
            <meta charset="UTF-8">
            <title>Correo Electrónico Corporativo</title>
            <style>
                    body {
                      font-family: Arial, sans-serif;
                      background-color: #f1f1f1;
                      margin: 0;
                      padding: 0;
                                }
    
                    .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      background-color: #fff;
                      border-radius: 5px;
                      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
    
                    h1 {
                      color: #333;
                      font-size: 24px;
                      margin-bottom: 20px;
                    }
    
                    p {
                      font-size: 16px;
                      line-height: 1.5;
                      margin-bottom: 10px;
                    }
                    
                    .footer {
                      margin-top: 40px;
                      text-align: center;
                      font-size: 14px;
                      color: #999;
                    }
                </style>
             </head>

            <body>
            <div class="container">
              <h1>¡Bienvenido a Ojea!</h1>
              
               <p>Estimado/a [Nombre del destinatario],</p>
            
               <p>Le informamos que la empresa ${body.nombre_empresa} desea que continúe con el proceso de postulación al cargo de ${body.cargo} </p>    
             
              <p>Estamos encantados de contar con usted en el siguiente proceso de postulacion</p>

              <p>Si tiene alguna pregunta o necesita ayuda, no dude en ponerse en contacto con nosotros envía tu CV al siguiente correo ${body.email_empresa} Estamos aquí para ayudarlo/a.</p>
      
              <p>¡Le deseamos mucho éxito!</p>

              <div class="footer">
                <p>Atentamente,</p>
                <p>Equipo de Recursos Humanos</p>
                <p>${body.nombre_empresa}</p>
              </div>
            </div>
          </body>   
          `
      });

      return 'Correo enviado'
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Genera PDF del CV
  async pdf(id): Promise<any> {
    try {
      return new Promise<any>((resolve, reject) => {
        const pdfDoc = new PDFDocument();
     

        // Agrega contenido al PDF
        pdfDoc.text('¡Hola, este es un PDF generado con NestJS!');
        
        const filePath = 'C:/Users/Eme/Documents/pdf.pdf';
        const writeStream = fs.createWriteStream(filePath);

        // Escribe el PDF en el archivo
        pdfDoc.pipe(writeStream);

        pdfDoc.end();

        writeStream.on('finish', () => {
          resolve(filePath);
        });

        writeStream.on('error', (error) => {
          reject(error);
        });
      });
    } catch (error) {
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }
  
}

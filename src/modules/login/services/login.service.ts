import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginEntity } from '../models/entities/login.entity';
import * as otpGenerator from 'otp-generator';
import { ProfileEntity } from 'src/modules/profile/models/entities/profile.entity';
import { transporter } from 'src/mailer/mailer';
import { newPasswordDTO, resetPasswordDTO } from '../models/dto/login.register.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)  
    private LoginReposository: Repository<LoginEntity>,
    @InjectRepository(ProfileEntity)
    private PersonaReposository: Repository<ProfileEntity>,
    private jwtService: JwtService
  ){}

  // Crea un usuario
  async createLogin(registerBody): Promise<any>{

    const existsUser = await this.LoginReposository.findOne({where: {email: registerBody.email}});
    if(existsUser){
      
      throw new HttpException('Usuario ya existente', HttpStatus.ACCEPTED);
    }
    else {
      const encryptPass = await this.encrypt(registerBody.clave);
      const dataBody = {
        tipo_perfil: registerBody.tipo_perfil,
        email: registerBody.email,
        clave: encryptPass,
        fecha_creacion: new Date(Date.now())
      }
      const dataInsert = await this.LoginReposository.save(dataBody);
      return {"id": dataInsert.id};
    }

  }

  // Funcion para encriptar password
  async encrypt(password): Promise<string>{
    try{
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);

      return await hash;
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Inicio de sesion
  async sessionLogin(sessionBody): Promise<any>{

    const validateUser = await this.LoginReposository.findOne(
      {
        where:{
          email: sessionBody.email
        }
      }
    )

    if (validateUser) {
      const isMatch = await bcrypt.compare(sessionBody.clave, validateUser.clave);

      if(isMatch){
        const token =  this.jwtService.sign({userId: validateUser.id})
        const getPersona = await this.PersonaReposository.findOne({where:{fk_login: validateUser.id }})
        if(!getPersona){
          return {
            "id": validateUser.id,
            "estado": 0
          }
        }

      // Obtiene nombre y apellido hasta el primer espacio, luego concatene y deja el primer nombre y primer apellido
        const namePersona = getPersona.nombre.split(' ').shift()+' '+getPersona.apellido.split(' ').shift();
        const newBody = { 
          "estado": validateUser.estado,
          "estatus_registro": validateUser.estatus_registro,
          "tipo_perfil":validateUser.tipo_perfil,
          "token":token,
          "nombre":namePersona
        }
        return newBody
      }
    }
    else {
      return "Usuario no encontrado"
    }
  }

  // Manda el email para restablecer contraseña
  async forgotPassword(resetMail: resetPasswordDTO): Promise<string> {        
    try {
           
      const userRepository = await this.LoginReposository.findOneOrFail({where: {email: resetMail.email}});
      const smsToken = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false });
      userRepository.reset_token = smsToken;
      const updatePassword = await this.LoginReposository.save(userRepository);

      await this.sendEmail(resetMail.email, smsToken);
      return 'SmsToken creado'

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  
  }


  async validateSmsToken(smsToken): Promise<any> {        
    try {
       
      const userRepository = await this.LoginReposository.findOneOrFail({where: {reset_token: smsToken}});
      
      return 'Token Valido'
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Crea la nueva contraseña
  async createPassword(reqbody: newPasswordDTO): Promise<any> {        
    try {
      const userRepository = await this.LoginReposository.findOneOrFail({where: {reset_token: reqbody.smstoken}});
      const encryptPass = await this.encrypt(reqbody.newpassword);
      userRepository.clave = encryptPass
      const changepass = await this.LoginReposository.save(userRepository)

    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

  // Email para restablecer contraseña
  async sendEmail(emailsend, token){
    try{
      let info = await transporter.sendMail({
        from: "Contacto Ojea",
        to: emailsend, 
        subject: "Restablecer contraseña", 
        text: "Ojea", 
        html: 
          `<body>
          <div class="container">
            <p>Le informamos que hemos recibido una solicitud reciente para restablecer la contraseña de su cuenta. Si usted no ha solicitado este cambio, puede ignorar este correo electrónico.</p>
            <p>En caso de que desee proceder con el restablecimiento de su contraseña, le proporcionamos el siguiente token para continuar con el proceso:</p>
            <h2>${token}</h2>
            
          </div>
          <footer>
            <p>Este correo electrónico fue enviado automáticamente. Por favor, no responda a este correo electrónico.</p>
            <p>Atentamente, Ojea.</p>
            </footer>
          </body>`
      });

      return 'Correo enviado'
    }
    catch{
      throw new BadRequestException('Hubo un error', { cause: new Error() });
    }
  }

}

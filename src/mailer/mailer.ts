import nodemailer = require('nodemailer')

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: 'ojea.contacto@gmail.com', 
    pass: 'vgqffthvbpuhxxxs' 
  },

  });
  transporter.verify().then(() =>{
  console.log('ready for send emails');

})
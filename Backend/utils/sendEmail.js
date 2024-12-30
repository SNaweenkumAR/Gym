import nodeMailer from 'nodemailer';

export const sendEmail = async(options) =>{

    const transporter = nodeMailer.createTransport({
        host:process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE ,
        secure: process.env.SMTP_PORT == 465,
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        },
    });

  const mailoptions = {
    from:process.env.SMTP_MAIL,
    to:options.email,
    subject:options.subject,
    text:`${options.message} \n\n Email of user Who send the Message :${options.userEmail}`,
  };
  await transporter.sendMail(mailoptions)


}

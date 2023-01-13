import expressAsyncHandler from 'express-async-handler'
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config();

sgMail.setApiKey(process.env.SGMAIL_API);

const sendEmail = expressAsyncHandler(async (req, res)=>{
    const newEmail = req.body;
    console.log(newEmail);
    await sgMail.send({
        to: newEmail.email,
        from: 'gbhattarai55@gmail.com',
        subject: newEmail.subject,
        text: newEmail.body
    })
    res.status(200).send({'mssg':'Email sent successfully!'})
  });

  export { sendEmail }

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'pratikkamejaliya6157@gmail.com',
        pass:"nebvdwmyfenensgb"
    }
});

const sendotp = (to,otp) =>{
    const mailOptions = {
        from :"pratikkamejaliya6157@gmail.com",
        to:to,
        subject:"Your OTP",
        text:`Your Otp is ${otp}`
    }
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.error('Error sending mail:', err);
        }else{
            console.log('Email sent: ' + info.response);
        }
    })
}

export default sendotp
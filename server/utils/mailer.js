import twilio from 'twilio'
import dotenv from 'dotenv';



dotenv.config();




export function sendOtp(otp,number){
    const client=new twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN,process.env.PHONE_NUMBER)

    return client.messages
    .create({body:`Otp to login to Soulmate : ${otp}`,from:'+18283057809',to:number})
    .then(message=>console.log(message))
    .catch(err=>console.log(err))
}


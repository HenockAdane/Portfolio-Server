const nodemailer = require ("nodemailer")


const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
})


const SendMail = async (subject,html)=> {
    try {

      
        let info = await transporter.sendMail({
            from: `<${process.env.USER}>`,
            to: process.env.TO,
            subject: subject,
            html: html
        })
    
        return info
    } catch(error){
        console.log("error for nodemailer")
        console.log(error)
    }
}



module.exports = SendMail


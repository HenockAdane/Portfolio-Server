const express = require("express")
const router = express.Router()
const SendMail = require("./SendMail")


const ContactForm = (app) => {

    app.post("/contact", async (req,res) => {
        const {name, email, message} = req.body
        console.log(req.body)

        let errors = [null, null, null]

        const isRequired = (n) => {
            errors = errors.map((a,i) => i === n ? "this field is required" : a)
        }

        const customeError = (n, msg) => {
            errors = errors.map((a,i) => i === n ? msg : a)
        }

        if (name){

            if (!/^[a-zA-Z\s]*$/.test(name)){
                console.log("this should be false")

                customeError(0, "Name should only contain letters and spaces")
            }
        } else{
            isRequired(0)
        }

        if (email){

            if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)){
                customeError(1)
            }

        } else{
            isRequired(1)
        }

        if (!message){
            isRequired(2)
        }

        const noErrorsFound = errors.every(a => a === null)

        try{


            if (noErrorsFound){
                console.log("no errors found")

                const subject= `Contact Form: ${name}`
                const html=`<b
                    <ul>Name: ${name}</ul>
                    <ul>From: ${email}</ul>
                    <u>Message: ${message}<u/>
                </b>`
    
                const mailInfo = await SendMail(subject, html)
    
                if (mailInfo){
                    console.log("Email has been sent")
                    res.status(200).send()
                }
    
                else{
                    console.log("there has been an error")
                    throw new Error()
                }
    
            }

            else{
                throw {errors}
            }




        } catch(error){
            console.log(error)

            if (error.errors){
                console.log(error.errrors)
                res.status(403).send(error.errors)
            }

            else{
                res.status(500).send()
            }
        }

        // let formsHtml = `
        // <p>Name: ${name}</p>
        // <p>Email: ${email}<p>
        // <p>Message: ${message}</p>`
        // SendMail(res, `Contact Form: ${name}`, "hiieofbnhacxezwfaf@niwghx.com", formsHtml)
    })
}


module.exports = ContactForm

// mvvm
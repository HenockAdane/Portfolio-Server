// require('dotenv').config()
const express = require("express");
const port = process.env.PORT || 3001
const app = express();


app.use(express.json())


const cors = require("cors")
app.use(cors())


const ContactForm = require("./ContactForm")

ContactForm(app)




app.listen(port, ()=> console.log(`listening to port ${port}`));

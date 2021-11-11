const express = require("express");
const port = process.env.PORT || 3001
const app = express();


app.use(express.json())


const cors = require("cors")
app.use(cors())


const ContactForm = require("./ContactForm")

ContactForm(app)

app.get("/", (req,res) => {
    res.status(200).send(process.env.TO)
})

app.listen(port, ()=> console.log(`listening to port ${port}`));

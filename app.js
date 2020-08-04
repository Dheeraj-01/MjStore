const express = require("express");
const path = require("path");
const app = express();
const port = 80;
var bodyParser = require('body-parser')
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MjStore', { useNewUrlParser: true });


const ContactForm = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String
});


const contact = mongoose.model('Contact', ContactForm);

app.use(bodyParser())

// For serving static files
app.use('/static', express.static('static'))

//bug fix
app.engine('pug', require('pug').__express)

// Set the template engine as pug
app.set('view engine', 'pug')

// Set the views directory
app.set('views', path.join(__dirname, 'views'))

// Our pug demo endpoint
app.get("/", (req, res) => {
    res.status(200).render('index.pug', {})
});


app.post("/", (req, res) => {
    

    console.log(req.body);
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.render('index.pug')
    }).catch(()=>{
        res.status(404).send("Error")
    })
});



app.listen(port, () => {
    console.log("port is that http://localhost/");
})
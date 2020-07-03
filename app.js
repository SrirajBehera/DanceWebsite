const express = require('express')
const path = require('path')
const app = express()
const bodyparser = require('body-parser')
const port = 8000
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

// Making a schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params)
})

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug')
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.send('This item has been saved to the database')
    })
    .catch(()=>{
        res.status(400).send('Item was not saved to the database')
    })
})

app.listen(port, (req, res)=>{
    console.log(`Server running successfully at port ${port}`)
})
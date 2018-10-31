const express = require('express')
const app = express()
const port = 4000
const bookRouter = require('./Routes/bookRouter')
const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://nadinesk:blahblah123@ds235243.mlab.com:35243/rh')
const bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config()


app.get('/', (req, res) => res.send('Hello World!'))

app.use(cors())

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true})); 

app.use('/api/Books', bookRouter); 





app.listen(port, () => console.log(`Example app listening on port ${port}!`))
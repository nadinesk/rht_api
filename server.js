const express = require('express')
const app = express()
const port = 4000
const tweetRouter = require('./Routes/tweetRouter')
const bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config()


app.get('/', (req, res) => res.send('Hello World!'))

/*app.use(cors())

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true})); 

app.use('/api/tweets', tweetRouter);  */





app.listen(port, () => console.log(`Example app listening on port ${port}!`))
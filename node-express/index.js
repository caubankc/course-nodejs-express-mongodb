const express = require('express')
const http = require('http')
// displays http logs onto the screen
const morgan = require('morgan') 
// allows us to parse JSON format request
const bodyParser = require('body-parser')

const { dishAll, dishOne } = require('./routes/dishRouter')
const { promoAll, promoOne } = require('./routes/promoRouter')
const { leaderAll, leaderOne } = require('./routes/leaderRouter')
const hostname = 'localhost'
const port = 3000

const app = express()
// display DEV (debug-mode) logs
app.use(morgan('dev'))
// allows us to parse JSON format request
app.use(bodyParser.json())

app.use('/dishes', dishAll)
app.use('/dishes/:dishId', (req, res, next) => {
    req.dishId = req.params.dishId
    dishOne(req, res, next)
})

app.use('/promotions', promoAll)
app.use('/promotions/:promoId', (req, res, next) => {
    req.promoId = req.params.promoId
    promoOne(req, res, next)
})

app.use('/leaders', leaderAll)
app.use('/leaders/:leaderId', (req, res, next) => {
    req.leaderId = req.params.leaderId
    leaderOne(req, res, next)
})

// serve up contents of the public folder
app.use(express.static(__dirname + '/public')) 

app.use((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
})

const server = http.createServer(app)

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})


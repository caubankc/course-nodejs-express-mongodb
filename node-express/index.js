const express = require('express')
const http = require('http')
// displays http logs onto the screen
const morgan = require('morgan') 
// allows us to parse JSON format request
const bodyParser = require('body-parser')

const hostname = 'localhost'
const port = 3000

const app = express()
// display DEV (debug-mode) logs
app.use(morgan('dev'))
// allows us to parse JSON format request
app.use(bodyParser.json())

// process ALL incoming request prior to individual processing
app.all('/dishes', (req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
})

// Send the requested dishes
app.get('/dishes', (req, res, next) => {
    res.end('Will send all the dishes...')
})

// Create new dish from received params
app.post('/dishes', (req, res, next) => {
    res.end('Will create the dish: ' 
        + req.body.name
        + ' with details: '
        + req.body.description)
})

// Block update / PUT requests to dishes
app.put('/dishes', (req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on this endpoint.')
})

// Delete all dishes
app.delete('/dishes', (req, res, next) => {
    res.end('Will delete all the dishes...')
})

// Send the requested dish
app.get('/dishes/:dishId', (req, res, next) => {
    res.end('Will send the dish: ' + req.params.dishId + ' to you.')
})

// Block POST request to this endpoint
app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403
    res.end('POST operation not supported on this endpoint.')
})

// Update a dish
app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId)
    res.end('Will update the dish: ' 
        + req.body.name
        + ' with details: '
        + req.body.description)
})

// Delete a dish
app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId)
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



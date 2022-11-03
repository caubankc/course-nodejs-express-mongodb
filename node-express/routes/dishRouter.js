const express = require('express')
const bodyParser = require('body-parser')

const dishAll = express.Router()
dishAll.use(bodyParser.json())

const dishOne = express.Router()
dishOne.use(bodyParser.json())

// Allowing mounting of router
dishAll.route('/')
// process ALL incoming request prior to individual processing
.all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
// Send the requested dishes
.get((req, res, next) => {
    res.end('Will send all the dishes...')
})
// Create new dish from received params
.post((req, res, next) => {
    res.end('Will create the dish: ' 
        + req.body.name
        + ' with details: '
        + req.body.description)
})
// Block update / PUT requests to dishes
.put((req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on this endpoint.')
})
// Delete all dishes
.delete((req, res, next) => {
    res.end('Will delete all the dishes...')
})

dishOne.route('/')
.all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
// Send the requested dish
.get((req, res, next) => {
    res.end('Will send the dish: ' + req.dishId + ' to you.')
})
// Block POST request to this endpoint
.post((req, res, next) => {
    res.statusCode = 403
    res.end('POST operation not supported on this endpoint.')
})
// Update a dish
.put((req, res, next) => {
    res.write('Updating the dish: ' + req.dishId)
    res.end('Will update the dish: ' 
        + req.body.name
        + ' with details: '
        + req.body.description)
})
// Delete a dish
.delete((req, res, next) => {
    res.end('Deleting dish: ' + req.dishId)
})

module.exports =  {
    dishAll,
    dishOne
}
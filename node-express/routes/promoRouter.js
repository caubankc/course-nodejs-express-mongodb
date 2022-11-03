const express = require('express')
const bodyParser = require('body-parser')

const promoAll = express.Router()
promoAll.use(bodyParser.json())

const promoOne = express.Router()
promoOne.use(bodyParser.json())

// Allowing mounting of router
promoAll.route('/')
// process ALL incoming request prior to individual processing
.all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
// Send the requested promoes
.get((req, res, next) => {
    res.end('Will send all the promoes...')
})
// Create new promo from received params
.post((req, res, next) => {
    res.end('Will create the promo: ' 
        + req.body.name
        + ' with details: '
        + req.body.description)
})
// Block update / PUT requests to promoes
.put((req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on this endpoint.')
})
// Delete all promoes
.delete((req, res, next) => {
    res.end('Will delete all the promoes...')
})

promoOne.route('/')
.all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
// Send the requested promo
.get((req, res, next) => {
    res.end('Will send the promo: ' + req.promoId + ' to you.')
})
// Block POST request to this endpoint
.post((req, res, next) => {
    res.statusCode = 403
    res.end('POST operation not supported on this endpoint.')
})
// Update a promo
.put((req, res, next) => {
    res.write('Updating the promo: ' + req.promoId)
    res.end('Will update the promo: ' 
        + req.body.name
        + ' with details: '
        + req.body.description)
})
// Delete a promo
.delete((req, res, next) => {
    res.end('Deleting promo: ' + req.promoId)
})

module.exports =  {
    promoAll,
    promoOne
}
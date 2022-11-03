const express = require('express')
const bodyParser = require('body-parser')

const leaderAll = express.Router()
leaderAll.use(bodyParser.json())

const leaderOne = express.Router()
leaderOne.use(bodyParser.json())

// Allowing mounting of router
leaderAll.route('/')
// process ALL incoming request prior to individual processing
.all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
// Send the requested leaderes
.get((req, res, next) => {
    res.end('Will send all the leaders...')
})
// Create new leader from received params
.post((req, res, next) => {
    res.end('Will create the leader: ' 
        + req.body.name
        + ' with details: '
        + req.body.description)
})
// Block update / PUT requests to leaderes
.put((req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on this endpoint.')
})
// Delete all leaderes
.delete((req, res, next) => {
    res.end('Will delete all the leaders...')
})

leaderOne.route('/')
.all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
// Send the requested leader
.get((req, res, next) => {
    res.end('Will send the leader: ' + req.leaderId + ' to you.')
})
// Block POST request to this endpoint
.post((req, res, next) => {
    res.statusCode = 403
    res.end('POST operation not supported on this endpoint.')
})
// Update a leader
.put((req, res, next) => {
    res.write('Updating the leader: ' + req.leaderId)
    res.end('Will update the leader: ' 
        + req.body.name
        + ' with details: '
        + req.body.description)
})
// Delete a leader
.delete((req, res, next) => {
    res.end('Deleting leader: ' + req.leaderId)
})

module.exports =  {
    leaderAll,
    leaderOne
}
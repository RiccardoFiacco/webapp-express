const express = require('express');
const cors = require('cors')
const server = express()
const port = process.env.PORT;
const moviesRouter = require('../routers/movies');
const reviewsRouter = require('../routers/reviews');
const userRouter = require('../routers/users');
const { errorsHandler, notFound } = require('../middleware/utils');

server.use(express.static('public'))
server.use(express.json())
server.use(cors({origin:process.env.CORS_ORIGIN}))
server.use(cors({origin:"https://riccardofiacco.github.io"}))
server.use('/api/movies', moviesRouter)
server.use('/api/reviews', reviewsRouter)
server.use('/api/users', userRouter)
server.use(errorsHandler)
server.use(notFound)

server.listen(port,()=>{
    console.log("server in ascolto")
})

module.exports = server;
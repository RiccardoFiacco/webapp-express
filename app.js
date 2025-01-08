const express = require('express');
const cors = require('cors')
const server = express()
const port = process.env.PORT;
const moviesRouter = require('./routers/movies')

server.use(express.static('public'))
server.use(express.json())
server.use(cors({origin:process.env.CORS_ORIGIN}))
server.use('/api/movies', moviesRouter)
server.listen(port,()=>{
    console.log("server in ascolto")
})
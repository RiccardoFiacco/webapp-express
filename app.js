const express = require('express');
const server = express()
const port = 3000;
server.get('/', (req, res)=>{
    res.send('tutto ok')
})
server.listen(port,()=>{
    console.log("server in ascolto")
})
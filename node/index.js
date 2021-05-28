const http = require('http');
const requestHandler = require("./requestHandler")
const server = http.createServer(requestHandler); //servidor http
const port = 8000
server.listen(8000, ()=>{
    console.log(`server listening on port ${port} on website http://localhost:8000`)
});
const http = require('http');
const url = require('url')
const stringDecoder = require('string_decoder').StringDecoder
let petResources = {mascotas: [
    {kind:'perro', name:'alejo', owner:'diana'},
    {kind:'perro', name:'alejo', owner:'diana'},
    {kind:'perro', name:'alejo', owner:'diana'},
    {kind:'perro', name:'alejo', owner:'diana'},
    {kind:'perro', name:'alejo', owner:'diana'},
]}

const callBackServer = (req, res) => {  
    let cleanRoute
    const currentUrl = req.url // da la ruta despues del 
    const parsedUrl = url.parse(currentUrl, true) // si tiene query string generar objeto
    let ruta = parsedUrl.pathname
    //get http method
    const httpMethod = req.method

    //get the equery
    const Query = parsedUrl.query //o con destructuring
    const {query} =  parsedUrl
   
    //get the headers 
    const {headers} = req ? req : {}
    //route without /
    for(const each of ruta){
        if(each === '/'){
            cleanRoute = ruta.replace('/','')
            ruta = cleanRoute
        }
    }           
    //get the payload from request 
    const decoder = new stringDecoder('utf-8')
    let buffer = ''
    req.on('data',(data)=>{ // data es una variable tipo stream 
        buffer += decoder.write(data)
    })    
    req.on('end',()=>{ // finalizo es como avisar que ya no se espera recibir nada 
            buffer += decoder.end()
            //sort data
            if(headers["content-type"]==='application/json'){
                buffer = JSON.parse(buffer)
            }
            
            const data = {
                ruta: cleanRoute,
                query ,
                headers,
                httpMethod,
                payload:buffer 
            }

            //choose the handler of response
            let handler;
            console.log('data incoming',{data})
            console.log('datos',data.payload)

         
            if(cleanRoute && enrouters[cleanRoute] && enrouters[cleanRoute][httpMethod]){
                console.log('entre al metodos')
                handler = enrouters[cleanRoute][httpMethod]
            }else{
                handler=enrouters.noFound
            }

            /*if(cleanRoute.indexOf('ruta') != -1){
                res.end('estas en ruta cabron')
            }else{
                res.end('fuck up')
            }*/

            //exceute handler 
           

            if (typeof handler === 'function') {
                handler(data, (statusCode = 200, mensaje) => {
                    const respuesta = JSON.stringify(mensaje)
                    res.setHeader("Content-Type","application/json")
                    res.writeHead(statusCode)

     
                    // Se responde al appcliente
                    res.end(respuesta)
                })
            }
    })
    
  


    
  //console.log('headers', headers)
    //obtain url from object req //paso a la funcion create server otra funcion, osea un callback
    //obtner la ruta
    //send request depending on the route received
  
  }

const enrouters = { //handlers of routong
    ruta: (data, callback) =>{
        callback(200,{mensaje:'esta es /ruta'})
    },
    pets:{ GET : (data, callback) =>{
        callback(200, petResources.mascotas) //CRUD
        },
        POST : (data, callback) =>{
            petResources.mascotas.push(data.payload)
            callback(201, petResources.mascotas) //CRUD
            },
    },
    usuarios: (data, callback)=>{
        callback(404,{mensaje:'data no found'})
    }
}

const server = http.createServer(callBackServer); //servidor http
const port = 8000
server.listen(8000, ()=>{
    console.log(`server listening on port ${port} on website http://localhost:8000`)
});
const url = require('url')
const stringDecoder = require('string_decoder').StringDecoder
const enrouters = require("./enrutador")
module.exports = (req, res) => {  
    let cleanRoute
    let indexIndv
    const currentUrl = req.url // da la ruta despues del 
    const parsedUrl = url.parse(currentUrl, true) // si tiene query string generar objeto
    let ruta = parsedUrl.pathname
    //get http method
    const httpMethod = req.method

    //options-> GIVE CORS PERMISSIONS, wiriting headers
    res.setHeader("Access-Control-Allow-Origin","*")    
    res.setHeader("Access-Control-Allow-Methods","OPTIONS,GET,PUT,DELETE,POST")    
    res.setHeader("Access-Control-Allow-Headers","*")    
    //give immediately response when method is options
    if(httpMethod==='OPTIONS'){
        res.writeHead(200)
        res.end()
        return //para que no baje
    }
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
    console.log('ruta', ruta)
    req.on('data',(data)=>{ // data es una variable tipo stream 
        buffer += decoder.write(data)
    })    
    req.on('end',()=>{ // finalizo es como avisar que ya no se espera recibir nada 
            buffer += decoder.end()
            //sort data
            if(headers["content-type"]==='application/json'){
                buffer = JSON.parse(buffer)
            }
            
            if(query.indice){
                indexIndv = query.indice
                console.log('data incoming',indexIndv)
            }
            
            const data = {
                indice:indexIndv,
                ruta: cleanRoute,
                query ,
                headers,
                httpMethod,
                payload:buffer 
            }
            
            //choose the handler of response
            let handler;

            console.log('datos',data)

         
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


// CREAR SERVIDOR
const http = require('http');
const url = require('url')
const  StringDecoder  = require('string_decoder').StringDecoder
 
const server = http.createServer((req, res) => {
    // Obetener URL desde req
    const urlActual = req.url
    const urlParseada = url.parse(urlActual, true)
 
    // Obtener ruta
    const ruta = urlParseada.pathname
 
    // Quitar slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '')
 
    // Obtener metodo http
    const metodo = req.method.toLocaleLowerCase()
 
    // Obtener las variables del query url
    const { query = {} } = urlParseada
 
    // Obtener headers
    const { headers = {} } = req
 
    // Obtener Payloads 
    const decoder = new StringDecoder('utf-8')
    let buffer = ''
 
    // Acumular data cuando se reciba el payload
    req.on('data', (data) => buffer += decoder.write(data))
 
    // Finalizar el buffering decoder de payload 
    req.on('end', () => {
        buffer += decoder.end()
 
        // Ordenar los datos de reespuesta
        const data = {
            ruta: rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer
        }
 
        // Elegir handler de respuesta, dependiendo de la ruta 
        let handler
 
        if (rutaLimpia && enrutador[rutaLimpia]) {
            handler = enrutador[rutaLimpia]
        } else {
            handler = enrutador.noEncontrado
        }
 
        // Ejecutar HAndler para enviar respuesta 
        if (typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje)
                res.writeHead(statusCode)
 
                // Se responde al appcliente
                res.end(respuesta)
            })
        }
    })
})
 
const enrutador = {
    ruta: (data, callback) => {
        callback(200, { mensaje: 'Estas en /ruta' })
    },
    usuarios: (data, callback) => {
        callback(200, [{ nombre: 'Usuario1' }, { nombre: 'Usuario2' }])
    },
    noEncontrado: (data, callback) => {
        callback(404, { mensaje: 'Ruta no encontrada' })
    }
}
 
server.listen(8000, () => console.log('Server Works in http://localhost:8000/'));

const pets = require('./rutas/mascotas')

module.exports = { //handlers of routong
    ruta: (data, callback) =>{
        callback(200,{mensaje:'esta es /ruta'})
    },
    pets,
    usuarios: (data, callback)=>{
        callback(404,{mensaje:'data not found'})
    }
}
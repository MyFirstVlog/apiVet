
const pets = require('./rutas/mascotas')
const vets = require('./rutas/vets')
const owners = require('./rutas/owners')
const consults = require('./rutas/consults')

module.exports = { //handlers of routong
    ruta: (data, callback) =>{
        callback(200,{mensaje:'esta es /ruta'})
    },
    pets,
    vets,
    owners,
    consults,
    usuarios: (data, callback)=>{
        callback(404,{mensaje:'data not found'})
    }
}
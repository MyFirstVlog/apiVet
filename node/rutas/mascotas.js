
let petResources = require('../resources')
module.exports = { GET : (data, callback) =>{
    if(data.indice){
        if(petResources.mascotas[data.indice]){
            callback(200, petResources.mascotas[data.indice])}
        else{
            callback(404,{mensaje:`pet not found`})
       }                    
    }else{
        callback(200, petResources.mascotas)
    }
    
},
POST : (data, callback) =>{
    petResources.mascotas.push(data.payload)
    callback(201, petResources.mascotas) //CRUD
    },

DELETE : (data, callback) =>{
    if(data.indice){
        if(petResources.mascotas[data.indice]){
            petResources.mascotas = petResources.mascotas.filter((each,index)=> index != data.indice)
            callback(200, petResources.mascotas)}
        else{
            callback(204,{mensaje:'pet already deleted'})
       }                    
    }else{
        callback(400,{mensaje:'no index in your request'})
    }
    
},
PUT : (data, callback) =>{
    if(data.indice){
        if(petResources.mascotas[data.indice]){
            petResources.mascotas[data.indice] = data.payload
            callback(200, petResources.mascotas[data.indice])}
        else{
            callback(404,{mensaje:`pet not found`})
       }                    
    }else{
        callback(400,{mensaje:'no index in your request'})
    }
    
},
}
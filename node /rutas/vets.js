
let vetsResources = require('../resources')
module.exports = { GET : (data, callback) =>{
    if(data.indice){
        if(vetsResources.vets[data.indice]){
            callback(200, vetsResources.vets[data.indice])}
        else{
            callback(404,{mensaje:`vet not found`})
       }                    
    }else{
        callback(200, vetsResources.vets)
    }
    
},
POST : (data, callback) =>{
    vetsResources.vets.push(data.payload)
    callback(201, vetsResources.vets) //CRUD
    },

DELETE : (data, callback) =>{
    if(data.indice){
        if(vetsResources.vets[data.indice]){
            vetsResources.vets = vetsResources.vets.filter((each,index)=> index != data.indice)
            callback(200, vetsResources.vets)}
        else{
            callback(204,{mensaje:'vet already deleted'})
       }                    
    }else{
        callback(400,{mensaje:'no index in your request'})
    }
    
},
PUT : (data, callback) =>{
    if(data.indice){
        if(vetsResources.vets[data.indice]){
            vetsResources.vets[data.indice] = data.payload
            callback(200, vetsResources.vets[data.indice])}
        else{
            callback(404,{mensaje:`vet not found`})
       }                    
    }else{
        callback(400,{mensaje:'no index in your request'})
    }
    
},
}

let ownersResources = require('../resources')
module.exports = { GET : (data, callback) =>{
    if(data.indice){
        if(ownersResources.owners[data.indice]){
            callback(200, ownersResources.owners[data.indice])}
        else{
            callback(404,{mensaje:`owner not found`})
       }                    
    }else{
        callback(200, ownersResources.owners)
    }
    
},
POST : (data, callback) =>{
    ownersResources.owners.push(data.payload)
    callback(201, ownersResources.owners) //CRUD
    },

DELETE : (data, callback) =>{
    if(data.indice){
        if(ownersResources.owners[data.indice]){
            ownersResources.owners = ownersResources.owners.filter((each,index)=> index != data.indice)
            callback(200, ownersResources.owners)}
        else{
            callback(204,{mensaje:'owner already deleted'})
       }                    
    }else{
        callback(400,{mensaje:'no index in your request'})
    }
    
},
PUT : (data, callback) =>{
    if(data.indice){
        if(ownersResources.owners[data.indice]){
            ownersResources.owners[data.indice] = data.payload
            callback(200, ownersResources.owners[data.indice])}
        else{
            callback(404,{mensaje:`owner not found`})
       }                    
    }else{
        callback(400,{mensaje:'no index in your request'})
    }
    
},
}
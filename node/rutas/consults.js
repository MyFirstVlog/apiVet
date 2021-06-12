
let consultsResources = require('../resources')
//console.log('consukl resor', consultsResources)
var listOfResources = []
module.exports = { GET : (data, callback) =>{
    const consultsComplete = consultsResources.consults.map(consulta => 
        ({...consulta,
             pet:consultsResources.mascotas[consulta.pet],
             vet:consultsResources.vets[consulta.vet]
        }))
    if(data.indice){
        if(consultsResources.consults[data.indice]){
            callback(200, consultsComplete.consults[data.indice])}
        else{
            callback(404,{mensaje:`consult not found`})
       }                    
    }else{
        callback(200, consultsComplete)
    }

    
},
POST : (data, callback) =>{
    
    let consult = data.payload
    consult.dateCreation = new Date()
    consult.dateEdition = null 
   //listOfResources = [...consultsResources, consult]
    consultsResources.consults = [...consultsResources.consults, consult]
    //consultsResources.consults.push(consult)
    callback(201,consultsResources.consults) //CRUD
    },

DELETE : (data, callback) =>{
    if(data.indice){
        if(consultsResources.consults[data.indice]){
            consultsResources.consults = consultsResources.consults.filter((each,index)=> index != data.indice)
            callback(200, consultsResources.consults)}
        else{
            callback(204,{mensaje:'consult already deleted'})
       }                    
    }else{
        callback(400,{mensaje:'no index in your request'})
    }
    
},
PUT : (data, callback) =>{
    if(data.indice){
        if(consultsResources.consults[data.indice]){
            const {dateCreation} = consultsResources.consults[data.indice]
            consultsResources.consults[data.indice] ={ 
                ...data.payload,
                dateCreation,
                dateEdition : new Date()
            }
            callback(200, consultsResources.consults[data.indice])}
        else{
            callback(404,{mensaje:`consult not found`})
       }                    
    }else{
        callback(400,{mensaje:'no index in your request'})
    }
    
},
}
module.exports = { //handlers of routong
    ruta: (data, callback) =>{
        callback(200,{mensaje:'esta es /ruta'})
    },
    pets:{ GET : (data, callback) =>{
            if(data.indice){
                if(global.petResources.mascotas[data.indice]){
                    callback(200, global.petResources.mascotas[data.indice])}
                else{
                    callback(404,{mensaje:`pet not found`})
               }                    
            }else{
                callback(200, global.petResources.mascotas)
            }
            
        },
        POST : (data, callback) =>{
            global.petResources.mascotas.push(data.payload)
            callback(201, global.petResources.mascotas) //CRUD
            },
    },
    usuarios: (data, callback)=>{
        callback(404,{mensaje:'data not found'})
    }
}
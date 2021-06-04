let petkind = document.getElementById('kind')
let kindAnimal = ''
let pets = [{
    kind:'Dog',
    name: 'firulais',
    owner: 'Alejo'
},{
    kind:'Bird',
    name: 'lais',
    owner: 'Diana'

}]
let individualPet = {kind:'',name:'',owner:''}

const url = 'http://localhost:8000/pets'


const modal = document.getElementById('ModalAdd')
const petName = document.getElementById('petname')
const owner = document.getElementById('owner')
const form = document.getElementById('form');
const indice = document.getElementById('indice')
const submitButton = document.getElementById('saveButton') 

let petsServer = []

async function petsHTML(){ //se hace async wait para quye apesar de ser async el fecth no no comppile hasta que se obtemga rta
    /*fetch('http://localhost:8000/pets')
    .then((res) =>{ 
        if(res.ok){
            return res.json()
        }
        })
    .then(pets =>{ 
        petsServer = pets
        console.log(petsServer)
    }
        )*/
    try{
            const rta = await fetch(url)
            const mascotasServer = await rta.json()
            if(Array.isArray(mascotasServer)){
                petsServer = mascotasServer
            }
            if(mascotasServer.length > 0 )
            {
                let eachPet = petsServer.map((pet, index)=>
                `<tr>
                <th scope="row">${index}</th>
                <td>${pet.kind}</td>
                <td>${pet.name}</td>
                <td>${pet.owner}</td>
                <td>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#ModalAdd" class="btn btn-warning editar" data-indice=${index} onclick="editar(this)"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger" data-indice=${index} onclick="deletePet(this)" ><i class="fas fa-trash"></i></button>             
                    
                </div>
                </td>
            </tr>`
            ).join("")
                listOfPets.innerHTML = eachPet
            }else{
                listOfPets.innerHTML = `<tr> 
                            <td colspan="5">There's no pets</td>
                        </tr>`
            }
            

        //Array.from(document.getElementsByClassName('editar')).forEach((editButton) => editButton.onclick = editar)
        

    }catch(error){
        throw error
    }
    
}

function editar(e){
    //console.log(e)
    //console.dir(e)
    submitButton.innerHTML = "Edit"    
    petName.value = petsServer[e.dataset.indice].name
    owner.value = petsServer[e.dataset.indice].owner
    const fun= () => {
        //pets[e.dataset.indice].kind
        if(petsServer[e.dataset.indice].kind == 'Dog'){
            return '1'
            }
        if(petsServer[e.dataset.indice].kind== 'Cat'){
            return '2'
            }
        if(petsServer[e.dataset.indice].kind== 'Bird'){
            return '3'
            }
        if(petsServer[e.dataset.indice].kind == 'Other'){
            return '4'
            }
    }
    
    petkind.value = fun()    
    indice.value = e.dataset.indice 

}

async function deletePet(e){    
    //pets = pets.filter((element,indice) => indice != e.dataset.indice) 
    try {
        const deleteUrl = `http://localhost:8000/pets/?indice=${e.dataset.indice}`   
        const respuesta =await fetch(deleteUrl,{
            method:'DELETE',     
            mode:"cors",
        })
        if(respuesta.ok){
            petsHTML()
        }
    } catch (error) {
        throw error
    }
    

}

//solicitar mascotas
function requestPets(){
    fetch('http://localhost:8000/pets')
    .then((res) =>{ 
        if(res.ok){
            return res.json()
        }
        })
    .then(pets =>{ 
        petsServer = pets
        console.log(petsServer)
    }
        )
}
async function handleSubmit(e){
    e.preventDefault()

    try {

    let accion = submitButton.innerHTML

    if(petkind.value == '1'){
        kindAnimal = 'Dog'
        }
    if(petkind.value == '2'){
            kindAnimal = 'Cat'
        }
    if(petkind.value == '3'){
            kindAnimal = 'Bird'
        }
    if(petkind.value == '4'){
            kindAnimal = 'Other'
        }
    
    if(petName.value != "" &&  petkind.value != "0" && owner != ""){   
        
            individualPet = {
            kind:kindAnimal,
            name:petName.value,
            owner:owner.value
            }     
    
    }
    let metodo = 'POST'
    let urlEnvio = url
    if(accion == 'Edit'){           
            metodo = 'PUT'
            pets[indice.value] = individualPet     
            urlEnvio = `http://localhost:8000/pets/?indice=${indice.value}`     
            submitButton.innerHTML = "Save"
           
            //petsHTML()           
    }
    const respuesta =await fetch(urlEnvio,{
        method:metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(individualPet),
        mode:"cors",
    })
    
    if(respuesta.ok){
        petsHTML()
        petName.value = ''
        owner.value = ''
        petkind.value = '0'
    }
        
    } catch (error) {
        throw error
    }
    
    
    

    
}

const listOfPets = document.getElementById('list-pets')

petsHTML()

submitButton.onclick = handleSubmit


//form.onsubmit = handleSubmit

/**
 fetch(url,{
     metho
 })
 */
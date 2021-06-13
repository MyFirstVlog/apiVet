
const listaConsultas = document.getElementById('list-consults')
const optionsServerConsultsPets = document.getElementById('listPets')
const optionsServerConsultsVets = document.getElementById('listVets')
const submitButton = document.getElementById('saveButton') 
const index = document.getElementById('indice')
const vet = document.getElementById('listVets')
const pet = document.getElementById('listPets')
const history = document.getElementById('petHistory')
const diagnosis = document.getElementById('listDiagnosis')
const urlV = 'https://vetappback.vercel.app/consults'

let individualConsult = {index:'',vet:'',pet:'', historia:'', diagnosis:''}


let consults = []
let pets = []
let vets = []
/**
  {pet:0, vet: 0,dateCreation:new Date(), dateEdition: new Date(),historia:'',diagnosis:''},
        {pet:1, vet: 1,dateCreation:new Date(), dateEdition: new Date(),historia:'',diagnosis:''},
        {pet:2, vet: 2,dateCreation:new Date(), dateEdition: new Date(),historia:'',diagnosis:''},
 */

const url = 'https://vetappback.vercel.app/consults'

async function listConsults(){
    try {
        const respuesta = await fetch(url)
        const serverConsults = await respuesta.json()
        if(Array.isArray(serverConsults)){
            consults = serverConsults
        }
        if(respuesta.ok){
            console.log('respuestasiM', consults)
            const htmlConsults = consults.map((each,index) => `<tr>
            <th scope="row">${index}</th>
            <td>${each.pet.name}</td>
            <td>${each.vet.name} ${each.vet.lName}</td>
            <td>${each.dateCreation}</td>
            <td>${each.dateEdition}</td>
            <td>${each.historia}</td>
            <td>${each.diagnosis}</td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                  <button type="button" data-bs-toggle="modal" data-bs-target="#ModalAdd" class="btn btn-warning editar" data-indice=${index} onclick="editar(this)"><i class="fas fa-edit"></i></button>
                  
              </div>
            </td>
          </tr>`
        ).join("")
        listaConsultas.innerHTML=htmlConsults
            
        }
    } catch (error) {
        throw error
    }
}

listConsults()

const urlPets = 'https://vetappback.vercel.app/pets'
async function listSelect(){
    try {
        const response = await fetch(urlPets)
        const serverSelect = await response.json()
        if(Array.isArray(serverSelect)){
            pets = serverSelect
        }
        if(response.ok){
            console.log('respuestas', pets)
            const htmlSelect = pets.map((each,index) => `<option value=${index}>${each.name}</option>  `
        ).join("")
        optionsServerConsultsPets.innerHTML += htmlSelect             
        }
    } catch (error) {
        throw error
    }


}
listSelect()
//Vets}
const urlVets = 'https://vetappback.vercel.app/vets'
async function listSelectVets(){
    try {
        const response2 = await fetch(urlVets)
        const serverSelectVet = await response2.json()
        if(Array.isArray(serverSelectVet)){
            pets = serverSelectVet
        }
        if(response2.ok){
            console.log('respuestas', pets)
            const htmlSelectVets = pets.map((each,index) => `<option value=${index}>${each.name} ${each.lName}</option>  `
        ).join("")
        optionsServerConsultsVets.innerHTML += htmlSelectVets
            
        }
    } catch (error) {
        throw error
    }
}


function editar(e){
    /*console.log(e)
    console.dir(e)*/
    console.log('pet',Number(consults[e.dataset.indice].pet.id))
    console.log('vet',Number(consults[e.dataset.indice].vet.id))
    submitButton.innerHTML = "Edit"    
    pet.value = Number(consults[e.dataset.indice].pet.id)//consults[e.dataset.indice].pet.id//e.dataset.indice 
    vet.value = Number(consults[e.dataset.indice].vet.id)//consults[e.dataset.indice].vet.id//e.dataset.indice 
    history.value = consults[e.dataset.indice].historia
    diagnosis.value = consults[e.dataset.indice].diagnosis
    index.value = e.dataset.indice 
    /*console.log('index', consults[e.dataset.indice])    
    console.log('ds', vet)  
    console.log('ds', pet)*/     

}


listSelectVets()

//Diagnosis

async function handleSubmit(e){
    e.preventDefault()
    try {
        
        let accion = submitButton.innerHTML   
             
        individualConsult={index:index.value,vet:vet.value,pet:pet.value, historia:history.value, diagnosis:diagnosis.value}
  
        console.log('esto es lo que se envia', individualConsult)
        let metodo = 'POST'
        let urlEnvio = urlV

        if(accion == 'Edit'){
            metodo = 'PUT'
            urlEnvio = `https://vetappback.vercel.app/consults/?indice=${index.value}` 
            submitButton.innerHTML = "Save"            
        }
        const respuesta =await fetch(urlEnvio,{
            method:metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(individualConsult),
            mode:"cors",
        })
        console.log('respuestaR', respuesta)
        if(respuesta.ok){
            listConsults()
            pet.value = '-1'
            vet.value = '-1'
            history.value = ''
            diagnosis.value = ''
        }
        
    } catch (error) {
        throw error
    }


    
}

submitButton.onclick = handleSubmit


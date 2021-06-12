

const listaConsultas = document.getElementById('list-consults')

let consults = []

/**
 * {pet:0, vet: 0,dateCreation:new Date(), dateEdition: new Date(),historia:'',diagnosis:''},
        {pet:1, vet: 1,dateCreation:new Date(), dateEdition: new Date(),historia:'',diagnosis:''},
        {pet:2, vet: 2,dateCreation:new Date(), dateEdition: new Date(),historia:'',diagnosis:''},
 */

const url = 'http://localhost:8000/consults'

async function listConsults(){
    try {
        const respuesta = await fetch(url)
        const serverConsults = await respuesta.json()
        if(Array.isArray(serverConsults)){
            consults = serverConsults
        }
        if(respuesta.ok){
            console.log('respuestas', consults)
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
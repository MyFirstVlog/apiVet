let country = document.getElementById('country')
let countryType = ''
let vets = []
let individualVet = {id:'',name:'',lName:'', country:''}

const idVet = document.getElementById('idVet')
const modal = document.getElementById('ModalAdd')
const vetName = document.getElementById('nameVet')
const lNameVet = document.getElementById('LnameVet')
const form = document.getElementById('form');
const indice = document.getElementById('indice')
const submitButton = document.getElementById('saveButton') 
const listOfVets = document.getElementById('list-vets')
const url = 'https://vetappback.vercel.app/vets'



async function vetsHTML(){
    try {
        const rta = await fetch(url)
        const vetServer = await rta.json()
        if(Array.isArray(vetServer)){
            vets = vetServer
        }
        if(vetServer.length > 0){

            let eachVet = vets.map((vet, index)=>
                `<tr>
                <th scope="row">${index}</th>
                <td>${vet.id}</td>
                <td>${vet.name}</td>
                <td>${vet.lName}</td>
                <td>${vet.country}</td>
                <td>
                  <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" data-bs-toggle="modal" data-bs-target="#ModalAdd" class="btn btn-warning editar" data-indice=${index} onclick="editar(this)"><i class="fas fa-edit"></i></button>
                      <button type="button" class="btn btn-danger" data-indice=${index} onclick="deleteVet(this)" ><i class="fas fa-trash"></i></button>             
                      
                  </div>
                </td>
              </tr>`
            ).join("")
        
            listOfVets.innerHTML = eachVet
        }else{
            listOfVets.innerHTML = `<tr> 
            <td colspan="6">There's no vets</td>
        </tr>`
        }
        
    } catch (error) {
        
    }
    //Array.from(document.getElementsByClassName('editar')).forEach((editButton) => editButton.onclick = editar)
    
}

function editar(e){
    //console.log(e)
    //console.dir(e)
    submitButton.innerHTML = "Edit"    
    vetName.value = vets[e.dataset.indice].name
    lNameVet.value = vets[e.dataset.indice].lName
    idVet.value = vets[e.dataset.indice].id
    console.log(vets[e.dataset.indice].country)
    const fun= () => {
        //pets[e.dataset.indice].kind
        if(vets[e.dataset.indice].country == 'Colombia'){
            return '1'
            }
        if(vets[e.dataset.indice].country== 'Costa Rica'){
            return '2'
            }
        if(vets[e.dataset.indice].country== 'Netherlands'){
            return '3'
            }
        if(vets[e.dataset.indice].country == 'USA'){
            return '4'
            }
    }
    
    country.value = fun()    
    indice.value = e.dataset.indice 

}

async function deleteVet(e){    
    try {
        const deleteUrl = `https://vetappback.vercel.app/vets/?indice=${e.dataset.indice}`   
        const respuesta =await fetch(deleteUrl,{
            method:'DELETE',     
            mode:"cors",
        })
        if(respuesta.ok){
            vetsHTML()
        }
    } catch (error) {
        
    }
    //vets = vets.filter((element,indice) => indice != e.dataset.indice)    
   
}
 

async function handleSubmit(e){
    e.preventDefault()

    try {
        let accion = submitButton.innerHTML

        if(country.value == '1'){
            kindCountry = 'Colombia'
            }
        if(country.value == '2'){
            kindCountry = 'Costa Rica'
            }
        if(country.value == '3'){
            kindCountry = 'Netherlands'
            }
        if(country.value == '4'){
            kindCountry = 'USA'
            }
        
        if(vetName.value != "" &&  country.value != "0" && lNameVet != "" && idVet != ""){   

                individualVet={id:idVet.value,name:vetName.value,lName:lNameVet.value, country:kindCountry}

        
        }

        let metodo = 'POST'
        let urlEnvio = url
        if(accion == 'Edit'){
            metodo = 'PUT'
            urlEnvio = `https://vetappback.vercel.app/vets/?indice=${indice.value}` 
            submitButton.innerHTML = "Save"
            
        }
        const respuesta =await fetch(urlEnvio,{
            method:metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(individualVet),
            mode:"cors",
        })
        if(respuesta.ok){
            vetsHTML()
            idVet.value = ''
            vetName.value = ''
            lNameVet.value = ''
            country.value = '0'
        }
    } catch (error) {
        throw error
    }
    
  
    

    
}






submitButton.onclick = handleSubmit

vetsHTML()

//form.onsubmit = handleSubmit
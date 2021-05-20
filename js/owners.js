let country = document.getElementById('country')
let countryType = ''
let owners = [{
    id:'123',
    name:'Alex',
    lName: 'Estrada',
    country: 'USA'
},{
    id:'12433',
    name:'Duck',
    lName: 'firulais',
    country: 'Colombia'

}]
let individualOwner = {id:'',name:'',lName:'', country:''}

const idOwner = document.getElementById('idOwner')
const modal = document.getElementById('ModalAdd')
const OwnerName = document.getElementById('nameOwner')
const lNameOwner = document.getElementById('LnameOwner')
const form = document.getElementById('form');
const indice = document.getElementById('indice')
const submitButton = document.getElementById('saveButton') 
const listOfOwners = document.getElementById('list-owners')
/*
console.log(idVet)
console.log(vetName)
console.log(lNameVet)
*/

function ownersHTML(){
    let eachOwner = owners.map((owner, index)=>
        `<tr>
        <th scope="row">${index}</th>
        <td>${owner.id}</td>
        <td>${owner.name}</td>
        <td>${owner.lName}</td>
        <td>${owner.country}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" data-bs-toggle="modal" data-bs-target="#ModalAdd" class="btn btn-warning editar" data-indice=${index} onclick="editar(this)"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger" data-indice=${index} onclick="deleteOwner(this)" ><i class="fas fa-trash"></i></button>             
              
          </div>
        </td>
      </tr>`
    ).join("")

    listOfOwners.innerHTML = eachOwner
    //Array.from(document.getElementsByClassName('editar')).forEach((editButton) => editButton.onclick = editar)
    
}

function editar(e){
    console.log(e)
    console.dir(e)
    submitButton.innerHTML = "Edit"    
    OwnerName.value = owners[e.dataset.indice].name
    lNameOwner.value = owners[e.dataset.indice].lName
    idOwner.value = owners[e.dataset.indice].id
    console.log(owners[e.dataset.indice].country)
    const fun= () => {
        //pets[e.dataset.indice].kind
        if(owners[e.dataset.indice].country == 'Colombia'){
            return '1'
            }
        if(owners[e.dataset.indice].country== 'Costa Rica'){
            return '2'
            }
        if(owners[e.dataset.indice].country== 'Netherlands'){
            return '3'
            }
        if(owners[e.dataset.indice].country == 'USA'){
            return '4'
            }
    }
    
    country.value = fun()    
    indice.value = e.dataset.indice 

}

function deleteOwner(e){    
    owners = owners.filter((element,indice) => indice != e.dataset.indice)    
    ownersHTML()
}
 

const handleSubmit = (e) =>{
    e.preventDefault()
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
    
    if(OwnerName.value != "" &&  country.value != "0" && lNameOwner != "" && idOwner != ""){   

            individualOwner={id:idOwner.value,name:OwnerName.value,lName:lNameOwner.value, country:kindCountry}

    
    }
    switch(accion){
        case 'Edit':   
         
            owners[indice.value] = individualOwner       
            submitButton.innerHTML = "Save"
            idOwner.value = ''
            OwnerName.value = ''
            lNameOwner.value = ''
            country.value = '0'
            //petsHTML()                 
                        
            break
        default:            
            owners.push(individualOwner)
            idOwner.value = ''
            OwnerName.value = ''
            lNameOwner.value = ''
            country.value = '0'
            break
            
    }
    ownersHTML()
    

    
}








submitButton.onclick = handleSubmit

//form.onsubmit = handleSubmit
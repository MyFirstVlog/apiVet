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


const modal = document.getElementById('ModalAdd')
const petName = document.getElementById('petname')
const owner = document.getElementById('owner')
const form = document.getElementById('form');
const indice = document.getElementById('indice')
const submitButton = document.getElementById('saveButton') 

function petsHTML(){
    let eachPet = pets.map((pet, index)=>
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
    //Array.from(document.getElementsByClassName('editar')).forEach((editButton) => editButton.onclick = editar)
    
}

function editar(e){
    console.log(e)
    console.dir(e)
    submitButton.innerHTML = "Edit"    
    petName.value = pets[e.dataset.indice].name
    owner.value = pets[e.dataset.indice].owner
    const fun= () => {
        //pets[e.dataset.indice].kind
        if(pets[e.dataset.indice].kind == 'Dog'){
            return '1'
            }
        if(pets[e.dataset.indice].kind== 'Cat'){
            return '2'
            }
        if(pets[e.dataset.indice].kind== 'Bird'){
            return '3'
            }
        if(pets[e.dataset.indice].kind == 'Other'){
            return '4'
            }
    }
    
    petkind.value = fun()    
    indice.value = e.dataset.indice 

}

function deletePet(e){    
    pets = pets.filter((element,indice) => indice != e.dataset.indice)    
    petsHTML()
}
 

const handleSubmit = (e) =>{
    e.preventDefault()
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
    switch(accion){
        case 'Edit':   
         
            pets[indice.value] = individualPet          
            submitButton.innerHTML = "Save"
            petName.value = ''
            owner.value = ''
            petkind.value = '0'
            //petsHTML()                 
                        
            break
        default:            
            pets.push(individualPet)
            petName.value = ''
            owner.value = ''
            petkind.value = '0'
            break
            
    }
    petsHTML()
    

    
}


const listOfPets = document.getElementById('list-pets')



submitButton.onclick = handleSubmit

//form.onsubmit = handleSubmit
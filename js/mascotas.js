let petkind = document.getElementById('kind')
let kindAnimal = ''
let pets = []
let individualPet = {kind:'',name:'',owner:''}

const modal = document.getElementById('ModalAdd')
const petName = document.getElementById('petname')
const owner = document.getElementById('owner')
const form = document.getElementById('form');
const submitButton = document.getElementById('saveButton') 

const handleSubmit = (e) =>{
    e.preventDefault()
    if(petkind.value == '1'){
        kindAnimal = 'Dog'
        console.log('dentro 1')}
    if(petkind.value == '2'){
            kindAnimal = 'Cat'
            console.log('dentro 2')}
    if(petkind.value == '3'){
            kindAnimal = 'Bird'
            console.log('dentro 3')}
    if(petkind.value == '4'){
            kindAnimal = 'Other'
            console.log('dentro 4')}
    if(petName.value != "" &&  petkind.value != "Animal Kind" && owner != ""){    
        individualPet = {
        kind:kindAnimal,
        name:petName.value,
        owner:owner.value
        }
        console.log('cumplo')
        pets.push(individualPet)
        petsHTML()
        petName.value = ''
        owner.value = ''
        kindAnimal = 'Animal Kind'
       
    
    }
}


const listOfPets = document.getElementById('list-pets')

function petsHTML(){
    let eachPet = pets.map((pet, index)=>
        `<tr>
        <th scope="row">${index}</th>
        <td>${pet.kind}</td>
        <td>${pet.name}</td>
        <td>${pet.owner}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" class="btn btn-warning"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger"><i class="fas fa-trash"></i></button>             
              
          </div>
        </td>
      </tr>`
    ).join("")

    listOfPets.innerHTML = eachPet
}



submitButton.onclick = handleSubmit


form.onsubmit = handleSubmit
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let toyCollection = document.querySelector("div#toy-collection");
let addToy = false


// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', e=>{
  populateTheToyList()
})
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
function populateTheToyList(){
  toyCollection.innerHTML = ""
  api.getToys().then(toys => {
    toys.forEach(toy =>{
      createCardElement(toy)
    })
  })
  
}

function createCardElement(toy){
  let h1 = document.createElement('h2');
  h1.innerText = toy.name;
// debugger
  let img = document.createElement('img');
  img.setAttribute('src', toy.image);
  img.setAttribute('class', 'toy-avatar');

  let p = document.createElement('p');
  p.innerText = `${toy.likes} Likes`


  let btn = document.createElement('button');
  btn.className = "like-btn"
  btn.id = `${toy.id}`
  btn.innerText = "like"
  let divCard = document.createElement('div');
  divCard.className = "card";
  divCard.append(h1, img, p, btn)
  toyCollection.append(divCard);
  btn.addEventListener('click', e =>{
    // e.preventDefault()
    let newLikes = parseInt(toy.likes)
    newLikes++
    toy.likes = newLikes
    let object = {likes: newLikes }
    api.updateToy(toy.id, object).then(p.innerText = `${toy.likes} Likes`)

    
  })

  
  
  
}

// add toy from the form 
toyForm.addEventListener('submit',e => {
  e.preventDefault();
  api.createToy().then(populateTheToyList);
})
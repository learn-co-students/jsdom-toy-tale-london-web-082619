
// LOCATORS:
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const actualtoyForm = document.querySelector('.add-toy-form')

const createToyBtn = toyForm.querySelector('.submit')
const toyCollectionDiv = document.querySelector('#toy-collection')

const toyURL = "http://localhost:3000/toys"

let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// ADD TOYS FROM API TO PAGE
document.addEventListener("DOMContentLoaded", function(){
  getToys()
})

function getToys(){
  fetch(toyURL)
  .then(resp => resp.json())
  .then(jsonArray => {
    renderAllToys(jsonArray)
  })
}

function renderAllToys(jsonArray){
  jsonArray.forEach(element => {
    createToyCard(element)
  })
}

function createToyCard(element){
  let cardDiv = document.createElement('div');
  cardDiv.className = "card";
  toyCollectionDiv.appendChild(cardDiv);

    let h2 = document.createElement('h2');
     h2.innerText = element.name;
     
    let image = document.createElement('img');
    image.src = element.image;
    image.className = "toy-avatar";

    let likes = document.createElement('p');
    likes.innerText = `${element.likes} Likes`;
  
    let button = document.createElement('button');
    button.className = 'like-btn';
    button.innerText = 'Like <3';

    button.addEventListener('click', function(event) {
        likes.innerText = `${element.likes} Likes`
        increaseLike(element)
    })
    cardDiv.append(h2, image, likes, button)

}  

// function likesCreateAndAppend(element, cardDiv){
//     let likes = document.createElement('p')
//     likes.innerText = `${element.likes} Likes`
//     cardDiv.appendChild(likes)
// }

// function buttonCreateAndAppend(element, cardDiv){
//     let button = document.createElement('button')
//     button.className = 'like-btn'
//     button.innerText = 'Like <3'
//     button.dataset.id = element.id
//     button.dataset.likes = element.likes

//     button.addEventListener('click', function(event) {
//         increaseLike(element)
//     })
//     cardDiv.appendChild(button)
// }

// ADD TOY FUNCTION

const postURL = 'http://localhost:3000/toys'

actualtoyForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addNewToy(event.target);
  event.target.removeEventListener();
})

// function toyBtnFunction(e){
//   e.preventDefault()
//   addNewToy(e)
// }

function addNewToy(e){
  fetch(postURL, configObject(e))
  .then(resp => resp.json())
  .then(data => createToyCard(data))
  // add new card to idex without refreshing - not necessary (why automatic?)
}

function configObject(e){
  let configurationObjectOne = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(dataFromForm(e))
  }
  return configurationObjectOne
}

function dataFromForm(e){
  let data = {
      name: e[0].value,
      image: e[1].value,
      likes: 0
  }
  return data
}


// LIKE BUTTON

BaseURL = 'http://localhost:3000/toys/'

function increaseLike(element){
  element.likes++;
  fetch(`http://localhost:3000/toys/${element.id}`, patchConfigObject(element))
}

// function idURL(e){
//   // id = e.target id
//   BaseURL + `${}`
// }

function patchConfigObject(element){
  let configurationObject = {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
    },
    body: JSON.stringify(element)
  }
  return configurationObject
}
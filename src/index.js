const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

//~~~~~~ GET REQUEST FOR TOYS ON LOAD ~~~~~~~//

document.addEventListener("DOMContentLoaded", function () {
  requestToy()
})

// TOY CARD CREATION ON PAGE LOAD
  let toyCollection = document.querySelector('#toy-collection')
  
// CREATION OF ELEMENTS INSIDE TOY CARD
  function createToyName(data, toyCard) {
    let h2 = document.createElement("h2")
    h2.innerText = `${data.name}`
    toyCard.appendChild(h2)
  }

  function createImage(data, toyCard) {
    let img = document.createElement("img")
    img.className = "toy-avatar"
    img.src = `${data.image}`
    toyCard.appendChild(img)
  }

  function createLikes(data, toyCard) {
    let p = document.createElement("p")
    p.innerText = `${data.likes} likes`
    toyCard.appendChild(p)

    let button = document.createElement("button")
    button.className = "like-btn"
    button.innerText = "like"
    toyCard.appendChild(button)

    button.addEventListener("click", function(event) {
        likeToy(data, p)
     })
  }

  //INCREASE LIKES 

  function likeToy(data, p) {
    data.likes++
    p.innerText = `${data.likes} likes`
    increaseLikes(data)
  }

  // CREATION OF TOY CARD
  function createCard(data) {
    
    for (let i = 0; i < data.length; i++) {
      const toyCard = document.createElement("div")
      toyCard.className = "card"

      createToyName(data[i], toyCard)
      createImage(data[i], toyCard)
      createLikes(data[i], toyCard)
      
      toyCollection.appendChild(toyCard)
    }
  }
  
// GET REQUEST TO API
function requestToy () {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => createCard(data))
    .catch(error => console.log(error.message))
}

//~~~~~~~~ POST ~~~~~~~~//

// CONFIGURATION 

function createToyConfig(toyName, imageUrl) {
  return {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: imageUrl,
      likes: 0
    })
  }
}

// POST REQUEST AND FETCHING DATA FROM INPUT FIELDS

function createToy() {
  const input = document.querySelectorAll("input.input-text")

  const nameInput = input[0]
  const imageInput = input[1]
  // event.target.elements.name.value
  // event.target.elements.image.value
  const toyName = nameInput.value;
  const imageUrl = imageInput.value;

  const configObj = createToyConfig(toyName, imageUrl);
  fetch("http://localhost:3000/toys", configObj)
    .then(response => response.json());
}

// EVENT LISTENER FOR CREATING NEW TOY

const submit = document.querySelector("input.submit")

submit.addEventListener("click", function() {
  event.preventDefault()
  createToy()
  requestToy()
})

//~~~~~~~~ PATCH REQUEST FOR INCREASING LIKES ~~~~~~~~~//

function increaseLikes(data) {
  fetch(`http://localhost:3000/toys/${data.id}`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
}

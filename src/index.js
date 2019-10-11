const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

const TOY_COLLECTION = document.getElementById(`toy-collection`);
const TOYSURL = `http://localhost:3000/toys`;

let addToyForm = document.querySelector('.add-toy-form');

// INITIALISE
document.addEventListener(`DOMContentLoaded`, () => {
  getToys(TOYSURL);
  addToyForm.addEventListener('submit', event => createToy(event));
})

// RENDERS ALL TOYS
function getToys(TOYSURL) {
  TOY_COLLECTION.innerText = ""
  fetch(TOYSURL)
    .then(response => response.json())
    .then(toys => renderToys(toys))
}

function renderToys(toys) {
  toys.forEach(toy => {
    renderToy(toy);
  })
}

function renderToy(toy) {
  // Create new toy container
  let newToyContainer = document.createElement(`div`);
  newToyContainer.className = `card`;
  newToyContainer.id = toy.id;
  TOY_COLLECTION.appendChild(newToyContainer);

  // Insert toy data into container
  let newToyName = document.createElement(`h2`)
  newToyName.innerText = toy.name;
  newToyContainer.appendChild(newToyName);

  let newToyImg = document.createElement(`img`);
  newToyImg.src = toy.image;
  newToyImg.className = `toy-avatar`;
  newToyContainer.appendChild(newToyImg);

  let newToyLikes = document.createElement(`p`);
  if (toy.likes > 1) {
    newToyLikes.innerText = `${toy.likes} likes`;
  } else {
    newToyLikes.innerText = `${toy.likes} like`;
  }
  newToyContainer.appendChild(newToyLikes);

  let newToyButton = document.createElement(`button`);
  newToyButton.className = 'like-btn';
  newToyButton.innerText = 'Like <3';
  newToyButton.addEventListener('click', event => updateToy(event));
  newToyContainer.appendChild(newToyButton);
}

// CREATE A NEW TOY
function createFetchConfig(bodyData, httpMethod) {
  return {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(bodyData)
}}

// CREATE NEW TOY
function createToy(event) {
  event.preventDefault()
  addToyForm = document.querySelector('.add-toy-form');

  let toyFormData = {
    name: addToyForm.name.value,
    image: addToyForm.image.value,
    likes: 0
  };

  let configObject = createFetchConfig(toyFormData, "POST");

  fetch(TOYSURL, configObject)
    .then(response => response.json())
    .then(toy => renderToy(toy))
}

// UPDATE TOY - i.e. ADD A LIKE
function updateToy(event) {
  event.preventDefault();

  let toyID = event.target.parentElement.id;
  let toyLikes = parseInt(event.target.parentElement.querySelector('p').innerText.split(" ")[0]) + 1;

  let toyFormData = {
    likes: toyLikes
  };

  let configObject = createFetchConfig(toyFormData, "PATCH");

  fetch(`${TOYSURL}` + `/${toyID}`, configObject)
  .then(response => response.json())
  .then(getToys(TOYSURL))

}




  //PICK UP HERE
  
  // let configObject = {
    
  // };









// Display add toy form
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})




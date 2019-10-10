const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyCollection = document.querySelector("#toy-collection");
const path = "http://localhost:3000/toys";
let addToy = false;

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
});


// OR HERE!
window.addEventListener("DOMContentLoaded", getToys);

function getToys() {
  fetch(path)
    .then(response => response.json())
    .then(json => renderToys(json))
    .catch(error => alert(error));
}

function renderToys(json) {
  json.forEach(toy => {
    const card = createToyCard(toy);
    toyCollection.appendChild(card);
  })
}

function createToyCard(toy) {
  const card = createBaseCard();
  card.appendChild(createCardHeading(toy.name));
  card.appendChild(createCardImage(toy.image));
  card.appendChild(createCardNumberOfLikes(toy.likes));
  card.appendChild(createCardButton());
  return card;
}

function createBaseCard() {
  const card = document.createElement("div");
  card.classList.add("card");
  return card;
}

function createCardHeading(toyName) {
  const heading = document.createElement("h2")
  heading.textContent = toyName;
  return heading;
}

function createCardImage(toyImage) {
  const img = document.createElement("img")
  img.classList.add("toy-avatar");
  img.src = toyImage;
  return img;
}

function createCardNumberOfLikes(toyLikes) {
  const numberOfLikes = document.createElement("p")
  numberOfLikes.textContent = `${toyLikes} Likes`;
  return numberOfLikes;
}

function createCardButton() {
  const button = document.createElement("button")
  button.textContent = "Like <3";
  button.classList.add("like-btn");
  return button;
}
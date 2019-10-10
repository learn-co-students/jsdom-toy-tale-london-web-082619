
const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyFields = toyForm.querySelectorAll(".input-text")
const createNewToyButton = toyForm.querySelector(".submit")
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
  const card = createBaseCard(toy.id);
  card.appendChild(createCardHeading(toy.name));
  card.appendChild(createCardImage(toy.image));
  card.appendChild(createCardNumberOfLikes(toy.likes));
  card.appendChild(createCardButton());
  return card;
}

function createBaseCard(toyId) {
  const card = document.createElement("div");
  card.id = toyId;
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
  numberOfLikes.innerHTML = `<span>${toyLikes}</span> Likes`;
  return numberOfLikes;
}

function createCardButton() {
  const button = document.createElement("button")
  button.textContent = "Like <3";
  button.classList.add("like-btn");
  button.addEventListener("click", likeToy);
  return button;
}

function likeToy(event) {
  const toyCard = event.target.parentNode;
  const likeSpan = toyCard.querySelector("span");
  let likes = parseInt(likeSpan.textContent);
  likes++;
  fetch(path + `/${toyCard.id}`, createNewLikeRequestConfig(likes))
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP status " + reponse.status)
      }
      likeSpan.textContent = `${likes}`
    })
    .catch(error => alert(error));
}

createNewToyButton.addEventListener("click", event => createNewToy(event));

function createNewToy(event) {
  event.preventDefault();
  if (toyIsValid()) {
    const newToy = createNewToyObject();
    postToy(newToy);
  }
}

function toyIsValid() {
  return [...toyFields].every(field => field.value !== "");
}

function createNewToyObject() {
  const toy = {}
  toyFields.forEach(field => {
    toy[`${field.name}`] = field.value;
  });
  toy.likes = 0;
  return toy;
}

function postToy(toy) {
  const requestConfig = createNewToyRequestConfig(toy);
  return fetch(path, requestConfig)
    .then(renderToys([toy]))
    .catch(error => alert(error));
}

function createNewToyRequestConfig(toy) {
  const requestConfig = createBasicRequestConfig("POST");
  requestConfig.body = JSON.stringify(toy);
  return requestConfig;
}

function createNewLikeRequestConfig(totalLikes) {
  const requestConfig = createBasicRequestConfig("PATCH");
  const likesObj = { likes: totalLikes };
  requestConfig.body = JSON.stringify(likesObj);
  return requestConfig;
}

function createBasicRequestConfig(method) {
  return {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
}


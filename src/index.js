var Module1 = (function() {

  const settings = {
    basePath: "http://localhost:3000/toys",
    addToy: false
  }

  const DOM = {}


  /*============ private methods =============*/

  function cacheDom() {
    DOM.addBtn = document.querySelector('#new-toy-btn');
    DOM.toyForm = document.querySelector('.container');
    DOM.toyFields = document.querySelectorAll(".input-text");
    DOM.createNewToyButton = document.querySelector(".submit");
  }

  function bindEvents() {
    DOM.addBtn.addEventListener("click", toggleToyForm);
    DOM.createNewToyButton.addEventListener("click", event => createNewToy(event));
  }

  function getToys() {
    fetch(settings.basePath)
      .then(response => response.json())
      .then(json => renderToys(json))
      .catch(error => alert(error));
  }

  function renderToys(json) {
    const toyCollection = document.querySelector("#toy-collection");

    json.forEach(toy => {
      const card = createToyCard(toy);
      toyCollection.appendChild(card);
    })
  }

  function createToyCard(toy) {
    const card = createBaseCard();
    card.appendChild(createCardHeading(toy.name));
    card.appendChild(createCardImage(toy.image));
    card.appendChild(createCardLikesCounter(toy.likes));
    card.appendChild(createCardButton(toy.id));
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
    const img = document.createElement("img");
    img.classList.add("toy-avatar");
    img.src = toyImage;
    return img;
  }

  function createCardLikesCounter(toyLikes) {
    const likesCounter = document.createElement("p");
    likesCounter.innerHTML = `<span>${toyLikes}</span> Likes`;
    return likesCounter;
  }

  function createCardButton(toyId) {
    const button = document.createElement("button");
    button.id = toyId;
    button.classList.add("like-btn");
    button.textContent = "Like <3";
    button.addEventListener("click", likeToy);
    return button;
  }

  function createNewToy(event) {
    event.preventDefault();
    if (toyIsValid()) {
      const newToy = createNewToyObject();
      persistToy(newToy);
    }
  }

  function toyIsValid() {
    return [...DOM.toyFields].every(field => field.value !== "");
  }

  function createNewToyObject() {
    const toy = {};
    DOM.toyFields.forEach(field => {
      toy[`${field.name}`] = field.value;
    });
    toy.likes = 0;
    return toy;
  }

  function persistToy(toy) {
    const requestConfig = createToyRequestConfig(toy);
    return fetch(settings.basePath, requestConfig)
      .then(renderToys([toy]))
      .catch(error => alert(error));
  }

  function createToyRequestConfig(toy) {
    const requestConfig = createBasicRequestConfig("POST");
    requestConfig.body = JSON.stringify(toy);
    return requestConfig;
  }

  function likeToy(event) {
    const toyId = event.target.id;
    const likeSpan = event.target.previousSibling.querySelector("span");
    let likes = parseInt(likeSpan.textContent);
    likes++;
    
    fetch(`${settings.basePath}/${toyId}`, createLikeRequestConfig(likes))
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP status " + reponse.status)
        }
        likeSpan.textContent = `${likes}`
      })
      .catch(error => alert(error));
  }

  function createLikeRequestConfig(totalLikes) {
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

  function toggleToyForm() {
    settings.addToy = !settings.addToy;
    if (settings.addToy) {
      DOM.toyForm.style.display = 'block'
    } else {
      DOM.toyForm.style.display = 'none'
    }
  }


  /*============= public methods ==============*/

  function init() {
    cacheDom();
    bindEvents();
    getToys();
  }


   /*========= export public methods ==========*/

  return {
    init: init
  }

}());

Module1.init();
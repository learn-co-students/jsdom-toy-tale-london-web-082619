const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyCollection = document.querySelector("#toy-collection");
const newToy = document.querySelector('.add-toy-form');
const url = 'http://localhost:3000/toys';
let addToy = false

// YOUR CODE HERE
function getToys(){ //index page
  fetch(url)
  .then(resp => resp.json())
  .then(toys => {
    toyCollection.innerHTML = '';
    toys.forEach(toy=> {
      toyCollection.innerHTML += `
      <div class='card' data-id=${toy.id}>
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p><span id="no-of-likes">${toy.likes}</span> Likes</p>
      <button class="like-btn">Like</button>
      </div>`
    })
    addButton();
  });
}

function createNewToy(){
  newToy.addEventListener('submit', createToy);
}

function createToy(e){
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: `${e.target.name.value}`,
      image: `${e.target.image.value}`,
      likes: 0
    })
  })
    .then(resp => resp.json())
    .then( getToys )
    .catch(error=>{
      console.log(error)
    });
}

getToys(); //need to return
createNewToy();

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
function addButton(){
  const likeButton = document.querySelectorAll(".like-btn");
  likeButton.forEach(like => {
    like.addEventListener('click', clickLike);
    })
  }


function clickLike(e){
  let findSpanNum = e.target.previousElementSibling.querySelector("span")
  let changeToInteger = Number.parseInt(findSpanNum.innerText)
  changeToInteger++;
  let toyID = e.target.parentNode.dataset.id 
  fetch(`http://localhost:3000/toys/${toyID}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: changeToInteger
    })
  }
  ).then(resp => resp.json())
  .then(json => findSpanNum.innerText = json.likes)
}

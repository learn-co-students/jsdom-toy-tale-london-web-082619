const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.getElementById('toy-collection')
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

// OR HERE!

document.addEventListener("DOMContentLoaded", function (){
  fetchToys();

})

function addNewToy(newToy){
  postToy(newToy)
  .then(toy => renderToy(toy))
}


function postToy(newToy){
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({...newToy, likes: 0})
  }).then(resp => resp.json());
  }



toyForm.addEventListener("submit", function(event){
  console.log('form submitted');
  event.preventDefault();
  addNewToy({
    name: event.target.elements.name.value,
    image: event.target.elements.image.value
  });
  event.target.reset();
})

function fetchToys(){
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => renderToys(toys)) 
}

function renderToys(toys){
  console.log('Rendering!');
  toys.forEach(function(toy){
    renderToy(toy)
  })
}

function renderToy(toy){
  const div = document.createElement('div');
  div.className = "card"
  toyContainer.append(div);
  const h = document.createElement('h2');
  h.innerText = toy.name;
  const img = document.createElement('img');
  img.className = "toy-avatar"
  img.src = toy.image;
  const p = document.createElement('p');
  p.innerText = `${toy.likes} likes`
  const button = document.createElement('button');
  button.className = "like-btn"
  button.innerText = "Like"
  button.addEventListener('click', function(e){
    toy.likes++
    fetch("http://localhost:3000/toys/"+toy.id, {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": "application/json"
                },
                body: JSON.stringify(toy)
            }); p.innerText = `${toy.likes} likes`
  }) 
  div.append(h, img, p, button);
}




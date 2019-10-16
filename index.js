const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyList = document.querySelector("#toy-collection")

//call data
API.getToys().then(toys => renderToys(toys));

//iteration
const renderToys = function(toys){
  for (const toy of toys){
    renderToy(toy)
  }
};

//Toy list
const renderToy = function(toy){
  const div = document.createElement("div");
  div.id = toy.id;
  div.className ="card";
  const h2 = document.createElement("h2");
  h2.innerText = toy.name
  const img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar";
  const p = document.createElement("p");
  p.innerText = `${toy.likes} Likes`;
  const btn = document.createElement("button");
  btn.className = "like-btn";
  btn.innerText = "Like";

  btn.addEventListener("click", function(e){
    likeToy(toy, p);
  });

  div.append(h2,img,p,btn);
  toyList.appendChild(div);
};
//ここから再度確認
//fron-tend to gather data through html
toyForm.addEventListener("submit", function(e){
  e.preventDefault();
  const newToy = {
    name: e.target.elements.name.value,
    image: e.target.elements.image.value,
    likes: 0
  }
  addNewToy(newToy);
  event.target.reset()
});
  
//back-end to post data
const addNewToy = function(newToy){
  API.postToy(newToy).then(toy => renderToy(toy))
};

//like. Optimistic
const likeToy = function(toy, p){
  //friont end
  toy.likes++
  p.innerText = `${toy.likes} Likes`
  //back end
  API.patchToy(toy)
};


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
});
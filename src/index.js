
document.addEventListener('DOMContentLoaded',()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toysUrl = 'http://localhost:3000/toys';
  const toyCollection = document.getElementById('toy-collection');
  const addToyForm = document.querySelector('.add-toy-form');
  let addToy = false;

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  addToyForm.addEventListener('submit', addToyToDatabase)

  getToys();

  function getToys(){
    return fetch(toysUrl)
      .then(resp => {return resp.json()})
      .then(json => {
        json.forEach(toy => displayToy(toy))  
      });
  };

  function displayToy(toy){
    const toyItem = document.createElement('div');
    const toyName = document.createElement('h2');
    const toyImg = document.createElement('img');
    const toyLikes = document.createElement('p');
    const likeButton = document.createElement('button');

    toyItem.className = 'card';
    toyImg.className = 'toy-avatar';
    likeButton.className = 'like-btn';

    toyCollection.appendChild(toyItem);
    toyItem.appendChild(toyName);
    toyItem.appendChild(toyImg);
    toyItem.appendChild(toyLikes);
    toyItem.appendChild(likeButton);

    toyLikes.id = `toy-${toy.id}`;
    toyName.innerText = toy.name;
    toyImg.src = toy.image;
    toyLikes.innerText = toy.likes + " likes";
    likeButton.innerText = "Like ♡";
    likeButton.dataset.id = toy.id;
    likeButton.dataset.likes = toy.likes;

    likeButton.addEventListener('click', increaseLikes);
  };


  function increaseLikes(e){
    e.preventDefault();
    patchToy(e.target.dataset.id, e.target.dataset.likes)
      .then(json => {
        const likes = document.getElementById(`toy-${json.id}`)
        likes.innerText = `${json.likes} likes`;
        const likesBtn = document.querySelector(`.like-btn[data-id=\"${e.target.dataset.id}\"]`)
        likesBtn.dataset.likes = json.likes
      });
  };


  function addToyToDatabase(e){
    e.preventDefault();
    const newName = e.target[0].value;
    const newImgUrl = e.target[1].value;
    postToy(newName, newImgUrl)
      .then(json => displayToy(json))
    e.target[0].value = "";
    e.target[1].value = "";
  };

  function postToy(name, imgUrl){
    return fetch(toysUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: imgUrl,
        likes: 0
      })
    })
      .then(resp => {return resp.json();});
  };

  function patchToy(id, likes){
    console.log(likes)
    const newLikes = parseInt(likes) + 1;
    // console.log(newLikes)
    return fetch(`${toysUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newLikes
      })
    })
    .then(resp => resp.json())
  };

})
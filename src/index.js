window.addEventListener('DOMContentLoaded', (event) => {

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyUrl = 'http://localhost:3000/toys'
  const toyCollection = document.getElementById('toy-collection')
  let addToy = false
  const newToy = document.querySelector('.add-toy-form')

  newToy.addEventListener('submit', addToyToDatabase)

  function getToys() {
    fetch(toyUrl)
    .then(resp => resp.json())
    .then(json => createToy(json))
  }

  function createToy(toys) {
    while (toyCollection.hasChildNodes()) {
      toyCollection.removeChild(toyCollection.firstChild);
    }
    toys.forEach(toy => {
      const card = document.createElement('div');
      const name = document.createElement('h2')
      const image = document.createElement('img')
      const likes = document.createElement('p')
      const button = document.createElement('button')
      
      card.className = "card"
      name.innerText = toy.name
      image.src = toy.image
      image.className = 'toy-avatar'
      likes.innerText = `${toy.likes} likes`
      button.className = "like-btn"
      button.dataset.id = toy.id
      button.dataset.likes = toy.likes
      button.innerText = "Like ♡"

      toyCollection.appendChild(card)
      card.appendChild(name)
      card.appendChild(image)
      card.appendChild(likes)
      card.appendChild(button)
      button.addEventListener('click', likeToy )
  
    })
  }

  function addToyToDatabase(e) {
    e.preventDefault();
    postToDatabase(e.target[0].value, e.target[1].value)
  }

  function postToDatabase(name, imageUrl) {
    return fetch( toyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify( {
          name: name,
          image: imageUrl,
          likes: 0
        } )
      } ).then(getToys)
}

    function likeToy(e) {
      const likes = parseInt(e.target.dataset.likes) + 1
      const id = e.target.dataset.id
      fetch( `http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify( {
          likes: likes
        })
      }).then(getToys)
    }

    function increaseLikeByOne(id) {
      console.log(e.previousElementSibling.innerText)
    
    }

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// // OR HERE!

getToys()

})
document.addEventListener("DOMContentLoaded", () => {

  const newToyButton = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const newToyForm = document.querySelector('.add-toy-form')
  const toyCollection = document.querySelector('#toy-collection')
  let addToy = false

  const getToys = () => {
    return fetch('http://localhost:3000/toys').then( response => response.json() )      
  }

  const postToy = () => {
    return fetch('http://localhost:3000/toys', {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      "body": JSON.stringify({
        "name": event.target.name.value,
        "image": event.target.image.value,
        "likes": 0
        })
    }).then( response => response.json() )
      .then( toyData => renderToy(toyData) )
  }

  const displayToys = () => {
    getToys().then( arrayOfToyData => {
        for (const toyData of arrayOfToyData) {
          renderToy(toyData);
        }
      })
  }

  const renderToy = (toyData) => {
    let toyContainer = createToyContainer()
    createHeader(toyData, toyContainer)
    createImage(toyData, toyContainer)
    createLikes(toyData, toyContainer)
    createLikeButton(toyData, toyContainer)
  }

    const createToyContainer = () => {
      let toyContainer = document.createElement("div")
      toyContainer.setAttribute("class", "card")
      toyCollection.appendChild(toyContainer)
      return toyContainer
    }

    const createHeader = (toyData, toyContainer) => {
      let header = document.createElement("h2")
      header.innerText = toyData.name
      toyContainer.appendChild(header)
    }

    const createImage = (toyData, toyContainer) => {
      let image = document.createElement("img")
      image.setAttribute("src", `${toyData.image}`)
      image.setAttribute("class", "toy-avatar")
      toyContainer.appendChild(image)
    }

    const createLikes = (toyData, toyContainer) => {
      let likes = document.createElement("p")
      likes.innerText = `${toyData.likes} likes`
      toyContainer.appendChild(likes)
    }

    const createLikeButton = (toyData, toyContainer) => {
      let likeButton = document.createElement("button")
      likeButton.setAttribute("class", "like-btn")
      likeButton.setAttribute("id", `${toyData.id}`)
      likeButton.textContent = "Like"
      likeButton.addEventListener("click", increaseLikes)
      toyContainer.appendChild(likeButton)
    }


  const increaseLikes = (event) => {
    event.preventDefault();
    let likesDisplay = event.target.previousSibling;
    let likes = parseInt(likesDisplay.textContent.split(" ")[0]) + 1;

    patchLikes(parseInt(event.target.id), likes, likesDisplay);
  }

  const patchLikes = (toyID, likes, likesDisplay) => {
    fetch(`http://localhost:3000/toys/${toyID}`, {
      "method": "PATCH",
      "header": {
      "Content-Type": "application/json",
        "Accept": "application/json"
      },
      "body": {
        "likes": likes
      }
    }).then( response => response.json() )
      .then( likesDisplay.textContent = `${likes} likes`)
  }

  newToyForm.addEventListener('submit', postToy)
  
  newToyButton.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  displayToys()

})
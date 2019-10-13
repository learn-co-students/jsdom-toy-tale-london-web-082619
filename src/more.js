// // // OR HERE!
  // const likeButton = document.querySelectorAll(".like-btn");
//   // likeButton[0].addEventListener("click", console.log("Hi"));

//   // for(let i = 0; i<likeButton.length; i++){
//   //   likeButton[i].addEventListener('click', console.log('hi'))
//   // }


//   // likeButton.forEach(like => {
//   //   like.addEventListener('click', function(e){
//   //     console.log(e.target)})
//   //   }) //this works -- needs e.target-- brings back node element we click on 
//     // e.type === type of event we're clicking on (eg click , eg what key the user pressed)

    // likeButton.forEach(like => {
    //   like.addEventListener('click', clickLike());
    // })

    // function clickLike(e){
    //   e.preventDefault();
    //   console.log(hi)
    // }
    //   e.preventDefault();
    //   let like = this; 
    //   let findSpan = like.previousElementSibling.querySelector('span');
    //   //finds the <span id = no'of likes'>5</span>
    //   let numLikes = findSpan.textContent; //gets '5'
    //   let changeToInteger = Number.parseInt(numLikes);
    //   let plusOne = changeToInteger++;
    //   numLikes = plusOne; //sets numLikes to new variable
    //   let toyID = like.parentNode.dataset.id //gets id num

    //   fetch("http://localhost:3000/toys/${toyID}"), {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Accept": "application/json"
    //     },
    //     body: JSON.stringify({
    //       likes: numLikes
    //     })
    //   }
    //   .then(resp => resp.json())
    // }
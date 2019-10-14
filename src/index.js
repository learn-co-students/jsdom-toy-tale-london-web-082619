const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE


//1 Requestを出してレスを得る
API.getToys().then(toys => renderToys(toys));
  

//2 control for iteration
const renderToys = function(toys){
  for (const toy of toys) {
    renderToy(toy);
  } 
};

//3 render each item
const renderToy = function(toy){
    const  toyList = document.querySelector("#toy-collection") //格納先
    // debugger;
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const button = document.createElement("button");
    div.className = "card";
    div.id = toy.id //!!!あとでLikeのコントロールを行う際にユニークなidを振っていないとコントロールできない４５行目!!!
    h2.innerText = toy.name;
    img.src = toy.image //ソースの時のフォーマット注意！
    img.className = "toy-avatar" //これを入れていないとイメージが枠内に紐づかず、フォーマっとがぐちゃぐちゃになる！
    p.textContent = `${toy.likes} Likes`;
    button.className = "like-btn";
    button.innerText = "Like"
    button.addEventListener("click", function(event){
      likeToy(toy, p);
    }); // click to ４ once triggered.このボタンエレメントでなくエレメント
    //親であるDiv Elementがターゲットであることに注意
    div.append(h2,img,p,button); //divのなかに一旦子をひと塊りにして格納
    toyList.appendChild(div);//格納先に塊として格納
    return div;//!!!return！！！
};// 

//4
const likeToy = function(toy, p){
  toy.likes++;
  p.innerText = `${toy.likes} likes`;
  API.patchToy(toy);
};

const addNewToy = function(newToy){
  API.postToy(newToy).then(toy => renderToy(toy));
};

toyForm.addEventListener("submit", function(event){
  event.preventDefault();
  addNewToy({
    name: event.target.elements.name.value,
    image: event.target.elements.image.value
  });
  event.target.reset() 
});


//defaultで設定されていたやつ
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
});



// window.addEventListener("DOMContentLoaded", (event) => {
//   fetchGetToys();// to triger "get" json. go to 1
// })
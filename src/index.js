const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE


//1 to get data and convert it into json format
function fetchGetToys(){
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(jsonToys => displyJsonToys(jsonToys))
  
};

//2 control for iteration
function displyJsonToys(jsonToys){
  for (const toy of jsonToys) {
    renderToy(toy);
  } 
};

//3 render each item
function renderToy(toy){
    const  toyList = document.querySelector("#toy-collection") //格納先
    // debugger;
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const button = document.createElement("button");
    div.className = "card";
    div.id = toy.id //!!!あとでLikeのコントロールを行う際にユニークなidを振っていないとコントロールできない４５行目!!!
    h2.textContent = toy.name;
    img.src = toy.image //ソースの時のフォーマット注意！
    img.className = "toy-avatar" //これを入れていないとイメージが枠内に紐づかず、フォーマっとがぐちゃぐちゃになる！
    p.textContent = `${toy.likes} Likes`;
    button.className = "like-btn";
    button.innerText = "Like"
    button.onclick = (event) => {addLike(event.target.parentElement)}; // onlcikのSyntax. to ４ once triggered.このボタンエレメントでなくエレメント
    //親であるDiv Elementがターゲットであることに注意
    div.append(h2,img,p,button); //divのなかに一旦子をひと塊りにして格納
    toyList.appendChild(div);//格納先に塊として格納
    return div;//!!!排出！！！
};// goes bact to 2 until 2 iteration finishes

//4
function addLike(div){
  const id = div.id
  const p = div.querySelector("p")
  const likes = parseInt(p.textContent.split(' ')[0]) + 1//文字列をArrayに入れて”数字”部分を切り取り文字列を整数に変換しインクリメントができるようにする

  //to save this change in the database

  return fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": 'application/json',
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: likes})
  }).then(p.textContent = `${likes} Likes`) //pageのコンテンツを書き換え
};

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

toyForm.addEventListener('submit', (event) => {
  // debugger;
  event.preventDefault();
  addNewToy({
    name: event.currentTarget.elements.name.value,
    image: event.currentTarget.elements.image.value
  });
  event.target.//??

  // const toy = {
  //   name: e.target[0].value,
  //   image: e.target[1].value,
  //   likes: 0
  // }
  fetchPostToy(toy) // データベースに書き込み
  .then(resp => resp.json())//その後画面に出力するためデータをデータベースより受け取り開始
  .then(jsonToy => renderToy(jsonToy))//
})

function fetchPostToy(toy) {
  return fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      "Content-Type": "application/jso",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  })
}

// OR HERE!

window.addEventListener("DOMContentLoaded", (event) => {
  fetchGetToys();// to triger "get" json. go to 1
})
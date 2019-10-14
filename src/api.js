const API_ENDPOINT = "http://localhost:3000";//Newの時に必要
const TOYS_URL = `${API_ENDPOINT}/toys`; //Patchの時に必要

const getToys = function(){
    return fetch(TOYS_URL).then(resp => resp.json());
};

const postToy = function(newToy){ //newToyのパラメーター
    return fetch(TOYS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({...newToy, likes: 0})
    }).then(resp => resp.json());  //postしたらポストしたオブジェクトが”確認”としてrespとして帰ってくるのでこれを取っておく
};

const patchToy = function(toy){ //すでに存在するToy
    return fetch(`${TOYS_URL}/${toy.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(toy)
    });
};

const API = {getToys, postToy, patchToy};


// const arr1 = [0, 1, 2];
// const arr2 = [...arr1, 3];

// const obj1 = {
//   name: "buzz",
//   image: "buzz.png"
// };
// const ob2 = {
//   ...obj1,
//   likes: 0
// };

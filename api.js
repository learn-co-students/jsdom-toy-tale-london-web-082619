const END_POINT = "http://localhost:3000";
const TOYS_URL = `${END_POINT}/toys`
// const TOY_URL = `${TOYS_URL}/${toy.id}`

const getToys = function(){
    return fetch(TOYS_URL)
    .then(resp => resp.json());//ここまで
};

const postToy = function(newToy){
    return fetch(TOYS_URL,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newToy)
    }).then(resp => resp.json()) //Postした後にでーたべベースでIDが振られるのでおそらくPostの時はレスポンスが必要
};

const patchToy = function(toy) {
    return fetch(`${TOYS_URL}/${toy.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(toy)
    })//
};

const API ={getToys, postToy, patchToy}
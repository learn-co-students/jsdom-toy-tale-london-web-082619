CONFIG = {
    TOYS_URL: "http://localhost:3000"
  }
  
  function fetchConfig(bodyData,httpMethod){
      return {
          method: httpMethod,
          headers: {
              "Content-Type": "application/json",
              "Access": "application/json"
          },
          body: JSON.stringify(bodyData)
      };
  }



  function getToys(){
      return fetch(`${CONFIG.TOYS_URL}/toys`).then(resp=> resp.json());
  }

  function createToy(){
// debugger
      const nameInput = document.querySelector('#input_name');
      const imgInput = document.querySelector('#input_img');

      const name = nameInput.value;
      const image = imgInput.value;
      const likes = 0;

      const toyInput= {name, image, likes}

      const configObject = fetchConfig(toyInput, "POST")
    return fetch(`${CONFIG.TOYS_URL}/toys`, configObject)
    .then(resp => resp.json());    
  }

  function updateToy(id, likes){
    configObject= {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Access": "application/json"
        },
        body: JSON.stringify(likes)
    };
    return fetch(`${CONFIG.TOYS_URL}/toys/${id}`, configObject)
    .then(resp => resp.json()); 
  }   

  
  const api = {getToys, createToy, updateToy};


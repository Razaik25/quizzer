
var api = {
  getCategory(userinput){
    // userinput = userinput.toLowerCase().trim();
    // var url = `http://www.omdbapi.com/?t=${userinput}`;
    var url = `http://localhost:3000/api/${userinput}`;
    return fetch(url).then((res) => res.json());
  }



};

module.exports = api;

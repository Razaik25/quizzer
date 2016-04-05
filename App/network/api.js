
var api = {
  getCategory(category){
    var url = `http://localhost:3000/api/${category}`;
    return fetch(url).then((res) => res.json());
  }
  
};

module.exports = api;

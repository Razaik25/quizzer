
var api = {
  getCategory(category){
    var url = `http://localhost:3000/api/${category}`;
    return fetch(url).then((res) => res.json());
  },

  addUser(email, username){
    email = email.toLowerCase().trim();
    username = username.toLowerCase().trim();
    var url = `http://localhost:3000/users/${email}`;
    return fetch(url, {
      method: 'post',
      body: (username)
    }).then((res) => res.json());
  },

  getUser(email){
    email = email.toLowerCase().trim();
    var url = `http://localhost:3000/users/${email}`;
    return fetch(url).then((res) => res.json())
  },
  
  // have to update this
  updateUser(email,category){
    email = email.toLowerCase().trim();
    category = category.toLowerCase().trim();
    var url = `http://localhost:3000/users/${email}`;
    return fetch(url, {
      method: 'put',
      body: (username)
    }).then((res) => res.json());
  }

};

module.exports = api;

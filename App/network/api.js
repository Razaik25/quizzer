
var api = {
  getCategory(category){
    // commenting out the localhost connection and aadding heroku deployment
    // var url = `http://localhost:3000/api/${category}`;

    var url = `https://quizzer-api.herokuapp.com/api/${category}`;
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
  updateUser(email,category,score){
    email = email.toLowerCase().trim();
    category = category.toLowerCase().trim();
    var url = `http://localhost:3000/users/update/${email}`;
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({
        email: email,
        category: category,
        score: score
      })
    }).then((res) => res.json());
  }

};

module.exports = api;

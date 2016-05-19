
var api = {
  getCategory(category){
    // commenting out the localhost connection and adding heroku server
    // var url = `http://localhost:3000/api/${category}`;

    var url = `https://quizzer-api.herokuapp.com/api/${category}`;
    return fetch(url).then((res) => res.json());
  },

  addUser(email, username){
    email = email.toLowerCase().trim();
    username = username.toLowerCase().trim();
    // commenting out the localhost connection and adding heroku server
    // var url = `http://localhost:3000/users/${email}`;
    var url = `https://quizzer-api.herokuapp.com/users/${email}`;
    return fetch(url, {
      method: 'post',
      body: (username)
    }).then((res) => res.json());
  },

  getUser(email){
    email = email.toLowerCase().trim();
    // commenting out the localhost connection and adding heroku server
    // var url = `http://localhost:3000/users/${email}`;
    var url = `https://quizzer-api.herokuapp.com/users/${email}`;
    return fetch(url).then((res) => res.json())
  },

  // have to update this
  updateUser(email,category,score){
    email = email.toLowerCase().trim();
    category = category.toLowerCase().trim();
    console.log(email,category,score);
    // commenting out the localhost connection and adding heroku server
    // var url = `http://localhost:3000/users/update/${email}`;
    var url = `https://quizzer-api.herokuapp.com/users/update/${email}`;
    return fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        category: category,
        score: score
      })
    }).then((res) => res.json())
      .catch((ex)  => {
        console.log('parsing failed', ex)
      });
  }

};

module.exports = api;

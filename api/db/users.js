var pgp = require('pg-promise')({});
var dotenv = require('dotenv');
dotenv.load();

if(process.env.ENVIRONMENT === 'production') {
  var cn = process.env.DATABASE_URL
} else {
  var cn =
  {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  };
}

var db = pgp(cn);

function createUser (req, res, next) {
  var email = req.params.email;
  var username = Object.keys(req.body)[0];

  db.any(`INSERT INTO users(username, email)
  VALUES($1, $2) Returning id`, [username, email])
  .then(function(data) {
    res.data = data;
    next();
  })
  .catch(function(error) {
    console.log(error);
  })
}

function getUser (req, res, next) {
  db.any(`SELECT * from users WHERE email =($1)`, [req.params.email])
  .then(function(data) {
    res.data = data;
    next()
  })
  .catch(function(error) {
    console.log(error)
  })
}

function updateUser (req, res, next) {
  db.any(`UPDATE users SET score = ($1) where email = ($2) and category =($3);`, [req.body])
  .then(function(data) {
    res.data = data;
    next()
  })
  .catch(function(error) {
    console.log(error)
  })
}

module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;

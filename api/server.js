var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var db = require('./db/users');
var dotenv = require('dotenv');
dotenv.load();

// invoking express
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(logger('dev'));

// able to access images directory publically
app.use('/images/', express.static(path.join(__dirname, 'images')));

app.get('/api/:category', function(req, res) {

    var file = path.join(__dirname, 'categories/' + req.params.category + '.json');
    // fs allows to read the contents of the file
    fs.readFile(file, 'utf8',function(err, data) {
        if (err) {
            // return and log the error
            return console.error(err);
        }
        // sending the data from the file as json
        res.json(JSON.parse(data));
    });
});

// to get the user info - when a user logs in (profile)
app.get('/users/:email',db.getUser, function(req, res) {
  console.log('in get',res.data);
  res.json(res.data);

});

// to post the user info - when a user sign up (in sign up)
app.post('/users/:email', db.createUser, function(req, res) {
  res.json(res.data);

});

// to update the user info - when a user finishes playing a category (in results page)
app.post('/users/update/:email', db.updateUser, function(req, res) {
  console.log('in put', req.body);
  res.json(res.data);

});


var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Wheels are churning at ', port);
});

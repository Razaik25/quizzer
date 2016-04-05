var fs = require('fs');
var path = require('path');
var express = require('express');
// invoking express
var app = express();

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

// to get the user info - when a user logs in (in log in)
app.get('/users/:data', function(req, res) {

});

// to post the user info - when a user sign up (in sign up)
app.post('/users/:data', function(req,res) {

});

// to update the user info - when a user finihes playing a category (in results page)
app.put('/users/:data', function(req,res) {

});


var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Wheels are churning at ', port);
});

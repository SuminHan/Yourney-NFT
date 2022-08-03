var express = require('express');
var router = express.Router();
const child_process = require('child_process');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Database
mongoose.connect('mongodb://localhost:27017/busan_startup');
const NFTImage = mongoose.model('nftimages', 
  {
    animal: String,
    item1: String,
    item2: String,
    item3: String,
    item4: String,
    imgurl: String,
    owner: String,
  });


/* GET nft-collections page. */
router.get('/nft-collections', function(req, res, next) {
  NFTImage.find({owner: {$not: {$eq: 'none'}}}, function (err, data) {
    if (err) return handleError(err);
    // Prints "Space Ghost is a talk show host".
    console.log(data);
    res.render('mbti-collections', {collections: data});
  });
});


/* POST api-buy-nft page. */
router.post('/api-buy-nft', function(req, res, next) {

  var username = req.body.username;
  var imgurl = req.body.imgurl;
  var current_owner = req.body.current_owner; 

  NFTImage.findOneAndUpdate({imgurl: imgurl}, {owner: username}, function (err, data) {
    if (err) return handleError(err);
    console.log(data);
    res.send('success');
  });

});


/* GET mbti-user-input page. */
router.post('/mbti-user-input', function(req, res, next) {

  var username = req.body.username;
  var val1 = req.body.input1; // I < E
  var val2 = req.body.input2; // S < N
  var val3 = req.body.input3; // F < T
  var val4 = req.body.input4; // J < P

  var item1 = "";
  if (val1 < 30)     { item1 = 'newspaper'; }
  else if (val1 < 50){ item1 = 'game'; }
  else if (val1 < 70){ item1 = 'balloon'; }
  else                { item1 = 'mic'; }

  var item2 = "";
  if (val2 < 30)     { item2 = 'toilet_paper'; }
  else if (val2 < 50){ item2 = 'cap'; }
  else if (val2 < 70){ item2 = 'crown'; }
  else                { item2 = 'helmet'; }

  var item3 = "";
  if (val3 < 30)     { item3 = 'red'; }
  else if (val3 < 50){ item3 = 'yellow'; }
  else if (val3 < 70){ item3 = 'green'; }
  else                { item3 = 'blue'; }


  var item4 = "";
  if (val4 < 30)     { item4 = 'office'; }
  else if (val4 < 50){ item4 = 'home'; }
  else if (val4 < 70){ item4 = 'park'; }
  else                { item4 = 'beach'; }

  
  var animal = "";
  if (val2 < 50 && val4 < 50){
    animal = "meerkat";
  }
  if (val2 >= 50 && val3 >= 50){
    animal = "fox";
  }
  if (val2 >= 50 && val3 < 50){
    animal = "dog";
  }
  if (val2 < 50 && val4 >= 50){
    animal = "penguin";
  }

  var imgurl = `${animal}-${item1}-${item2}-${item3}-${item4}.png`

  var json_data = {
    username: username,
    animal: animal,
    item1: item1,
    item2: item2,
    item3: item3,
    item4: item4,
    imgurl: imgurl
  };

  //new code
  NFTImage.findOne({imgurl: imgurl}, function (err, data) {
    if (err) return handleError(err);
    // Prints "Space Ghost is a talk show host".
    console.log(data);

    var imgsrc = `/nftassets/renamed/${imgurl}`
    res.render('mbti-buy.pug', {imgsrc:imgsrc, imgurl:imgurl, username:username, current_owner: data.owner});
    
  });


});


router.post('/proceed-mbti', function(req, res, next) {
  var username = req.body.username;
  
  if (username == undefined | username == ''){
    res.redirect('/proceed');
  }
  else { 
    res.cookie('username', username);
    console.log(username);
    res.render('mbti-input-form', {username: username});
  }
});


/* GET proceed page. */
router.get('/proceed', function(req, res, next) {
  res.render('proceed');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



module.exports = router;

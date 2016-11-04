var express = require('express');
var dataApi = require('./data-api');
var MongoClient = require('mongodb').MongoClient;
var mongodbURI = 'mongodb://jusbE:cgidemo@ds143777.mlab.com:43777/cgi-demo';
var mongodb;
var app = express();

// Get 100 most viral images from imgur-api and store images to db
var getAndSaveImageMetadata = function(){
	dataApi.createHttpRequest(function(response) {
		var str = '';

		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function() {
			var jsonObject = JSON.parse(str);
			console.log(jsonObject.data.length);
			var count = 0;
			var matches = 0;
			while(matches<100){
				if(!jsonObject.data[count].is_album){
					matches++
					mongodb.collection('images').save(jsonObject.data[count], (err, result) => {
						if (err) return console.log(err)
						console.log('saved to database')
					})	
				}
			count++;
			}
		});
	});
}

var clearDb = function(){
	mongodb.collection('images').remove();
}

app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	foundItems = [];
	console.log(req.query);
	if(req.query){
		//{"title":req.query.keyword}
		mongodb.collection('images').find().toArray(function(err, collection) {
			json = JSON.stringify(collection);
			collection = JSON.parse(json);
			foundItems = collection;
			res.render('index.ejs', {foundItems});
	});
	
	}else{
		res.render('index.ejs', {foundItems});
	}
});


// Connect to mongodb and start server
MongoClient.connect(mongodbURI, (err, database) => {
	if (err) return console.log(err);
	mongodb = database;
	clearDb();
	getAndSaveImageMetadata();
	app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
	});
});
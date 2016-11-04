var express = require('express');
var imgurApi = require('./api/imgur-api');
var MongoClient = require('mongodb').MongoClient;
var dbApi = require('./api/db-api');
var db;
var mongodbURI = 'mongodb://jusbE:cgidemo@ds143777.mlab.com:43777/cgi-demo';
var app = express();

// Get 100 most viral images from imgur-api and store images to db
var getAndSaveImageMetadata = function(){
	imgurApi.createHttpRequest(function(response) {
		var str = '';

		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function() {
			var jsonObject = JSON.parse(str);
			var index = 0;
			var matches = 0;
			while(matches<100){
				if(!jsonObject.data[index].is_album){
					matches++
					dbApi.saveObject(db, jsonObject.data[index]);	
				}
				index++;
			}
		});
	});
}

app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	foundItems = [];
	console.log(req.query);
	if(req.query){
		var keyword = req.query.keyword;
		var query = { title: new RegExp(keyword) };
		dbApi.findFromDb(db, query, function(err, collection) {
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
	db = database;
	dbApi.clearDb(db);
	getAndSaveImageMetadata();
	app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
	});
});
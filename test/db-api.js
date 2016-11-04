var expect = require("chai").expect;
var dbApi = require("../api/db-api")

var MongoClient = require('mongodb').MongoClient;
var mongodbURI = 'mongodb://jusbE:cgidemo@ds143777.mlab.com:43777/cgi-demo';
	
before(function (done){
	MongoClient.connect(mongodbURI, (err, database) => {
		if (err) return console.log(err);
		db = database;
		dbApi.clearDb(db);
		done();
	});
});

	describe("Mongodb initialization", function(){
		
		it("Is initialized", function(){
			expect(db).to.not.be.an('undefined');
		});
		describe("Test database api", function(){
			it("Save, find, clear", function(){
				var object = {str: "data"};
				dbApi.saveObject(db, object);
				dbApi.findFromDb(db,{}, function(err, result){
					expect(result.length).to.equal(1);
					expect(result.str).to.equal("data");
				});
				dbApi.clearDb(db);
				db.collection('images').find().toArray(function(err, result){
					expect(result.length).to.equal(0);
				});
			});
		});
		
		
	});
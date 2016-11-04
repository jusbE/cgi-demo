var exports = module.exports = {};

exports.saveObject = function(database, object){
	database.collection('images').save(object, (err, result) => {
		if (err) return console.log(err)
		console.log('saved to database')
	});	
}

exports.findFromDb = function(database, query, callback){
	database.collection('images').find(query).toArray(callback);
}

exports.clearDb = function(database){
	database.collection('images').remove();
}

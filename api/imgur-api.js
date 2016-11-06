function ImgurApi() {
	
	this.https = require('https');
	this.clientId = 'cb23d91154881a3';
	this.clientSecret = 'abacd883ab9b83044800254a08df94a204966cf1';
	
	this.options = {
	  host: 'api.imgur.com',
	  path: '/3/gallery/hot/viral/all/1.json?',
	  method: 'GET',
	  headers: {'Authorization': 'Client-ID ' + this.clientId}
	};

	this.createHttpRequest = function(callback){
		this.https.request(this.options, callback).end();
	}

}
module.exports = new ImgurApi();
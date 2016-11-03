function DataApi() {
	
	this.https = require('https');
	this.clientId = 'cb23d91154881a3';
	this.clientSecret = 'abacd883ab9b83044800254a08df94a204966cf1';
	
	//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
	this.options = {
	  host: 'api.imgur.com',
	  path: '/3/gallery/hot/viral/1.json?',
	  method: 'GET',
	  headers: {'Authorization': 'Client-ID ' + this.clientId}
	};

	this.createHttpRequest = function(callback){
		this.https.request(this.options, callback).end();
	}

}
module.exports = new DataApi();
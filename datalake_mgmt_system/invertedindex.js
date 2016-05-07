//var monk = require('monk');
//var db = monk('localhost:27017/test');
//var keyValueCollection = db.get('keyValueCollection');
//var invertedIndexCollection = db.get('invertedIndexCollection');

/*var mongo = require('mongodb'), Db = mongo.Db, Server = require('mongodb').Server;

var db = new Db('test', new Server('localhost', 27017), {safe:false});
*/
exports.async_invertedindex = function(db, keyValueCollectionString, invertedIndexCollectionString){
	var keyValueCollection = db.collection(keyValueCollectionString);
	console.log('keyvalue collection ' + keyValueCollection);

	//db.open(function(err, db) {
		keyValueCollection.mapReduce(function() {
								var valueWords = this.value.split(/\s/), i;
								for (i = 0; i < valueWords.length; i++) emit( valueWords[i], this._id );
							},
							function(key, values) {
								var output = {nodes: values};
								return output;
							}, 
							{
								out: { replace: invertedIndexCollectionString }
							}
							//function(err,results) {throw err;}
							);
		//});

};






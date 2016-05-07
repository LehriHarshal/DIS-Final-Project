/*var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');*/
var cosine = require('cosine');
var stopwords = require('stopwords').english;

exports.async_linker = function(db, keyValueCollectionString, linkCollectionString){
	var keyValueCollection = db.collection(keyValueCollectionString);
	var linkCollection = db.collection(linkCollectionString);
	keyValueCollection.find().each( function(keyValue1) { 
	    keyValueCollection.find().each( function(keyValue2) 
				{ 
					if(
						//Step 0: keyValue1 !== keyValue2
						JSON.stringify(keyValue1) !== JSON.stringify(keyValue2) &&
						(
							//Step 1: Check if value of keyValue1 == key of keyValue2
							keyValue1.value == keyValue2.key ||
							//Step 2: Check if value of keyValue1 == source of keyValue2
							keyValue1.value == keyValue2.source ||
							//Step 3: Check if value of keyValue1 == value of keyValue2
							keyValue1.value == keyValue2.value ||
							//Step 4: Cosine similarity after removing stopwords is high
							(cosine(keyValue1.value.split(/\s/).filter( function( el ) { return stopwords.indexOf( el ) < 0; } ), 
								keyValue2.value.split(/\s/).filter( function( el ) { return stopwords.indexOf( el ) < 0; } )) >= 0.80)
						)
					
					  ) {

						//console.log( keyValue1.key + "_" + keyValue1.value + "_" + keyValue1.source + " x " 
								//+ keyValue1.key + "_" + keyValue2.value + "_" + keyValue2.source);

						linkCollection.insert({node_id_1: keyValue1._id, node_id_2: keyValue2._id}, 
										function (err, doc) { if (err) throw err;});
					
					}
				 } 
			)});

	//Returns a promise that on success determines that all inserts to mongodb have been issued, but may not have been written yet
	//return dbReadPromise;

};





var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');
var cosine = require('cosine');
var stopwords = require('stopwords').english;

var keyValueCollection = db.get('keyValueCollection');
var linkCollection = db.get('linkCollection');

//Example Initialization. Remove Later
keyValueCollection.remove();
linkCollection.remove();
keyValueCollection.insert({key : "key1", value: "abc", source:"myfile.pdf"},null);
keyValueCollection.insert({key : "key2", value: "myfile.txt", source:"myfile.xml"},null);
keyValueCollection.insert({key : "key3", value: "key1", source:"myfile.txt"},null);

var promise = keyValueCollection.find().each( function(keyValue1) { 
            keyValueCollection.find().each( function(keyValue2) 
				{ 
					//console.log( keyValue1.key + "_" + keyValue1.value + "_" + keyValue1.source + " x " + keyValue1.key + "_" + keyValue2.value + "_" + keyValue2.source );
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

						linkCollection.insert({node_id_1: keyValue1._id, node_id_2: keyValue2._id}, function (err, doc) { if (err) throw err;});
						
					}
				 } 
			)});


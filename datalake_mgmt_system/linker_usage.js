var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');
var linker = require('./linker.js');

var keyValueCollection = db.get('keyValueCollection');
var linkCollection = db.get('linkCollection');

//Example DB Initialization START. Remove Later
keyValueCollection.remove();
linkCollection.remove();
keyValueCollection.insert({key : "key1", value: "abc", source:"myfile.pdf"},null);
keyValueCollection.insert({key : "key2", value: "myfile.txt", source:"myfile.xml"},null);
keyValueCollection.insert({key : "key3", value: "key1", source:"myfile.txt"},null);
//Example DB Initialization END.

var linkerPromise = linker.async_linker('keyValueCollection', 'linkCollection');

linkerPromise.success(function(){console.log("Async function call for inserting links in Mongodb have been issued, but may not have been written yet")});








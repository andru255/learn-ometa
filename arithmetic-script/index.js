var fs    = require("fs");

var ohm = require("ohm-js");
var grammarString = fs.readFileSync('arithmetic.ohm');
var grammarObj = ohm.grammar(grammarString);

var testFile = fs.readFileSync('test.txt');
var meta = grammarObj.match(testFile.toString());

if(meta.succeeded()){
  console.log("cool!");
} else {
  console.log(meta.message);
}

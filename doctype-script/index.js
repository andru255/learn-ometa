var fs    = require("fs");

var ohm = require("ohm-js");
var grammarString = fs.readFileSync('jade.ohm');
var grammarObj = ohm.grammar(grammarString);

var testFile = fs.readFileSync('test.txt').toString();
var meta = grammarObj.match(testFile.toString());

if(meta.succeeded()){
  console.log("cool!");
} else {
  console.log(meta.message);
}

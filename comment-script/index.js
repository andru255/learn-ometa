var fs    = require("fs");

var ohm = require("ohm-js");
var grammarString = fs.readFileSync('index.ohm');
var grammarObj = ohm.grammar(grammarString);

var testFile = fs.readFileSync('test-script.txt').toString();
var meta = grammarObj.match(testFile.toString());
var semantics = grammarObj.semantics();

semantics.addOperation('interpret', {
    "Comments": function(e){
        console.log("e", e.interpret());
        return e.interpret();
    },
    "singleLineComment": function(x, _, y){
        //console.log("singleLineComment_singleLine:args", arguments);
        return this.interval.contents;
    },
    "multiLineComment": function(x, _, y){
        //console.log("multiLineComment_multiLine:args", arguments);
        return this.interval.contents;
    }
});

if(meta.succeeded()){
  console.log("cool! it's time to know, ¿Whats up here?");
  semantics(meta).interpret();
} else {
  console.log(meta.message);
}

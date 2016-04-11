var fs    = require("fs");

var ohm = require("ohm-js");
var grammarString = fs.readFileSync('index.ohm');
var grammarObj = ohm.grammar(grammarString);

var testFile = fs.readFileSync('test-script.txt').toString();
var meta = grammarObj.match(testFile.toString());
var semantics = grammarObj.semantics();

semantics.addOperation('value', {
    "tags": function(line){
        return line.value();
    },
    "row": function(initialSpace, tagName, posibleText, eol){
        var indent = initialSpace.value()[0].length;
        return [ indent, tagName.value(), posibleText.value()];
    },
    "pairWithTag": function(space, text){
        return [space.value(), text.value()];
    },
    "closingTags": function(line){
        console.log("closingTags", line.value());
        return [ line.value()];
    },
    //"startWithWSLine": function(ws, tagName, text){
    //    return [ ws.value(), tagName.value(), text.value()];
    //},
    "space": function(space){
        return "SPC";
    }
});

if(meta.succeeded()){
  console.log("cool! it's time to know, ¿Whats up here?");
  console.log("valueee!!", JSON.stringify(semantics(meta).value(), null, 2));
} else {
  console.log(meta.message);
}

var fs    = require("fs");

var ohm = require("ohm-js");
var grammarString = fs.readFileSync('index.ohm');
var grammarObj = ohm.grammar(grammarString);

var testFile = fs.readFileSync('test-script.txt').toString();
var meta = grammarObj.match(testFile.toString());
var semantics = grammarObj.semantics();

semantics.addOperation('value', {
    "tags": function(line, space, next, eol){
        console.log("next!", next.value());
        return [ line.value()].concat(  next.value() );
    },
    "row": function(initialSpace, tagName){
        var indent = initialSpace.value()[0].length;
        return [ indent, tagName.value()];
    },
    "pairWithTag": function(space, text){
        console.log("pairWithTag:space Found", space.value());
        console.log("pairWithTag:text Found", text.value());
        return [space.value(), text.value()];
    },
    "textInline": function(text, follow, eol){
        var inline = [ text.value() ].concat(follow.value());
        return [inline];
    },
    "closingTags": function(line){
        console.log("closingTags:Tag Found", line.value());
        return [ line.value()];
    },
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

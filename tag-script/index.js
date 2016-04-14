var fs    = require("fs");

var ohm = require("ohm-js");
var grammarString = fs.readFileSync('index.ohm');
var grammarObj = ohm.grammar(grammarString);

var testFile = fs.readFileSync('test-script.txt').toString();
var meta = grammarObj.match(testFile.toString());
var semantics = grammarObj.semantics();

semantics.addOperation('value', {
    "tags": function(line, space, next, eol){
        var tree = [ line.value()].concat(  next.value() );
        return tree;
    },
    "row": function(initialSpace, tagName,  contentInTag){
        var indent = initialSpace.value()[0].length;
        var tagValueName = tagName.value().join("");
        return {
            indent: indent,
            tagName: tagValueName, 
            contentInline: contentInTag.value() 
        };
    },
    "pairWithTag": function(space, text){
        var spaces = space.value().length;
        var content = text.value().join("");
        return {
            spaces: spaces,
            content: content
        };
    },
    "textInline": function(text){
        return text.value();
    },
    "closingTags": function(line){
        return line.value();
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

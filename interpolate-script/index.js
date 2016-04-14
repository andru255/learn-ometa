var fs    = require("fs");

var ohm = require("ohm-js");
var commentScript = fs.readFileSync('../comment-script/index.ohm');
var grammars = {};
var grammarString = fs.readFileSync('index.ohm');
grammars.CommentScript = ohm.grammar(commentScript);
grammars.interpolations = ohm.grammar(grammarString, grammars);

var testFile = fs.readFileSync('test-script.txt').toString();
var meta = grammars.interpolations.match(testFile.toString());
var semantics = grammars.interpolations.semantics();

semantics.addOperation('value', {
    "interpolations": function(line, space, next, eol){
        var tree = [ line.value()].concat(  next.value() );
        return tree;
    },
    "singleLineComment": function(single, espace, multi){
        return [single.value(), multi.value()];
    },
    "row": function(initialSpace, startSymbolInterpolation,  contentInInterpolation){
        var indent = initialSpace.value()[0].length;
        var tagValueName = startSymbolInterpolation.value();
        return {
            indent: indent,
            tagName: tagValueName, 
            contentInline: contentInInterpolation.value() 
        };
    },
    "pairWithInterpolation": function(space, text){
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
    "startSymbolInterpolation": function(line){
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

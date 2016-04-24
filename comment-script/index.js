var fs    = require("fs");
var ohm = require("ohm-js");
var grammars = {};
var commentScript = fs.readFileSync('index.ohm');
var interface = fs.readFileSync('interface.ohm');

grammars.commentScript = ohm.grammar(commentScript);
grammars.interface = ohm.grammar(commentScript, grammars);

var testFile = fs.readFileSync('test-script.txt').toString();
var meta = grammars.interface.match(testFile.toString());
var semantics = grammars.interface.semantics();

semantics.addOperation('value', {
    "comments": function(line, space, next, eol){
        var tree = [ line.value()].concat(  next.value() );
        return tree;
    },
    "comment": function(initialSpace, text){
        var indent = initialSpace.value()[0].length;
        return {
            indent : indent,
            content: text.value()
        };
    },
    "singleLineComment": function(startComment, content){
        var contentInComment = content.value().join("");
        return {
            type        : "singleComment",
            startComment: startComment.value(),
            content     : contentInComment
        };
    },
    "multiLineComment": function(startComment, content, endComment){
        var contentInComment = content.value().join("");
        return{
            type        : "MultilineComment",
            startComment: startComment.value(),
            content     : contentInComment
        };
    }
});

if(meta.succeeded()){
  console.log("cool! it's time to know, ¿Whats up here?");
  console.log(semantics(meta).value());
} else {
  console.log(meta.message);
}

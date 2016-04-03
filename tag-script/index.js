var fs    = require("fs");

var ohm = require("ohm-js");
var grammarString = fs.readFileSync('index.ohm');
var grammarObj = ohm.grammar(grammarString);

var testFile = fs.readFileSync('test-script.txt').toString();
var meta = grammarObj.match(testFile.toString());
var semantics = grammarObj.semantics();

semantics.addOperation('interpret', {
    "Tags": function(e){
        console.log("e", e.interpret());
        return e.interpret();
    },
    "space": function(e){
        return "SPC";
    }
});
//semantics.addOperation('interpret', {
//    "Tags": function(e){
//        console.log("e", e.interpret());
//        return e.interpret();
//    },
//    "space": function(e){
//        console.log("space!!", e.interpret());
//        return "SPACE";
//    },
//    "plainText": function(x, y){
//        return this.interval.contents;
//    },
//    "closingTags": function(e){
//        return "<closingTag><closingTag/>";
//    },
//    "inlineTags": function(e){
//        return "<inlineTags/>";
//    }
//    "xml": function(e){
//        return "<?xml version=\"1.0\" encoding=\"utf-8\" ?>";
//    },
//    "transitional": function(e){
//        return "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"";
//    }
//});

if(meta.succeeded()){
  console.log("cool! it's time to know, ¿Whats up here?");
  semantics(meta).interpret();
} else {
  console.log(meta.message);
}

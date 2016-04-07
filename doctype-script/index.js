var fs    = require("fs");

var ohm = require("ohm-js");
var grammarString = fs.readFileSync('index.ohm');
var grammarObj = ohm.grammar(grammarString);

var testFile = fs.readFileSync('test-script.txt').toString();
var meta = grammarObj.match(testFile.toString());
var semantics = grammarObj.semantics();

semantics.addOperation('value', {
    "DoctypeHeader": function(e){
        console.log("e", e.value());
        return e.value();
    },
    "documentFormat": function(prefix, documentName){
        return documentName.value();
    },
    "default": function(e){
        return "<DOCTYPE html>";
    },
    "html5": function(e){
        return "<DOCTYPE html>";
    },
    "xml": function(e){
        return "<?xml version=\"1.0\" encoding=\"utf-8\" ?>";
    },
    "transitional": function(e){
        return "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"";
    }
});

if(meta.succeeded()){
  console.log("cool! it's time to know, ¿Whats up here?");
  semantics(meta).value();
} else {
  console.log(meta.message);
}

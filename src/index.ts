// Imports go at the top of the file, you are importing code form other modules.
import * as fs from 'fs'; // Import File system so we can read and write files
let ebnfParser = require('ebnf-parser');

// Load our grammar file from the disk into the variable "file"
let file = fs.readFileSync('./res/simplifiedJavascript.bnf');
let file_data = file.toString();
if(!file_data.endsWith("\n")){
  file_data = file_data + "\n";
}


// parse a bnf or ebnf string grammar
ebnfParser.parse("%start ... %");
// transform an ebnf JSON grammar
ebnfParser.transform({"ebnf": "data"});
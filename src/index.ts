// Imports go at the top of the file, you are importing code form other modules.
import * as fs from 'fs'; // Import File system so we can read and write files
import { Grammars } from  'ebnf' // Import EBNF so that we can make our grammar. 

// Load our grammar file from the disk into the variable "file"
let file = fs.readFileSync('./res/grammar.ebnf');

// Pass that file as a string to the EBNF parser creator.
let parser = new Grammars.BNF.Parser(file.toString());

// Use our parser to parse a string.
console.log(parser.getAST( '(2 + (2 * -123)) * 5332'));

var test : String = ""
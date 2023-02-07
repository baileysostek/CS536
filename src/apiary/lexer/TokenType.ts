// Define our Token type and an enum representing different tokens.
export enum TokenType{
  KEYWORD = "KEYWORD",
  WHITESPACE = "WHITESPACE",
  UNDEFINED = "UNDEFINED",

  // 
  FUNCTION_NAME = "FUNCTION_NAME",
  FUNCTION_START = "FUNCTION_START",
  FUNCTION_END = "FUNCTION_END",

  //
  DELIMITER = "DELIMITER",

  // Variables
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN"
}
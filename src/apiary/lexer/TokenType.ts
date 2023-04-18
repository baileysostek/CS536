// Define our Token type and an enum representing different tokens.
export enum TokenType{
  KEYWORD = 0,
  WHITESPACE,
  UNDEFINED,

  // 
  FUNCTION_NAME,
  FUNCTION_START,
  FUNCTION_END,

  //
  DELIMITER,

  // Variables
  NUMBER,
  STRING,
  BOOLEAN,

  // Used for bodies of functions and other things that will be evaluated in the future
  FUTURE
}
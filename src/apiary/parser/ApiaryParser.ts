import { nextTick } from "process";
import { Token } from "../lexer/Token";
import { TokenType } from "../lexer/TokenType";

// Here are our variables which have been defined
const variables : Map<String, any> = new Map<String, any>();
// Here we will create a Map mapping a function name to a callback
const functions : Map<String, (...params:any) => void> = new Map<String,(...params:any) => void>(); 

/**
 * The goal of the Parser is to take in our array of tokens which were produced via lexical analysis of an input string and generate a tree structure representing the ways that the different tokens interact with each other. Each node of the tree is its own local-scope and leaf's of each node represent any tokens in a child scope.
 * @param tokens 
 */
export function parse(incoming_tokens : Array<Token>) : void {
  // this is our object stack, we want to push every incoming_token onto the stack in reverse order.
  // This is so that the top of the stack is the first item in the incoming_tokens array.
  let object_stack: Array<Token> = [];

  // Push everything onto the object_stack in reverse order.
  for(let token_count = 0; token_count < incoming_tokens.length; token_count++){
    object_stack.push(incoming_tokens[incoming_tokens.length - 1 - token_count]);
  }

  // Now we can start parsing
  while(object_stack.length > 0){
    // Pop the top element off of the stack. This decrements the stack size by 1. 
    let token = object_stack.pop();
    switch (+token.type) {
      case TokenType.FUNCTION_NAME :{
        // Since this is a function, we want to pop off the correct number of elements
        let tokens = [];
        let next_token = null;
        while(object_stack.length > 0){
          next_token = object_stack.pop();
          console.log("Test");
          tokens.push(next_token);
          if(next_token.type === TokenType.FUNCTION_END){
            break;
          }
        }
        // If we have a function with this function name, call that functions callback function.
        if(functions.has(token.value)){
          console.log(token.value, tokens);
          functions.get(token.value)(tokens[1]);
        }
      }
    }
  }
}

export function registerFunction(function_name : string, callback_function : (...params:any) => void){
  functions.set(function_name, callback_function);
}
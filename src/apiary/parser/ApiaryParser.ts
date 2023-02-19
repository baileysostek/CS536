import { nextTick } from "process";
import { Token } from "../lexer/Token";
import { TokenType } from "../lexer/TokenType";

// Here are our variables which have been defined
const variables : Map<String, any> = new Map<String, any>();
// Here we will create a Map mapping a function name to a callback
const functions : Map<String, (...params:any) => void> = new Map<String,(...params:any) => void>(); 

// Define any parser specific functions
registerFunction("var", (name, value = undefined) => {
  if(value !== undefined){
    console.log("Set", name, "to", value)
    variables.set(name, value);
  }
  if(variables.has(name)){
    console.log("Get", name, ":", variables.get(name));
    return variables.get(name);
  }
  return null;
})

/**
 * The goal of the Parser is to take in our array of tokens which were produced via lexical analysis of an input string and generate a tree structure representing the ways that the different tokens interact with each other. Each node of the tree is its own local-scope and leaf's of each node represent any tokens in a child scope.
 * @param tokens 
 */
export function parse(incoming_tokens : Array<Token>, flip = true) : void {
  // this is our object stack, we want to push every incoming_token onto the stack in reverse order.
  // This is so that the top of the stack is the first item in the incoming_tokens array.
  let object_stack: Array<Token> = [];

  // Push everything onto the object_stack in reverse order.
  if(flip){
    for(let token_count = 0; token_count < incoming_tokens.length; token_count++){
      object_stack.push(incoming_tokens[incoming_tokens.length - 1 - token_count]);
    }
  }else{
    object_stack.push(...incoming_tokens);
  }

  // console.log("To parse:", JSON.parse(JSON.stringify(object_stack)));

  // Now we can start parsing
  while(object_stack.length > 0){
    // Pop the top element off of the stack. This decrements the stack size by 1. 
    let token = object_stack.pop();
    switch (+token.type) {
      case TokenType.FUNCTION_NAME :{
        let function_name = token.value;
        // console.log("function:", function_name);
        // Since this is a function, we want to pop off the correct number of elements
        let parameters = [];
        let next_token = null;

        // The scope level we are in currently.
        let scope = 0;

        // This is the next token that will be pushed onto the stack
        let param = [];
        // Parsing the tokens in a function header.
        while(object_stack.length > 0){
          next_token = object_stack.pop();

          // console.log("Itteration:", next_token.value, "Scope:", scope);

          // if we encouter a delimeter
          if(scope === 1 && next_token.type === TokenType.DELIMITER){
            // console.log("function param?", param);
            parameters.push(param.length === 1 ? param[0] : param);
            param = [];
            continue;
          }

          if(next_token.type === TokenType.FUNCTION_START){
            scope++;
            if(scope == 1){
              continue;
            }
          }

          if(next_token.type === TokenType.FUNCTION_END){
            scope--;
            if(scope === 0){
              console.log("function param?", param);
              parameters.push(param.length === 1 ? param[0] : param);
              param = [];
              break;
            }
          }
          
          param.push(next_token);
        }

        // how manuy params
        // console.log("Params:", JSON.parse(JSON.stringify(parameters)));

        // If we have a function with this function name, call that functions callback function.
        if(functions.has(function_name)){
          // Now we get the values from the tokens
          let parameter_values = [];
          for(let param of parameters){
            let value;
            if(Array.isArray(param)){
              value = parse(param); // Recursive call
            }else{
              value = param.value;
            }

            // Type conversion
            let numeric_value = parseFloat(value);
            if(!Number.isNaN(numeric_value)){
              value = numeric_value;
            }

            parameter_values.push(value);
          }
          
          // console.log("Calling", token.value, ...parameters)
          let function_value = functions.get(token.value)(...parameter_values);
          if(object_stack.length === 0){
            return function_value;
          }
        }
      }
    }
  }
}

export function registerFunction(function_name : string, callback_function : (...params:any) => void){
  functions.set(function_name, callback_function);
}
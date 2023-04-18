import { lex } from "../lexer/ApiaryLexer";
import { Token } from "../lexer/Token";
import { TokenType } from "../lexer/TokenType";

type Variable = {
  name: String,
  value: any
}

type Function = {
  name: String
  function: (...params:any) => void
}

type Scope = {
  variables: Map<String, Variable>
  parent: Scope
}

function scopeHasVariable(scope : Scope, variable_name : String) : boolean{
  return scope.variables.has(variable_name);
}

// Here are our variables which have been defined
// const variables : Map<String, any> = new Map<String, any>();
// Here we will create a Map mapping a function name to a callback
const functions : Map<String, (...params:any) => void> = new Map<String,(...params:any) => void>(); 


let current_scope : Scope = null;
pushScope();
function pushScope() : Scope{
  let new_scope = {
    variables: new Map<String, Variable>(),
    parent: current_scope
  }
  current_scope = new_scope;
  return new_scope;
}

function popScope(){
  current_scope = current_scope.parent;
}

// Set a scope variable
function setVariable(variable_name : String, value : any){
  let current_scope = getCurrentScope();

  while(current_scope){
    // console.log("set", current_scope);
    if(scopeHasVariable(current_scope, variable_name)){
      // console.log("Set", variable_name, "to", value)
      current_scope.variables.set(variable_name, value);
      return;
    }else{
      current_scope = current_scope.parent;
    }
  }

  getCurrentScope().variables.set(variable_name, value);
}

export function getVariable(variable_name : String) : (any) {
  let current_scope = getCurrentScope();

  while(current_scope){
    // console.log("get", current_scope);
    if(scopeHasVariable(current_scope, variable_name)){
      let value = current_scope.variables.get(variable_name);
      // console.log("Get", name, ":", value);
      return value;
    }else{
      current_scope = current_scope.parent;
    }
  }

  console.log("Error: could not resolve variable:", variable_name);
}

export function hasVariable(variable_name : String) : (boolean) {
  let current_scope = getCurrentScope();

  while(current_scope){
    if(scopeHasVariable(current_scope, variable_name)){
      return true;
    }else{
      current_scope = current_scope.parent;
    }
  }

  console.log("Could not find variable", variable_name, "in any scope.", getCurrentScope())

  return false;
}

// Utility functions
registerFunction("print", (...parameters) => {
  console.log(...parameters);
  if(parameters.length > 1){
    return [...parameters]
  }else{
    return parameters[0];
  }
})

// Define any parser specific functions
registerFunction("var", (name, value = undefined) => {

  if(value !== undefined){
    setVariable(name, value);
  }
  if(hasVariable(name)){
    let value = getVariable(name);
    return value;
  }else{
    console.log();
  }
  return null;
})

registerFunction("func", (name, ...params) => {
  // Strip off the last parameter to use as our function
  let func = params.splice(params.length - 1);
  let function_name = name;

  let function_params = [...params];

  // Register a new function with this name
  registerFunction(function_name, (...params) => {
    let index = 0;
    pushScope();
    for(let function_param_name of function_params){
      setVariable(function_param_name, params[index]);
      index++;
    }
    // console.log("Params", params);
    // When we call that function do some stuff. 
    let function_body = func.toString();
    let result = parse([new Token(TokenType.FUTURE, null, function_body)]);
    popScope();

    return result;
  })

  return null;
})

// Define some variables for datastructures
registerFunction("cond", (predicate, consequent, alternate) => {  
  console.log(predicate);
  return predicate ? parse([new Token(TokenType.FUTURE, null, consequent)]) : parse([new Token(TokenType.FUTURE, null, alternate)]);
})

registerFunction("eval", (future : string) => {  
  return parse(lex(future));
})

registerFunction("for", (...params) => {  

  let start = 0;
  let end = 0;

  if(params.length == 2){
    end = params[0];
  }
  if(params.length == 3){
    start = params[0];
    end = params[1];
  }

  let body = params[params.length - 1];

  let results = [];

  for(let i = start; (params.length == 3) ? i <= end : i < end; i++){
    pushScope();
    setVariable("index", i);
    results.push(parse([new Token(TokenType.FUTURE, null, body)]));
    popScope();
  }

  // console.log("returning:", results);
  return results;
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
      case TokenType.FUTURE :{
        let to_eval = token.value.substring(1, token.value.length - 1);
        return parse(lex(to_eval));
      }
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
            if(scope === 1){
              continue;
            }
          }

          if(next_token.type === TokenType.FUNCTION_END){
            scope--;
            if(scope === 0){
              parameters.push(param.length === 1 ? param[0] : param);
              param = [];
              break;
            }
          }

          // console.log("Pushing:", next_token);
          
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

            if(param.type === TokenType.BOOLEAN){
              value = (value === 'true');
            }

            parameter_values.push(value);
          }
          
          // console.log("Calling", token.value, ...parameters);
          let function_value = functions.get(token.value)(...parameter_values);
          // console.log(token.value, function_value, (object_stack.length === 0) ? "return" : JSON.stringify(object_stack));
          if((object_stack.length === 0)){
            return function_value;
          }
        }else{
          console.error("Error cant find function:", function_name, functions)
        }
      }
    }
  }
}

export function registerFunction(function_name : string, callback_function : (...params:any) => void){
  functions.set(function_name, callback_function);
}

function getCurrentScope():Scope{
  return current_scope;
}
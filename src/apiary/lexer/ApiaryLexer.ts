// Import classes used for our Lexer.
import { Position } from "../Position";
import { Token } from "./Token";
import { LexerEdgeWithStateChange } from "./LexerEdgeWithStateChange";
import { LexerStateEnd } from "./LexerStateEnd";
import { LexerEdgeJump } from "./LexerEdgeJump";
import { LexerEdgeJumpWithReturn } from "./LexerEdgeJumpWithReturn";
import { LexerStateStartAndEnd } from "./LexerStateStartAndEnd";
import { LexerStateStart } from "./LexerStateStart";
import { LexerState } from "./LexerState";
import { TokenType } from "./TokenType";

// If this is debug mode
const DEBUG = false;

// Define all states
const FAILURE_STATE = new LexerState("Failure State");
const START_STATE = new LexerState("Start State");

// Here are a list of tokens which are ignored lexically
const IGNORED_TOKEN_TYPES = [TokenType.WHITESPACE];

// States and edges for whitespace detection
const WHITESPACE_REGEX = /^[ |\t]$/;
const W_0 = new LexerStateStartAndEnd("W_0", TokenType.WHITESPACE);// Start State

const NEW_LINE_REGEX = /^[\n]$/;
const NEW_LINE = new LexerStateStartAndEnd("NEW_LINE", TokenType.WHITESPACE);// Start State
NEW_LINE.addEdge(NEW_LINE_REGEX, NEW_LINE);

W_0.addEdge(WHITESPACE_REGEX, W_0);

// States and edges for lexing a number
const NUMERIC_RANGE_REGEX = /^[0-9]$/;
const DECIMAL_POINT_REGEX = /^[\.]$/;
const NEGATIVE_SIGN_REGEX = /^[\-]$/;

const N_0 = new LexerStateStart("N_0", TokenType.NUMBER);// Start State
const N_1 = new LexerState("N_1", TokenType.NUMBER);
const N_2 = new LexerState("N_2", TokenType.NUMBER);
const N_3 = new LexerStateEnd("N_3", TokenType.NUMBER);// Ending State
const N_4 = new LexerStateEnd("N_4", TokenType.NUMBER);// Ending State
const N_5 = new LexerStateEnd("N_5", TokenType.NUMBER);// Ending State

N_0.addEdge(NEGATIVE_SIGN_REGEX, N_1);
N_0.addEdge(DECIMAL_POINT_REGEX, N_2);
N_0.addEdge(NUMERIC_RANGE_REGEX, N_3);
N_1.addEdge(DECIMAL_POINT_REGEX, N_2);
N_1.addEdge(NUMERIC_RANGE_REGEX, N_4);
N_2.addEdge(NUMERIC_RANGE_REGEX, N_5);
N_3.addEdge(NUMERIC_RANGE_REGEX, N_3);
N_3.addEdge(DECIMAL_POINT_REGEX, N_5);
N_4.addEdge(NUMERIC_RANGE_REGEX, N_4);
N_4.addEdge(DECIMAL_POINT_REGEX, N_5);
N_5.addEdge(NUMERIC_RANGE_REGEX, N_5);

// States and Edges for lexing a string.
const STRING_CHARACTER_REGEX = /^["]$/;
const NOT_STRING_CHARACTER_REGEX = /^[^"]$/;

const S_0 = new LexerStateStart("S_0", TokenType.STRING);
const S_1 = new LexerState("S_1", TokenType.STRING);
const S_2 = new LexerStateEnd("S_2", TokenType.STRING);

S_0.addEdge(STRING_CHARACTER_REGEX, S_1);
S_0.jump(W_0);
S_1.addEdge(NOT_STRING_CHARACTER_REGEX, S_1);
S_1.addEdge(STRING_CHARACTER_REGEX, S_2);
S_2.jump(W_0);

// States and Edges for lexing a function.
const ALPHA_CHARACTER_REGEX = /^[a-z|A-Z]$/;
const ALPHANUMERIC_REGEX = /^[a-z|A-Z|0-9]$/;
const OPEN_PAREN_REGEX = /^[\(]$/;
const CLOSE_PAREN_REGEX = /^[\)]$/;
const PARAM_DELIMITER_REGEX = /^[,]$/;

const F_0 = new LexerStateStart("F_0", TokenType.FUNCTION_NAME);// Start State
const F_1 = new LexerState("F_1", TokenType.FUNCTION_NAME );
const F_2 = new LexerState("F_2", TokenType.FUNCTION_NAME );
const F_3 = new LexerState("F_3", TokenType.FUNCTION_START );
const F_4 = new LexerStateEnd("F_4", TokenType.FUNCTION_END );// Ending State
const R_0 = new LexerState("R_0", TokenType.FUNCTION_NAME );// Ending State

F_0.jump(W_0);
F_0.addEdge(ALPHA_CHARACTER_REGEX, F_1);
F_1.addEdge(ALPHANUMERIC_REGEX, F_1);
F_1.jumpWithReturn(W_0, F_2);
F_1.addEdge(OPEN_PAREN_REGEX, F_3);
F_2.addEdge(OPEN_PAREN_REGEX, F_3);
F_3.jump(W_0);
F_3.addEdge(CLOSE_PAREN_REGEX, F_4);
R_0.jump(W_0);
R_0.addEdge(CLOSE_PAREN_REGEX, F_4);
R_0.addEdgeWithStateChange(PARAM_DELIMITER_REGEX, F_3, TokenType.DELIMITER);

// F3 contains jumps to all of our variable definitions
F_3.jumpWithReturn(F_0, R_0); // Functions can have functions as params (Nested Functions)
F_3.jumpWithReturn(N_0, R_0); // Functions can have numbers as params
F_3.jumpWithReturn(S_0, R_0); // Functions can have strings as params

// Link states together
START_STATE.jump(NEW_LINE);
START_STATE.jump(F_0);

// Start and End states
const STARTING_STATE = START_STATE; // This represents the starting state of our directed graph.
let CURRENT_STATE = STARTING_STATE;
let CURRENT_TOKEN_TYPE : TokenType = STARTING_STATE.getTokenType();

let CURRENT_CHARACTER = '';
let accumulator = '';
// Where in the file we are.
let line_number      = 0;
let character_number = 0;

let STATE_RETURN_STACK : Array<LexerState> = [];

let STACK : Array<Token>= [];

/**
 * This function performs lexical analysis of any input string and returns an array of the discovered tokens in the input string.
 * @param input String : This is the input string which will be lexed.
 * @returns Array<Token> : Tokens making up the input string.
 */
export function lex(input : string) : Array<Token>{

  // init
  CURRENT_STATE = STARTING_STATE

  // Here we accumulate a line of text, on state transition this is associated with a token.
  clearAccumulator();

  // Where in the file we are.
  line_number      = 0;
  character_number = 0;

  // Initial state for our stack
  STACK = [];

  // Iterate through our input string.
  for(let character of input){

    // Set the current character;
    CURRENT_CHARACTER = character;

    // Check if this is a new line, if it is reset our character_number and increment line_number
    if(character === '\r'){
      continue;
    }
    if(character === '\n'){
      line_number++;
      character_number = 0;
      if(DEBUG){
        console.log("New Line Character:");
      }
    }

    // Debug print
    if(DEBUG){
      console.log(accumulator, CURRENT_CHARACTER);
    }

    // If we are starting in a failure state it means there was an error lexing the input
    if(CURRENT_STATE === FAILURE_STATE){
      // Always print errors.
      console.log("Lexing Error:", accumulator);
      console.log("Error at:", line_number, ":", character_number);
      return [];
    }
    
    step(CURRENT_CHARACTER);

    // Add character to accumulator
    accumulator += CURRENT_CHARACTER;

    // Increment character number
    character_number++;
  }

  pushTokenOntoStack();
  if(DEBUG){
    console.log(STACK);
  }

  return STACK;
}



function step(character : string){
  step:{
    if(traverseEdgeIfPossible(character)){
      break step;
    }

    // At this point we are not taking an edge

    // Check if the state that we are in is an exit state
    if((CURRENT_STATE instanceof LexerStateEnd) || (CURRENT_STATE instanceof LexerStateStartAndEnd)){
      // If we are in an end state, we need to change the state to whatever is on the return stack
      if(STATE_RETURN_STACK.length > 0){
        let return_state = STATE_RETURN_STACK.pop(); // Pop the return state off the stack
        
        if(DEBUG){
          console.log("Returning to", return_state?.name);
          console.log("accumulator", accumulator);  
        }

        if(return_state){
          // // We are leaving an exit node we are going to push
          // let accrued_tokens = STACK.pop();

          // let peek = STACK[STACK.length - 1];
          // peek[peek.length - 1].addChildren(accrued_tokens);

          // Now we need to see if there is anything on the top of the stack

          changeState(return_state);
          // Something was invalid in a child state, but since we were in a valid end state we popped back up to the return state.
          // Now that we have changed into the return state we need to test if that invalid character is valid in this state.
          // This is a recursive function call so we will traverse back up the stack until we have either determined that no branching paths need this character or we are in fact done with the lexing.
          step(character);
          break step;
        }
      }
    }

    changeState(FAILURE_STATE);
  }
}

function traverseEdgeIfPossible(character : string) : boolean{
  // Iterate through all edges of CURRENT_STATE and find a valid transition state.
  if(DEBUG){
    console.log("Edges:", CURRENT_STATE.edges);
  }
  for(let edge of CURRENT_STATE.edges){
    if(DEBUG){
      console.log("Checking Regex:", edge.regex, character === '\n');
    }
    // Test if this character abides by the gate on this rule.
    if(edge.regex.test(character)){

      // Check if we are taking a Jump Edge
      if(edge instanceof LexerEdgeJump){
        let jump = edge as LexerEdgeJump;

        if(DEBUG){
          console.log("Jumping to", edge.destinationState.name);
          console.log("accumulator", accumulator);
        }

        // Reset the type of token that we are currently building for.
        CURRENT_TOKEN_TYPE = TokenType.UNDEFINED;
        
        // We are entering a new scope so we need to push an empty array onto the stack.
        // STACK.push([]);

        // Push the current state onto the RETURN state stack
        if(edge instanceof LexerEdgeJumpWithReturn){
          let jumpWithReturn = jump as LexerEdgeJumpWithReturn;
          // In this case we have a designated return state that we want to return to when the stack is popped.
          STATE_RETURN_STACK.push(jumpWithReturn.return_state);
        }else{
          // Nothing specified so return to the current state.
          STATE_RETURN_STACK.push(CURRENT_STATE);
        }
      }

      // Sometimes there is type ambeguity when flowing from state A to B where in this condition we must have been in state S without knowing.
      // This block of code allows us to force a state S onto the stack.
      if(edge instanceof LexerEdgeWithStateChange){
        let edgeWithStateChange = edge as LexerEdgeWithStateChange;
        accumulator += character;
        CURRENT_CHARACTER = ''; // At this point we have processed the character taking us out of our current state.
        changeState(edge.destinationState, edgeWithStateChange.getTokenType());
        return true;
      }

      // We have found a valid transition state
      changeState(edge.destinationState);
      
      return true;
    }
  }

  return false;
}

function changeState(new_state : LexerState, force_state_change : TokenType = CURRENT_STATE.getTokenType()){
  if(!(new_state === CURRENT_STATE)){
    // current_state.onStateExit?.(accumulator);
    // new_state.onStateEnter?.(accumulator);
    if(DEBUG){
      console.log("Leaving", CURRENT_STATE.name, "Entering:", new_state.name);
    }

    if(!(CURRENT_TOKEN_TYPE === new_state.getTokenType()) || !(force_state_change === CURRENT_STATE.getTokenType())){
      // We have changed into a state which is producing a token of a type we are not expecting, therefore we will clear the accumulator
      pushTokenOntoStack(force_state_change);
    }

    CURRENT_STATE = new_state;
    CURRENT_TOKEN_TYPE = CURRENT_STATE.getTokenType();
    return;
  }
}

function pushTokenOntoStack(token_type : TokenType = CURRENT_STATE.getTokenType()){
  // Dont push empty tokens onto our stack.
  if(accumulator){
    // If this token is on our list of ignored types, ignore this type.
    if(IGNORED_TOKEN_TYPES.indexOf(token_type) < 0){
      let token = new Token(token_type, getCurrentPositionInInput(), accumulator);

      // Push the new token onto the top of the stack
      STACK.push(token);
      
      if(DEBUG){
        console.log("Adding Token:", token);
      }
    }

    clearAccumulator();
  }else{
    // Tokens should never be empty so if we get here it is because of a bug.
  }
}

function clearAccumulator(){
  accumulator = '';
}

function getCurrentPositionInInput():Position{
  return new Position(line_number, character_number);
}
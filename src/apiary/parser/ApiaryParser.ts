import { Token } from "../lexer/Token";
import { SimulationWorld } from "../simulation/SimulationWorld";
import { World2D } from "../simulation/World2D";




/**
 * The goal of the Parser is to take in our array of tokens which were produced via lexical analysis of an input string and generate a tree structure representing the ways that the different tokens interact with each other. Each node of the tree is its own local-scope and leaf's of each node represent any tokens in a child scope.
 * @param tokens 
 */
export function parse(tokens : Array<Token>) : void {
  let TOKENS = [];


}
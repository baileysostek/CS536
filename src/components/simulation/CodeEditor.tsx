// React imports
import React from 'react';

// MUI Imports
import { Button } from '@mui/material';

import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

// Import our parsing functionality TODO:Move this to its own standalone utility class.
import { lex } from '../../apiary/lexer/ApiaryLexer';
import { parse } from '../../apiary/parser/ApiaryParser';

type CodeEditorProps = {

}

type CodeEditorState = {

}


export const CodeEditor : React.FunctionComponent<CodeEditorState> = (props : CodeEditorProps) => {
	
	const [body, setBody] = React.useState(`
seed("Test")

var("map", map(32, 32))

fill(var("map"), 10)

drunkardsWalkMap(var("map"), 500, 30)
replace(var("map"), 30, 31, 0.2)
replace(var("map"), 31, 32, 0.2)

build(var("map"))
	`);

	function handleEditorChange(value, event) {
    // console.log(value);
		setBody(value);
  }

  return(
		<>
			<Editor
				height="40vh"
				defaultLanguage=""
				defaultValue={body}
				onChange={handleEditorChange}
			/>
			<Button
				variant='outlined'
				onClick={() => {
					parse(lex(body));
					// console.log(lex(body));

					  // Test to see if I can call 
  				// vanilla_store.getState().play();
				}}
			>
				Parse
			</Button>
		</>
	);
}
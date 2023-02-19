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
var("width", 5)
var("height", add(var("width"), var("width")))

var("map", map(var("width"), var("height")))

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
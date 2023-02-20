/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import shouldForwardProp from "@styled-system/should-forward-prop";
import { space, flexbox, typography } from "styled-system";
import { Container } from "semantic-ui-react";
import { Header } from "../Header";
import { fleurimondColors } from "../theme";

// MUI Imports
import Button from "../Button/Button";

import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

// Import our parsing functionality TODO:Move this to its own standalone utility class.
import { lex } from "../../apiary/lexer/ApiaryLexer";
import { parse } from "../../apiary/parser/ApiaryParser";

type CodeEditorProps = {};

type CodeEditorState = {};

const baseBannerStyles = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  boxSizing: "border-box",
  fontSize: "3rem",
  padding: "10px",
  margin: " 0 0 20px 0",
  color: fleurimondColors.black,

  img: {
    width: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "right",
    paddingLeft: "250px",
  },

  "*": {
    fontFamily: "Montserrat, sans-serif",
  },
});

const ProgridMain = (props: CodeEditorProps): JSX.Element => {
  const [body, setBody] = React.useState("helloWorld()");

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
  return (
    <Container {...props}>
      <div className="leftHalf">
        <Editor
          height="40vh"
          defaultLanguage=""
          defaultValue={body}
          onChange={handleEditorChange}
        />

        <Button
          variant="secondary"
          aria-label="Secondary Button"
          onClick={() => {
            parse(lex(body));
            // console.log(lex(body));

            // Test to see if I can call
            // vanilla_store.getState().play();
          }}
        >
          Parse
        </Button>
      </div>
    </Container>
  );
};

const ProgridMainWithStyle = styled(ProgridMain, {
  shouldForwardProp,
})(baseBannerStyles, space, flexbox, typography);

export default ProgridMainWithStyle;

import * as React from "react";
import CodeEditor from "../../components/simulation/CodeEditor";
import ResizableColumnLayout from "../../components/util/ResizableColumnLayout";

type SimulationEditorProps = {};

const SimulationEditor: React.FC<SimulationEditorProps> = (props) => {
  return (
    <ResizableColumnLayout>
      <CodeEditor />
    </ResizableColumnLayout>
  );
};

export default SimulationEditor;

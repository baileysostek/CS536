import * as React from 'react';
import GPUIOWrapper from '../../components/simulation/GPUIOWrapper';
import {CodeEditor} from '../../components/simulation/CodeEditor';
import NodeEditor from '../../components/simulation/NodeEditor';
import ResizableColumnLayout from '../../components/util/ResizableColumnLayout';

type SimulationEditorProps = {

}

const SimulationEditor: React.FC<SimulationEditorProps> = (props) => {
  return <ResizableColumnLayout>
    <CodeEditor/>
    <GPUIOWrapper title='Test A Roo'/>
  </ResizableColumnLayout>
}

export default SimulationEditor;
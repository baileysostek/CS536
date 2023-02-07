import {FC, useEffect, useState, useRef, useLayoutEffect} from 'react';

// The Global Stores we are using:
import { useStore } from '../../store/SimulationStore';
import { SimulationStore } from '../../store/SimulationStoreVanilla';

// Import Other Components we made to assist our rendering.
import SimulationControls from './SimulationControls';

// Material UI imports
import CircularProgress from '@mui/material/CircularProgress';

// GPUIO imports
import * as GPUIO from 'gpu-io'
import { lookup } from 'dns';
import { World2D } from '../../apiary/simulation/World2D';
import { SimulationState } from '../../apiary/simulation/SimulationState';

type GPUIOProps = {
  title:string
}

const GPUIOWrapper: FC<GPUIOProps> = (props) => {

  // Create a Ref for the Canvas
  const canvasRef = useRef(null);
  
  // Get the Simulation State from our GlobalStore (zustand) and put it in a ref.
  const runningRef = useRef<SimulationStore>();
  runningRef.current = useStore(); // Here we create/store a mutable reference to the Zustand store. 

  // Render loop.
  const loop = () => {
    runningRef.current.render();
    if(runningRef.current.frameAdvance){
      runningRef.current.setFrameAdvance(false);
    }
    requestAnimationFrame(loop);
  }

  loop(); // Start animation loop.

  // Once a canvas has been created we can start to link GPU-IO to that canvas
  useLayoutEffect(() => {
    if(canvasRef.current){
      //TODO: Disallow Loading Twice

      let canvas : HTMLCanvasElement = canvasRef.current;
      runningRef.current.setCanvas(canvas);

      // Here we are porting most of the code from the Wrapper.js common file.
      const {
        GLSL1,
        GLSL3,
        WEBGL1,
        WEBGL2,
        isWebGL2Supported,
      } = GPUIO;

      // Determine which GLSL or WebGL versions are supported by this GPU and Browser
      const webGLSettings = {
        webGLVersion: isWebGL2Supported() ? 'WebGL 2' : 'WebGL 1',
        GLSLVersion: isWebGL2Supported() ? 'GLSL 3' : 'GLSL 1',
      };
      const availableWebGLVersions = ['WebGL 1'];
      const availableGLSLVersions = ['GLSL 1'];
      
      if (isWebGL2Supported()) {
        availableWebGLVersions.unshift('WebGL 2');
        availableGLSLVersions.unshift('GLSL 3');
      }
      if (webGLSettings.webGLVersion === 'WebGL 1') webGLSettings.GLSLVersion = 'GLSL 1';

      // Now that we have a canvas and canvas context on the screen we can try to create a GPUComposer target.
      try{
        let composer = new GPUIO.GPUComposer({
          canvas:canvasRef.current,
          contextID: webGLSettings.webGLVersion === 'WebGL 2' ? WEBGL2 : WEBGL1,
          glslVersion: webGLSettings.GLSLVersion === 'GLSL 3' ? GLSL3 : GLSL1,
        });

        runningRef.current.setComposer(composer);
        runningRef.current.setGL(composer.gl);

        const width = 128;
        const height = 128;

        const noise = new Int8Array(width * height);
        noise.forEach((el, i) => noise[i] = Math.random() > 0.5 ? 1 : 0);

        runningRef.current.setWorld(new World2D(composer, width, height, noise));
        console.log("World has been set");

        // Here we can start our rendering function
        loop();

      }catch(error){
        console.log(error);
      }
    }
  }, [canvasRef]);  

  useEffect(() => {

  }, [runningRef.current.world])
  
  return <>
    <SimulationControls
      onPlay={() => {
        
      }}
      onPause={() => {

      }}
    />
    {/* Render our Canvas or the loading spinner */}
    <canvas ref={canvasRef} width={800} height={800}  {...props}/>
    { (!runningRef.current.gl) ? <CircularProgress color="success" /> : <></>}
  </>
  
}

export default GPUIOWrapper;
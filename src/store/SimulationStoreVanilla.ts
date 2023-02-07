import { GPUComposer } from "gpu-io";
import create from "zustand/vanilla";
import { SimulationState } from "../apiary/simulation/SimulationState";
import { SimulationWorld } from "../apiary/simulation/SimulationWorld";

export interface SimulationStore {

  simulationState: SimulationState;

  // These are all controlled by our GPU-IO Wrapper class.
  // TODO: convert these to non-null references. 
  world: SimulationWorld | null;
  gl: WebGLRenderingContext | WebGL2RenderingContext | null,
  composer : GPUComposer | null,
  canvas : HTMLCanvasElement | null,

  setWorld: (world : SimulationWorld) => void,
  setGL: (gl : WebGLRenderingContext | WebGL2RenderingContext) => void,
  setComposer: (composer : GPUComposer) => void,
  setCanvas: (canvas : HTMLCanvasElement) => void,

  // Render a frame of the simulation
  render:() => void,

  frameAdvance: boolean;
  setFrameAdvance: (advance : boolean) => void,

  play:() => void;
  pause:() => void;
  step:() => void;

  setState:(state: SimulationState) => void;
}

export const vanilla_store = create<SimulationStore>((set, get) => ({
  // ---------------- Simulation ----------------
  world: null,
  gl: null,
  composer: null,
  canvas: null,

  setGL: (gl : WebGLRenderingContext | WebGL2RenderingContext) => {
    set((state) => ({
      gl: gl,
    }));
  },

  setComposer: (composer : GPUComposer) => {
    set((state) => ({
      composer: composer,
    }));
  },

  setCanvas: (canvas : HTMLCanvasElement) => {
    set((state) => ({
      canvas: canvas,
    }));
  },

  setWorld: (world : SimulationWorld) => {

    world.initialize(get().composer);

    set((state) => ({
      world: world,
    }));
  },

  render:() => {
    const gl    = get().gl;
    const composer = get().composer;
    const world    = get().world;

    const simulationState    = get().simulationState;
    const advanceFrame = get().frameAdvance;

    // If we are in a valid state where everything is defined we can step this simulation
    if(gl && composer && world){
      if((simulationState === SimulationState.RUNNING) || advanceFrame){
        world.stepSimulation(gl, composer);   
      }
    }
  },
 
  // ---------------- Controls ----------------
  simulationState: SimulationState.PAUSED,
  frameAdvance: false,

  setFrameAdvance: (advance : boolean) => {
    set((state) => ({
      frameAdvance: advance,
    }));
  },

  play: () => {
    set((state) => ({
      simulationState: SimulationState.RUNNING,
    }));
  },

  pause: () => {
    set((state) => ({
      simulationState: SimulationState.PAUSED,
    }));
  },

  step: () => {
    set((state) => ({
      frameAdvance: true,
    }));
  },

  setState: (targetState : SimulationState) => {
    set((state) => ({
      simulationState: targetState,
    }));
  },
}));
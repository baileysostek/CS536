import { GPUComposer, GPULayer, REPEAT, BYTE, GPULayerType, GPULayerWrap } from "gpu-io";

import * as GPUIO from "gpu-io";

import { SimulationWorld } from "./SimulationWorld";

export class World2D extends SimulationWorld{

  private golRules : GPUIO.GPUProgram;
  private golRender : GPUIO.GPUProgram;

  constructor(composer : GPUComposer, width :  number, height : number, noise : Int8Array, wrapX : GPULayerWrap = REPEAT, wrapY : GPULayerWrap = REPEAT, type : GPULayerType = BYTE){
    super(new GPULayer(composer, {
      name: 'state',
      type: type,
      numComponents: 1,
      dimensions: [width, height],
      array: noise,
      // filter?: GPULayerFilter;
      wrapX : wrapX,
      wrapY : wrapY,
      numBuffers : 2,
    }));  

    this.width = width;
    this.height = height;
  }

  initialize(composer : GPUComposer) : void {
    const {
      GPUComposer,
      GPUProgram,
      GPULayer,
      BYTE,
      INT,
      UINT,
      FLOAT,
      REPEAT,
      renderAmplitudeProgram,
      copyProgram,
      PRECISION_LOW_P,
      UINT_3D_UNIFORM,
    } = GPUIO;

    const PARAMS = {
      survivalRules: Number.parseInt('00000110', 2),
      s1: false, // Split up the rules into a bunch of booleans so we can display with dat.gui
      s2: true,
      s3: true,
      s4: false,
      s5: false,
      s6: false,
      s7: false,
      s8: false,
      birthRules: Number.parseInt('00000100', 2),
      b1: false,
      b2: false,
      b3: true,
      b4: false,
      b5: false,
      b6: false,
      b7: false,
      b8: false,
      seedRatio: 0.12,// Fraction of 'on' px at startup.
      // reset: onResize,
      // savePNG: savePNG,
    }

    this.golRules = new GPUProgram(composer, {
      name: 'golRules',
      fragmentShader: `
        in vec2 v_uv;

        uniform vec2 u_pxSize;
        uniform lowp isampler2D u_state;

        uniform lowp uint u_survivalRules;
        uniform lowp uint u_birthRules;

        out lowp int out_state;

        void main() {
          // u_state has only one component in it, located in the red 'r' channel.
          lowp int state = int(texture(u_state, v_uv).r);
          lowp int n = int(texture(u_state, v_uv + vec2(0, u_pxSize[1])).r);
          lowp int s = int(texture(u_state, v_uv + vec2(0, -u_pxSize[1])).r);
          lowp int e = int(texture(u_state, v_uv + vec2(u_pxSize[0], 0)).r);
          lowp int w = int(texture(u_state, v_uv + vec2(-u_pxSize[0], 0)).r);
          lowp int ne = int(texture(u_state, v_uv + vec2(u_pxSize[0], u_pxSize[1])).r);
          lowp int nw = int(texture(u_state, v_uv + vec2(-u_pxSize[0], u_pxSize[1])).r);
          lowp int se = int(texture(u_state, v_uv + vec2(u_pxSize[0], -u_pxSize[1])).r);
          lowp int sw = int(texture(u_state, v_uv + vec2(-u_pxSize[0], -u_pxSize[1])).r);
          lowp int numLiving = n + s + e + w + ne + nw + se + sw;
          
          lowp uint mask = bitwiseAnd8((u_survivalRules * uint(state) + u_birthRules * uint(1 - state)), uint(bitshiftLeft(1, numLiving - 1)));
          state = min(int(mask), 1);

          out_state = state;
        }`,
      uniforms: [
        {
          name: 'u_state',
          value: 0, // We don't even really need to set this, bc all uniforms default to zero.
          type: VEC3,
        },
        {
          name: 'u_pxSize',
          value: [1 / this.width, 1 / this.height],
          type: FLOAT,
        },
        {
          name: 'u_survivalRules',
          value: PARAMS.survivalRules,
          type: UINT,
        },
        {
          name: 'u_birthRules',
          value: PARAMS.birthRules,
          type: UINT,
        },
      ],
    });

    this.golRender = renderAmplitudeProgram(composer, {
      name: 'render',
      type: this.getLayer().type,
      components: 'x',
      precision: PRECISION_LOW_P,
      colorMin: [0]
    });

  }

  stepSimulation(gl: WebGLRenderingContext | WebGL2RenderingContext, composer: GPUComposer): void {
    composer.step({
      program: this.golRules,
      input: this.getLayer(),
      output: this.getLayer(),
    });
    // If no output, will draw to screen.
    composer.step({
      program: this.golRender,
      input: this.getLayer(),
    });
  }

}
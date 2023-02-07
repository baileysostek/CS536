import { GPUComposer, GPULayer } from "gpu-io";

export abstract class SimulationWorld{
  private readonly layer : GPULayer;
  
  protected width  : number = 0;
  protected height : number = 0;
  protected depth  : number = 0;

  constructor(layer : GPULayer){
    this.layer = layer;
  }

  abstract initialize(compose : GPUComposer) : void;

  getLayer() : GPULayer {
    return this.layer;
  }

  getWidth() : number {
    return this.width;
  }

  getHeight() : number {
    return this.height;
  }

  abstract stepSimulation(gl : WebGLRenderingContext | WebGL2RenderingContext, composer : GPUComposer) : void;
}
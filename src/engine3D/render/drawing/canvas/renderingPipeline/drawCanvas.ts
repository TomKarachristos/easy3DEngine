namespace engine3D {
  export namespace Render {
    export class DrawCanvas {
      // The color values of the pixels are stored in a special part of graphics memory called frame buffer.
      private _frameBuffer: ImageData; // (width*height) * 4 (R,G,B & Alpha values).
      // The_depthbuffer (not grid-aligned) denotes its depth. The _depthbuffer(z-values) are needed to capture the relative depth of various primitives,
      // so that the occluded objects can be discarded (or the alpha channel of transparent objects processed) in the output-merging stage.
      private _depthbuffer: number[];
      private _canvasElement: HTMLCanvasElement
      private _workingContext: CanvasRenderingContext2D

      constructor(canvasElement:HTMLCanvasElement) {
        this._canvasElement = canvasElement;
        this._depthbuffer = new Array(this._canvasElement.width * this._canvasElement.height);
        this._workingContext = canvasElement.getContext("2d");
      }

      public draw(): void {
        this._workingContext.putImageData(this._frameBuffer, 0, 0);
      }

      public putPixel(x: number, y: number, z: number, color: BABYLON.Color4): void {
        // The Uint8ClampedArray contains height × width × 4 bytes of data.
        var index: number = (x + y * this._canvasElement.width);

        if (this._depthbuffer[index] < z) {
          // TODO: transparen
          return; // Discard
        }else{
          this.setDepthBuffer(index,z);
        }
        this.setFrameBuffer(index,color);
      }

      private setDepthBuffer(index:number,z:number):void{
        this._depthbuffer[index] = z;
      }

      private setFrameBuffer(index:number, color: BABYLON.Color4):void{
        // red, green, blue, and alpha, in that order; that is, "RGBA".
        // with the top left pixel's red component being at index 0 within the array
        var indexColor: number = index * 4;
        this._frameBuffer.data[indexColor] = color.r;
        this._frameBuffer.data[indexColor + 1] = color.g;
        this._frameBuffer.data[indexColor + 2] = color.b;
        this._frameBuffer.data[indexColor + 3] = color.a;
      }
      
      public clear(): void {
        this._workingContext.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
        this._frameBuffer = this._workingContext.createImageData(this._canvasElement.width, this._canvasElement.height);

        this._depthbuffer = [];
      }
    }
  }
}
namespace engine3D{
  export namespace Render{
    export abstract class AbstractPlatform{
      private _drawingLoop: engine3D.Render.drawingLoop;
      private _workingCanvas: engine3D.Render.workingCanvas;
      
      constructor(canvasElement:HTMLCanvasElement) {
        this._workingCanvas = new engine3D.Render.workingCanvas(canvasElement);
        this._drawingLoop = new engine3D.Render.drawingLoop(this._workingCanvas);
      }
      
      public start(scene: engine3D.Scene, camera: engine3D.Camera.AbstractCamera): void{
        this._drawingLoop.start(camera,scene);
      }
      
      public pause(): void{
        this._drawingLoop.pause();
      }
      
      public changeScene(scene: engine3D.Scene): void{
        // TODO
        this._drawingLoop.start(null,scene);
      }
      public changeCamera(camera: engine3D.Camera.AbstractCamera): void{
        // TODO
      }
      
      public setWorkingHeight(height:number):void{
        this._workingCanvas.setWorkingHeight(height);
      }
      public setWorkingWidth(width:number):void{
        this._workingCanvas.setWorkingWidth(width);
      }
      
    }
    
  }
}
namespace engine3D{
  export namespace Render{
    export abstract class AbstractPlatform{
      private _drawingLoop: engine3D.Render.drawingLoop;
      private _workingCanvas: engine3D.Render.workingCanvas;
      private _options: Object;

      constructor(canvasElement:HTMLCanvasElement, options?:IRenderOptions) {
        this._workingCanvas = new engine3D.Render.workingCanvas(canvasElement);
        this._drawingLoop = new engine3D.Render.drawingLoop(this._workingCanvas);
        this._resize();
      }
      
      public start(scene: engine3D.Scene, camera: engine3D.Camera.AbstractCamera): void{
        this._drawingLoop.setCamera(camera);
        this._drawingLoop.setScene(scene);
        this._drawingLoop.start();
      }
      
      public pause(): void{
        this._drawingLoop.pause();
      }
      
      public changeScene(scene: engine3D.Scene): void{
        // TODO
        // this._drawingLoop.start(null,scene);
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

      public autoResizeInWindowEvent():void{
        window.onresize = this._resize.bind(this);
      }
      
      private _resize():void{
        this.setWorkingHeight( window.innerHeight );
        this.setWorkingWidth( window.innerWidth );
      }
      
    }

     export interface IRenderOptions {
      autoResizeInWindows?:boolean,
      kati?:boolean
    }
    
  }
}
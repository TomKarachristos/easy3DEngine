namespace engine3D{
  export namespace Render{
    export abstract class AbstractRender{
      protected _workingCanvas: HTMLCanvasElement;
      
      constructor(canvasElement:HTMLCanvasElement) {
        this._workingCanvas = canvasElement;
      }
      
      protected abstract _clear(): void;
      protected abstract _render(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene): void;
      protected abstract _draw(): void;
      
      public renderingPipeline(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene):void{
        this._clear();
        this._render(camera, scene); // Doing the various matrix operations
        this._draw();
      }
      
      public setWorkingWidth(width:number){
        this._workingCanvas.width = width;
      }
      
      public setWorkingHeight(height:number){
        this._workingCanvas.height = height;
      }
      public getWorkingWidth(){
        return this._workingCanvas.width;
      }
      
      public getWorkingHeight(){
        return this._workingCanvas.height;
      }
      
    }
    
  }
}
namespace engine3D{
  export namespace Render{
    export abstract class AbstractRender{
      protected _workingCanvas: HTMLCanvasElement;
      
      constructor(canvasElement:HTMLCanvasElement) {
        this._workingCanvas = canvasElement;
      }
      
      // BUG: SOMETHING WITH WIDTH AND HEIGHT change
      public abstract clear(): void;
      public abstract render(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene): void;
      public abstract draw(): void;
      
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
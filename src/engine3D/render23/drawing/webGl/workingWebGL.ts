namespace engine3D{
  export namespace Render {
    export class workingWebGL{
      private _backbuffer: ImageData; // (width*height) * 4 (R,G,B & Alpha values). 
      private _workingCanvas: HTMLCanvasElement;
      private _workingContext: CanvasRenderingContext2D;
      private _project: engine3D.Render.projectCanvas;
      
      constructor(canvasElement: HTMLCanvasElement) {
        this._workingCanvas = canvasElement;
        this._workingContext = this._workingCanvas.getContext("2d");
        //this._project = new engine3D.Render.projectCanvas(this);
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
      
      public clear(): void {
      }
      
      public drawInCanvas(): void {
      }
      
      public render(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene): void {
      }

      private animation(meshes,index){
      }
      
      public putPixel(x: number, y: number,color: BABYLON.Color4): void {
      }
    }
  }
}
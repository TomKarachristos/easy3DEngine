namespace engine3D{
  export namespace Render {
    export class RenderToCanvas{
      private canvasDraw: engine3D.Render.CanvasDraw; 
      private camera:engine3D.Camera.AbstractCamera;
      private scene:engine3D.Scene;
      private requestID:number;
      private render:engine3D.Render.Render;
      
      constructor(canvasElement: HTMLCanvasElement) {
        this.canvasDraw = new engine3D.Render.CanvasDraw(canvasElement);
        this.render = new engine3D.Render.Render(this.canvasDraw);
      }
      
      public start(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene){
        this.camera = camera;
        this.scene = scene;
        this.requestID = requestAnimationFrame(this.drawingLoop);
      }
      
      public pause(){
        window.cancelAnimationFrame(this.requestID);
      }
      
      public drawingLoop = (timestamp) =>{
        this.canvasDraw.clear();
        this.render.doIt(this.camera,this.scene); // Doing the various matrix operations
        this.canvasDraw.present(); // Flushing the back buffer into the front buffer
        requestAnimationFrame(this.drawingLoop);
      }
      
      public setWorkingHeight(height:number):void{
        this.canvasDraw.setWorkingHeight(height);
      }
      public setWorkingWidth(width:number):void{
        this.canvasDraw.setWorkingWidth(width);
      }
      
    }
  }
}
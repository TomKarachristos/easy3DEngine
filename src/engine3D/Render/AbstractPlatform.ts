namespace engine3D{
  export namespace Render{
    export abstract class AbstractPlatform{
      protected render: engine3D.Render.renderToCanvas;
       
      constructor(canvasElement:HTMLCanvasElement) {
        this.render = new engine3D.Render.renderToCanvas(canvasElement);
      }
      
      public start(scene: engine3D.Scene, camera: engine3D.Camera.AbstractCamera): void{
        this.render.start(camera,scene);
      }
      protected abstract startDrawing(): void;
      public abstract stop(): void;
      public changeScene(scene: engine3D.Scene): void{
      }
      public changeCamera(camera: engine3D.Camera.AbstractCamera): void{
      }
      
      public setWorkingHeight(height:number):void{
        this.render.setWorkingHeight(height);
      }
      public setWorkingWidth(width:number):void{
        this.render.setWorkingWidth(width);
      }
      
    }
  }
}
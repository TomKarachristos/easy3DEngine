namespace engine3D{
  export namespace Render{
    export abstract class AbstractPlatform{
      protected render: engine3D.Render.RenderToCanvas;
      public camera: engine3D.Camera.AbstractCamera;
      public scene: engine3D.Scene;
       
      constructor(canvasElement:HTMLCanvasElement) {
        this.render = new engine3D.Render.RenderToCanvas(canvasElement);
      }
      
      public start(scene: engine3D.Scene, camera: engine3D.Camera.AbstractCamera): void{
        this.render.start(camera,scene);
      }
      
      public stop(): void{
        this.render.pause();
      }
      
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
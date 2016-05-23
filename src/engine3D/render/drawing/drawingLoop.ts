namespace engine3D {
  export namespace Render {
    export class drawingLoop {
      private _workingCanvas: engine3D.Render.workingCanvas;
      private camera: engine3D.Camera.AbstractCamera;
      private scene: engine3D.Scene;
      private requestID: number;

      constructor(workingCanvas: engine3D.Render.workingCanvas) {
        this._workingCanvas = workingCanvas;
      }

      public start(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene) {
        this.camera = camera;
        this.scene = scene;
        this.requestID = requestAnimationFrame(this.drawingLoop);
      }

      public pause() {
        window.cancelAnimationFrame(this.requestID);
      }

      public drawingLoop = (timestamp) => {
        this._workingCanvas.clear();
        this._workingCanvas.render(this.camera, this.scene); // Doing the various matrix operations
        this._workingCanvas.drawInCanvas(); 
        requestAnimationFrame(this.drawingLoop);
      }
      
    }
  }
}
namespace engine3D {
  export namespace Render {
    export class drawingLoop {
      private _workingCanvas: engine3D.Render.workingCanvas;
      private _camera: engine3D.Camera.AbstractCamera;
      private _scene: engine3D.Scene;
      private _requestID: number;
      private _viewMatrix: BABYLON.Matrix;
      private _projectionMatrix: BABYLON.Matrix;

      constructor(workingCanvas: engine3D.Render.workingCanvas) {
        this._workingCanvas = workingCanvas;
      }

      public start(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene) {
        this._camera = camera;
        this._scene = scene;
        this._requestID = requestAnimationFrame(this.drawingLoop);
      }

      public pause() {
        window.cancelAnimationFrame(this._requestID);
      }

      public drawingLoop = (timestamp) => {
        this._workingCanvas.clear();
        this._workingCanvas.render(this._camera, this._scene); // Doing the various matrix operations
        this._workingCanvas.draw(); 
        requestAnimationFrame(this.drawingLoop);
      }
      
    }
  }
}
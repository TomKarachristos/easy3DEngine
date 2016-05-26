namespace engine3D {
  export namespace Render {
    export class drawingLoop {
      private _workingCanvas: engine3D.Render.workingCanvas;
      private _camera: engine3D.Camera.AbstractCamera;
      private _scene: engine3D.Scene;
      private _requestID: number;

      constructor(workingCanvas: engine3D.Render.workingCanvas) {
        this._workingCanvas = workingCanvas;
      }

      public start(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene) {
        this._camera = camera;
        this._scene = scene;
        this._requestID = requestAnimationFrame(this._drawingLoop);
      }

      public pause() {
        window.cancelAnimationFrame(this._requestID);
      }

      private _drawingLoop = (timestamp) => {
        this._workingCanvas.renderingPipeline(this._camera,this._scene);
        requestAnimationFrame(this._drawingLoop);
      }
      
    }
  }
}
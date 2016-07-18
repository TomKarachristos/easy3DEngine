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

      public setCamera(camera: engine3D.Camera.AbstractCamera):void {
        this._camera = camera;
      }

      public setScene(scene: engine3D.Scene):void{
        this._scene = scene;
      }
      public start() {
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
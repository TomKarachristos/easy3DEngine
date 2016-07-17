namespace engine3D{
  export namespace Render {
    export class workingCanvas extends AbstractRender{
      private _renderCanvas: RenderCanvas;
      private _drawCanvas: DrawCanvas;

      constructor(canvasElement: HTMLCanvasElement) {
        super(canvasElement);
        this._drawCanvas = new DrawCanvas(canvasElement);
        this._renderCanvas = new RenderCanvas(canvasElement, this._drawCanvas);
      }
      
      public _clear(): void {
        this._drawCanvas.clear();
      }

      public _draw(): void {
        this._drawCanvas.draw();
      }

      public _render(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene): void {
        this._renderCanvas.render(camera, scene);
      }

    }
  }
}
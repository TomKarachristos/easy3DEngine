namespace engine3D{
  export namespace Render {
    export class workingCanvas extends engine3D.Render.AbstractRender{
      private _workingContext: CanvasRenderingContext2D;
      private _project: engine3D.Render.projectCanvas;
      // The color values of the pixels are stored in a special part of graphics memory called frame buffer. 
      private _frameBuffer: ImageData; // (width*height) * 4 (R,G,B & Alpha values). 
      // The z-value (not grid-aligned) denotes its depth. The z-values are needed to capture the relative depth of various primitives, 
      // so that the occluded objects can be discarded (or the alpha channel of transparent objects processed) in the output-merging stage.
      private _depthbuffer: number[];
      
      constructor(canvasElement: HTMLCanvasElement) {
        super(canvasElement);
        this._workingContext = this._workingCanvas.getContext("2d");
        this._project = new engine3D.Render.projectCanvas(this);
        this._depthbuffer = new Array(this._workingCanvas.width * this._workingCanvas.height);
      }
      
      public clear(): void {
        this._workingContext.clearRect(0, 0, this._workingCanvas.width, this._workingCanvas.height);
        this._frameBuffer = this._workingContext.createImageData(this._workingCanvas.width, this._workingCanvas.height);
        
        // Clearing depth buffer
        for (var i = 0; i < this._depthbuffer.length; i++) {
          // Max possible value 
          this._depthbuffer[i] = 10000000;
        }
      }
      
      public draw(): void {
        this._workingContext.putImageData(this._frameBuffer, 0, 0);
      }
      
      /*
      The process used to produce a 3D scene on the display in Computer Graphics is like taking a photograph with a camera. It involves four transformations:
        1.Arrange the objects (or models, or avatar) in the world (Model Transformation or World transformation).
        2.Position and orientation the camera (View transformation).
        3.Select a camera lens (wide angle, normal or telescopic), adjust the focus length and zoom factor to set the camera's field of view (Projection transformation).
        4.Print the photo on a selected area of the paper (Viewport transformation) - in rasterization stage
      */
      public render(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene): void {
        let meshes = scene.meshes;
        let viewTransform = camera.getViewMatrix();
        let projectionTransform = camera.getProjectionMaxtrix();
                
        for (let index = 0, meshesLength=meshes.length; index < meshesLength; index++) {
          this.animation(meshes,index);
          let transformMatrix = engine3D.Render.getTramformMatrixOfMesh(meshes[index], viewTransform, projectionTransform);
          this._project.facesTo2D(meshes[index], transformMatrix);
        }
      }

      private animation(meshes,index){
        meshes[index].Rotation.x += 0.01;
        meshes[index].Rotation.z += 0.01;
      }
      
      public putPixel(x: number, y: number, z:number, color: BABYLON.Color4): void {
        // The Uint8ClampedArray contains height × width × 4 bytes of data.
        var index: number = (x + y * this._workingCanvas.width) ;
        
         // TODO: That way transparent dont matter
        if (this._depthbuffer[index] < z) {
            return; // Discard
        }
        
        // red, green, blue, and alpha, in that order; that is, "RGBA".
        // with the top left pixel's red component being at index 0 within the array
        var indexColor: number = index * 4;

        this._depthbuffer[index] = z;

        this._frameBuffer.data[indexColor] = color.r;
        this._frameBuffer.data[indexColor + 1] = color.g;
        this._frameBuffer.data[indexColor + 2] = color.b;
        this._frameBuffer.data[indexColor + 3] = color.a;
      }
    }
  }
}
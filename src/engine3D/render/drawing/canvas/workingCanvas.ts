namespace engine3D{
  export namespace Render {
    export class workingCanvas {
      private _backbuffer: ImageData; // (width*height) * 4 (R,G,B & Alpha values). 
      private _workingCanvas: HTMLCanvasElement;
      private _workingContext: CanvasRenderingContext2D;
      private _workingWidth: number;
      private _workingHeight: number;
      private _project: engine3D.Render.projectCanvas;
      
      constructor(canvasElement: HTMLCanvasElement) {
        this._workingCanvas = canvasElement;
        this._workingWidth = canvasElement.width;
        this._workingHeight = canvasElement.height;
        this._workingContext = this._workingCanvas.getContext("2d");
        this._project = new engine3D.Render.projectCanvas(this);
      }
      
      public setWorkingWidth(width:number){
        this._workingWidth = width;
        this._workingCanvas.width = width;
      }
      
      public setWorkingHeight(height:number){
        this._workingHeight = height;
        this._workingCanvas.height = height;
      }
      public getWorkingWidth(){
        return this._workingWidth;
      }
      
      public getWorkingHeight(){
        return this._workingHeight;
      }
      
      public clear(): void {
        this._workingContext.clearRect(0, 0, this._workingWidth, this._workingHeight);
        this._backbuffer = this._workingContext.createImageData(this._workingWidth, this._workingHeight);
      }
      
      public drawInCanvas(): void {
        this._workingContext.putImageData(this._backbuffer, 0, 0);
      }
      
      // NOTE: MUST CLEAR SELF?
      public render(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene): void {
        let meshes = scene.meshes;
        
        let viewMatrix = BABYLON.Matrix.LookAtLH(camera.Position, camera.Target, BABYLON.Vector3.Up());
        let projectionMatrix = camera.getProjectionMaxtrix();
                                            
        for (let index = 0; index < meshes.length; index++) {
          let cMesh = meshes[index];
          this.animation(meshes,index);
          let transformMatrix = engine3D.Render.getTramformMatrixOfMesh(cMesh, viewMatrix, projectionMatrix);
          this._project.facesToScreen(cMesh,transformMatrix);

        }
      }

      // NOTE: TEMP
      private animation(meshes,index){
        meshes[index].Rotation.x += 0.01;
        meshes[index].Rotation.y += 0.01;
      }
      
      public putPixel(x: number, y: number,color: BABYLON.Color4): void {
        var index: number = (x + y * this._workingWidth) * 4;
        this._backbuffer.data[index] = color.r;
        this._backbuffer.data[index + 1] = color.g;
        this._backbuffer.data[index + 2] = color.b;
        this._backbuffer.data[index + 3] = color.a;
      }
    }
  }
}
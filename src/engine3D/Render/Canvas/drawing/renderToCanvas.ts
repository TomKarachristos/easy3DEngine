namespace engine3D{
  export namespace Render {
    export class renderToCanvas{
      private canvasDraw: engine3D.Render.CanvasDraw; 
      private camera: engine3D.Camera.AbstractCamera;
      private scene: engine3D.Scene;
      private requestID:number;
      
      constructor(canvasElement: HTMLCanvasElement) {
        this.canvasDraw = new engine3D.Render.CanvasDraw(canvasElement);
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
        // Doing the various matrix operations
        this.render();
        // Flushing the back buffer into the front buffer
        this.canvasDraw.present();
        // Calling the HTML5 rendering loop recursively
        // TODO NOT recursively
        requestAnimationFrame(this.drawingLoop);
      }
      
      public setWorkingHeight(height:number):void{
        this.canvasDraw.setWorkingHeight(height);
      }
      public setWorkingWidth(width:number):void{
        this.canvasDraw.setWorkingWidth(width);
      }
      
      private render(): void {
        let meshes = this.scene.meshes;
        
        // Builds a left-handed look-at Matrix
        var viewMatrix = BABYLON.Matrix.LookAtLH(this.camera.Position, this.camera.Target, BABYLON.Vector3.Up());
        // Creates a left-handed perspective projection matrix based on the field of view
        var projectionMatrix = BABYLON.Matrix.PerspectiveFovLH(0.78, 
                                              this.canvasDraw.getWorkingWidth() / this.canvasDraw.getWorkingHeight(), 0.01, 1.0);
        for (var index = 0; index < meshes.length; index++) {
          // current mesh to work on
          var cMesh = meshes[index];
          meshes[index].Rotation.x += 0.01;
          meshes[index].Rotation.y += 0.01;
          // Beware to apply rotation before translation
          var worldMatrix = BABYLON.Matrix.RotationYawPitchRoll(
            cMesh.Rotation.y, cMesh.Rotation.x, cMesh.Rotation.z)
            .multiply(BABYLON.Matrix.Translation(
                cMesh.Position.x, cMesh.Position.y, cMesh.Position.z));

          var transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);

          for (var indexVertices = 0; indexVertices < cMesh.Vertices.length; indexVertices++) {
            // First, we project the 3D coordinates into the 2D space
            var projectedPoint = this.canvasDraw.project(cMesh.Vertices[indexVertices], transformMatrix);
            // Then we can draw on screen
            this.canvasDraw.drawPoint(projectedPoint);
          }
          
          
          for (var indexFaces = 0; indexFaces < cMesh.Faces.length; indexFaces++) {
              var currentFace = cMesh.Faces[indexFaces];
              var vertexA = cMesh.Vertices[currentFace.A];
              var vertexB = cMesh.Vertices[currentFace.B];
              var vertexC = cMesh.Vertices[currentFace.C];

              var pixelA = this.canvasDraw.project(vertexA, transformMatrix);
              var pixelB = this.canvasDraw.project(vertexB, transformMatrix);
              var pixelC = this.canvasDraw.project(vertexC, transformMatrix);

              this.canvasDraw.drawBline(pixelA, pixelB);
              this.canvasDraw.drawBline(pixelB, pixelC);
              this.canvasDraw.drawBline(pixelC, pixelA);
          }
        }
      }
    }
  }
}
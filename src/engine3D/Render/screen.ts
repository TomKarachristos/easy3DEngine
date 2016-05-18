namespace engine3D{
  export class Screen{
    private device: engine3D.Device; 
    private mera: engine3D.Camera;
    private scene: engine3D.Scene;
    
    constructor(canvasElement: HTMLCanvasElement) {
      this.mera = new engine3D.Camera();
      this.mera.Position = new BABYLON.Vector3(0, 0, 10);
      this.mera.Target = new BABYLON.Vector3(0, 0, 0);
      this.device = new engine3D.Device(canvasElement);
      
    }
    
    private resize = () =>{
      console.log("cs");
      this.device.setWorkingHeight( window.innerHeight );
      this.device.setWorkingWidth( window.innerWidth );
    }
    
    // The main method of the engine that re-compute each vertex projection
    // during each frame
    private render(camera: engine3D.Camera, meshes: mesh3D.Mesh[]): void {
      // Builds a left-handed look-at Matrix
      var viewMatrix = BABYLON.Matrix.LookAtLH(camera.Position, camera.Target, BABYLON.Vector3.Up());
      // Creates a left-handed perspective projection matrix based on the field of view
      var projectionMatrix = BABYLON.Matrix.PerspectiveFovLH(0.78, 
                                            this.device.getWorkingWidth() / this.device.getWorkingHeight(), 0.01, 1.0);
      for (var index = 0; index < meshes.length; index++) {
        // current mesh to work on
        var cMesh = meshes[index];
        // Beware to apply rotation before translation
        var worldMatrix = BABYLON.Matrix.RotationYawPitchRoll(
          cMesh.Rotation.y, cMesh.Rotation.x, cMesh.Rotation.z)
          .multiply(BABYLON.Matrix.Translation(
              cMesh.Position.x, cMesh.Position.y, cMesh.Position.z));

        var transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);

        for (var indexVertices = 0; indexVertices < cMesh.Vertices.length; indexVertices++) {
          // First, we project the 3D coordinates into the 2D space
          var projectedPoint = this.device.project(cMesh.Vertices[indexVertices], transformMatrix);
          // Then we can draw on screen
          this.device.drawPoint(projectedPoint);
        }
        
        
        for (var indexFaces = 0; indexFaces < cMesh.Faces.length; indexFaces++) {
            var currentFace = cMesh.Faces[indexFaces];
            var vertexA = cMesh.Vertices[currentFace.A];
            var vertexB = cMesh.Vertices[currentFace.B];
            var vertexC = cMesh.Vertices[currentFace.C];

            var pixelA = this.device.project(vertexA, transformMatrix);
            var pixelB = this.device.project(vertexB, transformMatrix);
            var pixelC = this.device.project(vertexC, transformMatrix);

            this.device.drawBline(pixelA, pixelB);
            this.device.drawBline(pixelB, pixelC);
            this.device.drawBline(pixelC, pixelA);
        }
      }
    }
    
    // Rendering loop handler
    public drawingLoop = (timestamp) =>{
      this.device.clear();
      // Doing the various matrix operations
      this.render(this.mera, this.scene.meshes);
      // Flushing the back buffer into the front buffer
      this.device.present();
      // Calling the HTML5 rendering loop recursively
      requestAnimationFrame(this.drawingLoop);
    }
    
    public start(scene: engine3D.Scene){
      this.scene = scene;
      requestAnimationFrame(this.drawingLoop);
      this.resize();
      window.onresize = this.resize;
    }  
  }
}
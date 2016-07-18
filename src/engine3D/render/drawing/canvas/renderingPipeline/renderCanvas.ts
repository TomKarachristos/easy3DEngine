namespace engine3D{
  export namespace Render {
    export class RenderCanvas {
      private _project: projectCanvas;
      private _drawCanvas: DrawCanvas;

      constructor(canvasElement:HTMLCanvasElement, drawCanvas:DrawCanvas) {
        this._drawCanvas = drawCanvas
        this._project = new projectCanvas(canvasElement, drawCanvas);
      }

      public render(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene): void {
        let meshes = scene.meshes;
        let viewTransform = camera.getViewMatrix();
        let projectionTransform = camera.getProjectionMaxtrix();

        for (let index = 0, meshesLength = meshes.length; index < meshesLength; ++index) {
          this.animation(meshes,index); //NOTE test reasons
          let worldMatrixMesh = getWorldMatrixOfMesh(meshes[index]);
          let transformMatrix = getTransformMatrix(worldMatrixMesh, viewTransform, projectionTransform);
          this._project.facesTo2D(meshes[index], transformMatrix);
        }
      }

      private animation(meshes,index){
        meshes[index].Rotation.x += 0.01;
        meshes[index].Rotation.z += 0.01;
      }

    }
  }
}
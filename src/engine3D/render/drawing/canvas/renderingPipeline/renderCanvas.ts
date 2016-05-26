namespace engine3D{
  export namespace Render {
    export class RenderCanvas {
      private _project: projectCanvas;
      private _drawCanvas: DrawCanvas;

      constructor(canvasElement:HTMLCanvasElement,drawCanvas:DrawCanvas) {
        this._drawCanvas = drawCanvas
        this._project = new projectCanvas(canvasElement,drawCanvas);
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
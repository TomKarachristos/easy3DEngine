namespace engine3D{
  export namespace Render {

    // get World coordinate matrix of a Mesh
    export function getWorldMatrixOfMesh(cMesh){
      // rotate mesh inside the world matrix coordinate
      let rotateMesh = 
        BABYLON.Matrix.RotationYawPitchRoll(
          cMesh.Rotation.y, cMesh.Rotation.x, cMesh.Rotation.z)
      // translate mesh after rotate
      let translateMesh = 
        rotateMesh.multiply(
          BABYLON.Matrix.Translation(
            cMesh.Position.x, cMesh.Position.y, cMesh.Position.z));

      return translateMesh;
    }
    
    // Arrange the objects in the world (Model Transformation or World transformation).
    // The View Matrix: This matrix will transform vertices from world-space to view-space.(Camera will be 0,0,0)
    // Projection matrix:  select a camera lens (wide angle, normal or telescopic), 
    // adjust the focus length and zoom factor to set the camera's field of view (Projection transformation).
    export function getTransformMatrix(worldMatrix, viewMatrix, projectionMatrix){
      return worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
    }
    
    export function getTramformMatrixOfMesh(cMesh, viewMatrix, projectionMatrix){
       let worldMatrixMesh = engine3D.Render.getWorldMatrixOfMesh(cMesh);
       let transformMatrix = engine3D.Render.getTransformMatrix(worldMatrixMesh, viewMatrix, projectionMatrix);
       return transformMatrix;
    }
  }
}
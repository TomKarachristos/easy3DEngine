namespace engine3D{
  export namespace Render {
    
    // get World coordinate matrix of a Mesh
    export function getWorldMatrixOfMesh(cMesh){
      // rotate mesh inside the world matrix coordinate
      let rotateMesh = BABYLON.Matrix.RotationYawPitchRoll(cMesh.Rotation.y, cMesh.Rotation.x, cMesh.Rotation.z)
      // translate mesh after rotate
      let rotateAndTranslateMesh = rotateMesh.multiply(BABYLON.Matrix.Translation(cMesh.Position.x, cMesh.Position.y, cMesh.Position.z));
      return rotateAndTranslateMesh
           
    }
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
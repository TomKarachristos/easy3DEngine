namespace engine3D{
  export namespace Render {
    export class Render{
			private canvasDraw: engine3D.Render.CanvasDraw;
			
			constructor(CanvasDraw: engine3D.Render.CanvasDraw) {
        this.canvasDraw = CanvasDraw
      }
			
			public doIt(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene): void {
				let meshes = scene.meshes;
				// Builds a left-handed look-at Matrix
				var viewMatrix = BABYLON.Matrix.LookAtLH(camera.Position, camera.Target, BABYLON.Vector3.Up());
				// Creates a left-handed perspective projection matrix based on the field of view
				var projectionMatrix = BABYLON.Matrix.PerspectiveFovLH(0.78, 
																						this.canvasDraw.getWorkingWidth() / this.canvasDraw.getWorkingHeight(), 0.01, 1.0);
				for (var index = 0; index < meshes.length; index++) {
					// current mesh to work on
					var cMesh = meshes[index];
					this.animation(meshes,index);
					// Beware to apply rotation before translation
					var worldMatrix = this.getWorldMatrix(cMesh);
					var transformMatrix = this.getTransformMatrix(worldMatrix, viewMatrix, projectionMatrix);
					this.projectVerticlesToScreen(cMesh,transformMatrix);
					this.projectFacesToScreen(cMesh,transformMatrix);

				}
			}
			
			private projectVerticlesToScreen(cMesh,transformMatrix){
				for (var indexVertices = 0; indexVertices < cMesh.Vertices.length; indexVertices++) {
					// First, we project the 3D coordinates into the 2D space
					var projectedPoint = this.canvasDraw.project(cMesh.Vertices[indexVertices], transformMatrix);
					// Then we can draw on screen
					this.canvasDraw.drawPoint(projectedPoint);
				}
			}			
			
			private projectFacesToScreen(cMesh,transformMatrix){
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
			
			
		  private getWorldMatrix(cMesh){
				return BABYLON.Matrix.RotationYawPitchRoll(
							cMesh.Rotation.y, cMesh.Rotation.x, cMesh.Rotation.z)
							.multiply(BABYLON.Matrix.Translation(
									cMesh.Position.x, cMesh.Position.y, cMesh.Position.z));
			}
			
			private getTransformMatrix(worldMatrix, viewMatrix, projectionMatrix){
				return worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
			}
			
			private animation(meshes,index){
				meshes[index].Rotation.x += 0.01;
				meshes[index].Rotation.y += 0.01;
			}
			
			
    }
  }
}
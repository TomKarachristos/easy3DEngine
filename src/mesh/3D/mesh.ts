// <reference path="./lib/babylon.math.ts"/>
namespace mesh3D{
  export interface Face {
    A: number;
    B: number;
    C: number;
   }
  export class Mesh {
    Position: BABYLON.Vector3;
    Rotation: BABYLON.Vector3;
    Vertices: BABYLON.Vector3[];
    Faces: Face[];

    constructor(public name: string, verticesCount: number, facesCount: number) {
      this.Vertices = new Array(verticesCount);
      this.Faces = new Array(facesCount);
      this.Rotation = BABYLON.Vector3.Zero();
      this.Position = BABYLON.Vector3.Zero();
    }
  }
}
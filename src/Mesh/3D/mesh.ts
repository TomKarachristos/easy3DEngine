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
    
    public static CreateMeshesFromJSON(jsonObject): Mesh[] {
      let meshes: Mesh[] = [];
      for (let meshIndex = 0; meshIndex < jsonObject.meshes.length; meshIndex++) {
        let mesh = Mesh.createMesh(jsonObject.meshes[meshIndex]);
        mesh.Position = Mesh.getBlenderPosition(jsonObject, meshIndex);
        meshes.push(mesh);
      }
      return meshes;
    }
    
    private static createMesh(meshJson){
      let verticesArray: number[] = meshJson.vertices;
      let indicesArray: number[] = meshJson.indices;
      const verticesStep = Mesh.getverticesStepIndex(meshJson);
      const verticesCount = verticesArray.length / verticesStep;
      const facesCount = indicesArray.length / 3;
      let mesh = new Mesh(meshJson.name, verticesCount, facesCount);
      Mesh.fillingFaces(mesh,indicesArray);
      Mesh.fillingVertices(mesh,verticesArray,verticesStep);
      return mesh;
    }
    
    // Getting the position you've set in Blender
    private static getBlenderPosition(jsonObject, meshIndex){
       let position = jsonObject.meshes[meshIndex].position;
       return new BABYLON.Vector3(position[0], position[1], position[2]);
    }
    
    // Depending of the number of texture's coordinates per vertex
    // we're jumping in the vertices array  by 6, 8 & 10 windows frame
    private static getverticesStepIndex(meshJson){
      switch (meshJson.uvCount) {
        case 0:
          return 6;
        case 1:
          return 8;
        case 2:
          return 10;
        default:
          return 1;
      }
    }
    
    private static fillingFaces(mesh,indicesArray){
      // number of faces is logically the size of the array divided by 3 (A, B, C)
      for (var index = 0,facesCount = indicesArray.length / 3; index < facesCount; index++) {
        var a = indicesArray[index * 3];
        var b = indicesArray[index * 3 + 1];
        var c = indicesArray[index * 3 + 2];
        mesh.Faces[index] = {
          A: a,
          B: b,
          C: c
        };
      }
    }
    
    private static fillingVertices(mesh,verticesArray,verticesStep){
      for (var index = 0, verticesCount = verticesArray.length / verticesStep; index < verticesCount; index++) {
        var x = verticesArray[index * verticesStep];
        var y = verticesArray[index * verticesStep + 1];
        var z = verticesArray[index * verticesStep + 2];
        mesh.Vertices[index] = new BABYLON.Vector3(x, y, z);
      }
    }
  }
  
  // Loading the JSON file in an asynchronous manner and
  // calling back with the function passed providing the array of meshes loaded
  export function LoadJSONFileAsync(fileName: string, callback: (result: Mesh[]) => any): void {
    var jsonObject = {};
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", fileName, true);
    var that = this;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            jsonObject = JSON.parse(xmlhttp.responseText);
            callback(Mesh.CreateMeshesFromJSON(jsonObject));
        }
    };
    xmlhttp.send(null);
  }
  
  
}
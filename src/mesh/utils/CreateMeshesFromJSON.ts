namespace mesh3D{
  export function CreateMeshesFromJSON(jsonObject): Mesh[] {
    let meshes: Mesh[] = [];
    for (let meshIndex = 0; meshIndex < jsonObject.meshes.length; meshIndex++) {
      let mesh = createMesh(jsonObject.meshes[meshIndex]);
      mesh.Position = getBlenderPosition(jsonObject, meshIndex);
      meshes.push(mesh);
    }
    return meshes;
  }
  
  function createMesh(meshJson){
    let verticesArray: number[] = meshJson.vertices;
    let indicesArray: number[] = meshJson.indices;
    const verticesStep = getverticesStepIndex(meshJson);
    const verticesCount = verticesArray.length / verticesStep;
    const facesCount = indicesArray.length / 3;
    let mesh = new Mesh(meshJson.name, verticesCount, facesCount);
    fillingFaces(mesh,indicesArray);
    fillingVertices(mesh,verticesArray,verticesStep);
    return mesh;
  }
  
  function getBlenderPosition(jsonObject, meshIndex){
      let position = jsonObject.meshes[meshIndex].position;
      return new BABYLON.Vector3(position[0], position[1], position[2]);
  }
  
  // Depending of the number of texture's coordinates per vertex
  // we're jumping in the vertices array  by 6, 8 & 10 windows frame
  function getverticesStepIndex(meshJson){
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
  
  function fillingFaces(mesh,indicesArray){
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
  
  function fillingVertices(mesh,verticesArray,verticesStep){
    for (var index = 0, verticesCount = verticesArray.length / verticesStep; index < verticesCount; index++) {
      var x = verticesArray[index * verticesStep];
      var y = verticesArray[index * verticesStep + 1];
      var z = verticesArray[index * verticesStep + 2];
      mesh.Vertices[index] = new BABYLON.Vector3(x, y, z);
    }
  }
}
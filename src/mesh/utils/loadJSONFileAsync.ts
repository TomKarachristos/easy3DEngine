namespace mesh3D{
  export namespace Utils{
    export function LoadJSONFileAsync(fileName: string, callback: (result: Mesh[]) => any): void {
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", fileName, true);
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          let jsonObject = JSON.parse(xmlhttp.responseText);
          callback(mesh3D.CreateMeshesFromJSON(jsonObject));
        }
      };
      xmlhttp.send(null);
    }
  }
}
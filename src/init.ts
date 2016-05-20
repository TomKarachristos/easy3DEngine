var render: engine3D.Render.Canvas; 
var mesh;
document.addEventListener("DOMContentLoaded", init, false);



function init() {
    mesh = new mesh3D.Mesh("Cube", 8, 12);
    mesh.Vertices[0] = new BABYLON.Vector3(-1, 1, 1);
    mesh.Vertices[1] = new BABYLON.Vector3(1, 1, 1);
    mesh.Vertices[2] = new BABYLON.Vector3(-1, -1, 1);
    mesh.Vertices[3] = new BABYLON.Vector3(1, -1, 1);
    mesh.Vertices[4] = new BABYLON.Vector3(-1, 1, -1);
    mesh.Vertices[5] = new BABYLON.Vector3(1, 1, -1);
    mesh.Vertices[6] = new BABYLON.Vector3(1, -1, -1);
    mesh.Vertices[7] = new BABYLON.Vector3(-1, -1, -1);

    mesh.Faces[0] = { A:0, B:1, C:2 };
    mesh.Faces[1] = { A:1, B:2, C:3 };
    mesh.Faces[2] = { A:1, B:3, C:6 };
    mesh.Faces[3] = { A:1, B:5, C:6 };
    mesh.Faces[4] = { A:0, B:1, C:4 };
    mesh.Faces[5] = { A:1, B:4, C:5 };

    mesh.Faces[6] = { A:2, B:3, C:7 };
    mesh.Faces[7] = { A:3, B:6, C:7 };
    mesh.Faces[8] = { A:0, B:2, C:7 };
    mesh.Faces[9] = { A:0, B:4, C:7 };
    mesh.Faces[10] = { A:4, B:5, C:6 };
    mesh.Faces[11] = { A:4, B:6, C:7 };
    render = new engine3D.Render.Canvas(<HTMLCanvasElement> document.getElementById("frontBuffer"));
    mesh3D.LoadJSONFileAsync("https://raw.githubusercontent.com/deltakosh/MVA3DHTML5GameDev/master/Chapter%201/003.%20loading%20meshes%20from%20Blender/monkey.babylon",
     loadJSONCompleted)
}

function loadJSONCompleted(meshesLoaded: mesh3D.Mesh[]) {
  let scene = new engine3D.Scene();
  scene.add(meshesLoaded,mesh);
  let camera =  new engine3D.Camera.Prospective(0,0,0,0);
  render.start(scene,camera);
  this.resize();
  window.onresize = this.resize;
  //scene.showConsoleMesh();
  scene.remove(mesh);
  scene.showConsoleMesh();
}

function resize(){
  render.setWorkingHeight( window.innerHeight );
  render.setWorkingWidth( window.innerWidth );
}
    
    
    
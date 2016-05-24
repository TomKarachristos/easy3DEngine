var render: engine3D.Render.Canvas; 
document.addEventListener("DOMContentLoaded", init, false);

function init() {
    render = new engine3D.Render.Canvas(<HTMLCanvasElement> document.getElementById("frontBuffer"));
    mesh3D.Utils.LoadJSONFileAsync("https://raw.githubusercontent.com/deltakosh/MVA3DHTML5GameDev/master/Chapter%201/003.%20loading%20meshes%20from%20Blender/monkey.babylon",
     loadJSONCompleted)
}

function loadJSONCompleted(meshesLoaded: mesh3D.Mesh[]) {
  let scene = new engine3D.Scene();
  scene.add(meshesLoaded);
  // let camera =  new engine3D.Camera.Prospective(0.78, window.innerWidth/ window.innerHeight, 0.1,0.2);
  let camera =  new engine3D.Camera.Orthographic(15,10, 0.1,0.2);
  render.start(scene,camera);
  this.resize();
  window.onresize = this.resize;
}

function resize(){
  render.setWorkingHeight( window.innerHeight );
  render.setWorkingWidth( window.innerWidth );
}
    
    
    
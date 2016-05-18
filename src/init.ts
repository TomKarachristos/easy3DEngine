/// <reference path="engine3D/Render/render.ts" />
var canvas: HTMLCanvasElement; 
var screen: engine3D.Screen; 
var scene: engine3D.Scene;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    screen = new engine3D.Screen(<HTMLCanvasElement> document.getElementById("frontBuffer"));
    mesh3D.LoadJSONFileAsync("https://raw.githubusercontent.com/deltakosh/MVA3DHTML5GameDev/master/Chapter%201/003.%20loading%20meshes%20from%20Blender/monkey.babylon",
     loadJSONCompleted)
}

function loadJSONCompleted(meshesLoaded: mesh3D.Mesh[]) {
    /*
      The Window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests
      that the browser call a specified function to update an animation before the next repaint.
      The method takes as an argument a callback to be invoked before the repaint.
    */
    scene = new engine3D.Scene(meshesLoaded);
    screen.start(scene);
}


namespace engine3D{
  export namespace Camera {
    export class Orthographic extends engine3D.Camera.AbstractCamera{
      constructor(fov:number,aspect:number,near:number,far:number) {
        super();
        this._Position = BABYLON.Vector3.Zero();
        this._Target = BABYLON.Vector3.Zero();
      }
    }
  }
}

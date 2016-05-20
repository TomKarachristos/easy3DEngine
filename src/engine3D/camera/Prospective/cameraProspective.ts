namespace engine3D{
  export namespace Camera{
    export class Prospective extends engine3D.Camera.AbstractCamera{
      constructor(fov:number,aspect:number,near:number,far:number) {
        super();
        this._Position = new BABYLON.Vector3(0, 0, 10);
        this._Target = new BABYLON.Vector3(0, 0, 0);
      }
    }
  }
}

namespace engine3D{
  export class Camera {
    private Position: BABYLON.Vector3;
    private Target: BABYLON.Vector3;

    constructor() {
      this.Position = BABYLON.Vector3.Zero();
      this.Target = BABYLON.Vector3.Zero();
    }
  }
}

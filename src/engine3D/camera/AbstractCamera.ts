namespace engine3D{
  export namespace Camera{
    export abstract class AbstractCamera{
      protected _Position: BABYLON.Vector3;
      get Position(): BABYLON.Vector3 {
        return this._Position;
      }
      set Position(value: BABYLON.Vector3) {
        this._Position = value;
      }
      protected _Target: BABYLON.Vector3;
      get Target(): BABYLON.Vector3 {
        return this._Target;
      }
      set Target(value: BABYLON.Vector3) {
        this._Target = value;
      }
    }
  }
}
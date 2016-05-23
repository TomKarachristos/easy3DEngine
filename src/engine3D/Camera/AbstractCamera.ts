namespace engine3D{
  export namespace Camera{
    export abstract class AbstractCamera{
      protected _Position: BABYLON.Vector3;
      protected _Target: BABYLON.Vector3;
      
      public abstract getProjectionMaxtrix():BABYLON.Matrix;
      
      get Position(): BABYLON.Vector3 {
        return this._Position;
      }
      set Position(value: BABYLON.Vector3) {
        this._Position = value;
      }

      get Target(): BABYLON.Vector3 {
        return this._Target;
      }
      set Target(value: BABYLON.Vector3) {
        this._Target = value;
      }
    }
  }
}
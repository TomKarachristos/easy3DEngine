namespace engine3D{
  export namespace Camera{
    export abstract class AbstractCamera{
      protected _Position: BABYLON.Vector3;
      protected _Target: BABYLON.Vector3;
      protected _viewMatrix: BABYLON.Matrix;
      protected _ProjectionMaxtrix: BABYLON.Matrix;
      
      protected _calculateViewMatrix(){
        this._viewMatrix = BABYLON.Matrix.LookAtLH(this._Position,
         this._Target, BABYLON.Vector3.Up());
      }
      
      protected abstract _calculateProjectionMaxtrix():void;
      
      public getViewMatrix():BABYLON.Matrix{
        return this._viewMatrix; 
      }
      
      public getProjectionMaxtrix():BABYLON.Matrix{
        return this._ProjectionMaxtrix; 
      }
      
      get Position(): BABYLON.Vector3 {
        return this._Position;
      }
      
      set Position(value: BABYLON.Vector3) {
        this._Position = value;
        this._calculateViewMatrix();
      }

      get Target(): BABYLON.Vector3 {
        return this._Target;
      }
      
      set Target(value: BABYLON.Vector3) {
        this._Target = value;
        this._calculateViewMatrix();
      }
    }
  }
}
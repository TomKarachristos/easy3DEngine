namespace engine3D{
  export namespace Camera{
    export class Prospective extends engine3D.Camera.AbstractCamera{
      private _fov:number;
      private _aspect:number;
      private _near:number;
      private _far:number;
      
      constructor(fov:number,aspect:number,near:number,far:number) {
        super();
        this._Position = new BABYLON.Vector3(0, 0, 10);
        this._Target = new BABYLON.Vector3(0, 0, 0);
        this._fov = fov;
        this._aspect = aspect;
        this._near = near;
        this._far = far;
        this._calculateViewMatrix();
        this._calculateProjectionMaxtrix();
      }
      
      public _calculateProjectionMaxtrix():void{
         this._ProjectionMaxtrix = BABYLON.Matrix.PerspectiveFovLH(this._fov, this._aspect, this._near, this._far);
      }
    
    }
  }
}

namespace engine3D{
  export namespace Camera {
    export class Orthographic extends engine3D.Camera.AbstractCamera{
      private _width:number;
      private _height:number;
      private _znear:number;
      private _zfar:number;
      
      constructor(width:number,height:number,znear:number,zfar:number) {
        super();
        this._Position = new BABYLON.Vector3(0, 0, 10);
        this._Target = BABYLON.Vector3.Zero();
        this._width = width;
        this._height = height;
        this._znear = znear;
        this._zfar = zfar;
      }
      
      
      public getProjectionMaxtrix():BABYLON.Matrix{
        return  BABYLON.Matrix.OrthoLH(this._width, this._height, this._znear, this._zfar);
      }
    }
  }
}

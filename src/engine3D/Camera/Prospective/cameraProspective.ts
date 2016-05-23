namespace engine3D{
  export namespace Camera{
    export class Prospective extends engine3D.Camera.AbstractCamera{
      public fov:number;
      public aspect:number;
      public near:number;
      public far:number;
      constructor(fov:number,aspect:number,near:number,far:number) {
        super();
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
        this._Position = new BABYLON.Vector3(0, 0, 10);
        this._Target = new BABYLON.Vector3(0, 0, 0);
      }
      
      public getProjectionMaxtrix():BABYLON.Matrix{
         return BABYLON.Matrix.PerspectiveFovLH(this.fov,this.aspect,this.near,this.far);
      }
    
    }
  }
}

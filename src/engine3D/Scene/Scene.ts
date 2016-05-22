namespace engine3D{
  export class Scene{
    private _meshes: mesh3D.Mesh[] = [];

    constructor(object?:any){
      this._meshes = [];
      if(object)
        this.add(object);
    }

    public add(object:any,...rest):Scene {
      if(arguments.length > 1){
        Utils._CallCallbackForEachArgument(arguments,this.add) 
      }else if( Utils._isMesh(object) ){
        this.meshes.push(object);
      }else if( Utils._isArray(object) ){
        object.forEach((item)=>{
          if(Utils._isMesh(item)){
            this.meshes.push(item);}
          })
      }else {console.warn("not accepted object: " + object);}
      return this;
    }
    
    public remove(object:any,...rest):Scene{
      if(arguments.length > 1){
        Utils._CallCallbackForEachArgument(arguments,this.remove) 
      }else if( Utils._isMesh(object) ){
        this._deleteMesh(object);
      }else if( Utils._isArray(object) ){
        object.forEach((item)=>{
          if(Utils._isMesh(item)){
            this._deleteMesh(item);}
          })
      }else {console.warn("not accepted object: " + object);}
      return this;
    }
    
   private _deleteMesh(object:any):void{
      let index = this._meshes.indexOf(object)
      if(index>-1){
        this._meshes.splice(index, 1);
      }
    }
    
    get meshes(): mesh3D.Mesh[] {
      return this._meshes;
    }
    set meshes(value: mesh3D.Mesh[]) {
      this._meshes = value;
    }
    
   
  }
}
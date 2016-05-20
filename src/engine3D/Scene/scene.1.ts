/*namespace engine3D{
  export class Scene2{
    private _meshes: mesh3D.Mesh[] = [];
    get meshes(): mesh3D.Mesh[] {
      return this._meshes;
    }
    set meshes(value: mesh3D.Mesh[]) {
      this._meshes = value;
    }
    
    constructor(object?:any){
      this._meshes = [];
      if(object)
        this.add(object);
    }
    private _isCallCallbackForEachArgument(arg:IArguments,callback):boolean{
      if ( arg.length > 1 ) {
        for ( var i = 0; i < arg.length; i++ ) {
          callback.call(this, arg[ i ] );
        }
      }
      return arg.length >1;
    }
    public add(object:any,...rest):Scene {
      this._isCallCallbackForEachArgument(arguments,this.add) 
        || this._isMeshPush(object) || this._isArrayMeshPush(object) 
        || console.warn("not accepted object: " + object);
      return this;
    }
    
    private _isMeshPush(object:any):boolean{
      console.log(object);
      return (this._isMesh(object)) ?
        !!this._meshes.push(object) : false
    }

    private _isArrayMeshPush(object:any):boolean{
      return object instanceof Array ?
        !!!object.forEach(this._isMeshPush,this) : false
    }
    private _isArrayMeshDelete(object:any):boolean{
      return object instanceof Array ?
        !!!object.forEach(this._isMeshDelete,this) : false
    }
        
    public showConsoleMesh(){
      console.log(this._meshes);
    }
    
    private _isMeshDelete(object:any){
      let index = this._meshes.indexOf(object)
      console.log(index,object);
      if(index>-1){
        this._meshes.splice(index, 1);
        return true;
      }
      return false;
    }
    
    public remove(object:any,...rest):Scene{
      this._isCallCallbackForEachArgument(arguments,this.remove) 
        || this._isMeshDelete(object) || this._isArrayMeshDelete(object)
        || console.warn("not accepted object, or object not found: " + object);
      return this;
    }

    private _isMesh(object){
      return object instanceof mesh3D.Mesh
    }
    
    private _isArray(object){
      return object instanceof Array
    }
    

    
   
  }
}*/
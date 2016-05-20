namespace engine3D{
  export class Scene{
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

    public add(object:any,...rest):Scene {
      if(arguments.length > 1){
        this._CallCallbackForEachArgument(arguments,this.add) 
      }else if( this._isMesh(object) ){
        this.meshes.push(object);
      }else if( this._isArray(object) ){
        object.forEach((item)=>{
          if(this._isMesh(item)){
            this.meshes.push(item);}
          })
      }else {console.warn("not accepted object: " + object);}
      return this;
    }
        
    public showConsoleMesh(){
      console.log(this._meshes);
    }
    
    private _deleteMesh(object:any):void{
      let index = this._meshes.indexOf(object)
      if(index>-1){
        this._meshes.splice(index, 1);
      }
    }
    
    public remove(object:any,...rest):Scene{
      if(arguments.length > 1){
        this._CallCallbackForEachArgument(arguments,this.remove) 
      }else if( this._isMesh(object) ){
        this._deleteMesh(object);
      }else if( this._isArray(object) ){
        object.forEach((item)=>{
          if(this._isMesh(item)){
            this._deleteMesh(item);}
          })
      }else {console.warn("not accepted object: " + object);}
      return this;
    }

    private _isMesh(object){
      return object instanceof mesh3D.Mesh
    }
    
    private _isArray(object){
      return object instanceof Array
    }
    
    private _CallCallbackForEachArgument(arg:IArguments,callback):boolean{
      for ( var i = 0; i < arg.length; i++ ) {
        callback.call(this, arg[ i ] );
      }
      return arg.length >1;
    }
    
   
  }
}
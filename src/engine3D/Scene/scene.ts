namespace engine3D{
  export class Scene{
    public meshes: mesh3D.Mesh[] = [];
    
    constructor(meshes: mesh3D.Mesh[]){
      this.meshes = meshes;
    }
    
    public add(object:any) {
      if ( arguments.length > 1 ) {
        for ( var i = 0; i < arguments.length; i ++ ) {
          this.add( arguments[ i ] );
        }
			  return this;
		   }

      if ( object === this ) {
        // TODO add a scene to a scene in a certain place
        console.error( "dont add a scene in a scene", object );
        return this;
      }
    }
    
    public remove(object:any){
      return this
    }
   
  }
}
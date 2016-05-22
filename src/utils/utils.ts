namespace Utils{
	export function _isMesh(object){
		return object instanceof mesh3D.Mesh
	}

	export function _isArray(object){
		return object instanceof Array
	}

	export function _CallCallbackForEachArgument(arg:IArguments,callback):boolean{
		for ( var i = 0; i < arg.length; i++ ) {
			callback.call(this, arg[ i ] );
		}
		return arg.length >1;
	}
}
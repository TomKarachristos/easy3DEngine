namespace engine3D{
  export namespace Render {
    export class CanvasDraw extends engine3D.Render.AbstractDraw{
      private backbuffer: ImageData; // (width*height) * 4 (R,G,B & Alpha values). 
      private workingCanvas: HTMLCanvasElement;
      private workingContext: CanvasRenderingContext2D;
      private workingWidth: number;
      private workingHeight: number;
      // equals to backbuffer.data
      private backbufferdata;
      
      constructor(canvasElement: HTMLCanvasElement) {
        super()
        this.workingCanvas = canvasElement;
        this.workingWidth = canvasElement.width;
        this.workingHeight = canvasElement.height;
        this.workingContext = this.workingCanvas.getContext("2d");
        
      }
      
      public setWorkingWidth(width:number){
        this.workingWidth = width;
        this.workingCanvas.width = width;
      }
      
      public setWorkingHeight(height:number){
        this.workingHeight = height;
        this.workingCanvas.height = height;
      }
      public getWorkingWidth(){
        return this.workingWidth;
      }
      
      public getWorkingHeight(){
        return this.workingHeight;
      }
      
      // This function is called to clear the back buffer with a specific color
      public clear(): void {
        // Clearing with black color by default
        this.workingContext.clearRect(0, 0, this.workingWidth, this.workingHeight);
        // once cleared with black pixels, we're getting back the associated image data to 
        // clear out back buffer
        this.backbuffer = this.workingContext.createImageData(this.workingWidth, this.workingHeight);
      }
      // Once everything is ready, we can flush the back buffer
      // into the front buffer. 
      public present(): void {
        this.workingContext.putImageData(this.backbuffer, 0, 0);
      }
      // Called to put a pixel on screen at a specific X,Y coordinates
      // rgba pass individual for performance reasons. 
      public putPixel(x: number, y: number,r,g,b,a): void {
        this.backbufferdata = this.backbuffer.data;
        // As we have a 1-D Array for our back buffer
        // we need to know the equivalent cell index in 1-D based
        // on the 2D coordinates of the screen
        // x >> 0 just convert the number to integer.
        var index: number = (x + y * this.workingWidth) * 4;
        // RGBA color space is used by the HTML5 canvas
        this.backbufferdata[index] = r * 255;
        this.backbufferdata[index + 1] = g * 255;
        this.backbufferdata[index + 2] = b * 255;
        this.backbufferdata[index + 3] = a * 255;
      }

      // Project takes some 3D coordinates and transform them
      // in 2D coordinates using the transformation matrix
      public project(coord: BABYLON.Vector3, transMat: BABYLON.Matrix): BABYLON.Vector2 {
          // transforming the coordinates
          var point = BABYLON.Vector3.TransformCoordinates(coord, transMat);
          // The transformed coordinates will be based on coordinate system
          // starting on the center of the screen. But drawing on screen normally starts
          // from top left. We then need to transform them again to have x:0, y:0 on top left.
          var x = point.x * this.workingWidth + this.workingWidth / 2.0 >> 0;
          var y = -point.y * this.workingHeight + this.workingHeight / 2.0 >> 0;
          return (new BABYLON.Vector2(x, y));
      }

      // drawPoint calls putPixel but does the clipping operation before
      public drawPoint(point: BABYLON.Vector2): void {
        // Clipping what's visible on screen
        if (point.x >= 0 && point.y >= 0 && point.x < this.workingWidth 
                                        && point.y < this.workingHeight) {
          // Drawing a yellow point
          this.putPixel(point.x, point.y, 255, 255, 0, 255);
        }
      }
      
      // http://www.tutorialspoint.com/computer_graphics/line_generation_algorithm.htm
      public drawBline(point0: BABYLON.Vector2, point1: BABYLON.Vector2): void {
          var dx = Math.abs( point1.x - point0.x);
          var dy = Math.abs( point1.y - point0.y);
          var sx = (point0.x <  point1.x) ? 1 : -1;
          var sy = (point0.y <  point1.y) ? 1 : -1;
          var err = dx - dy;

          while (true) {
              this.drawPoint(new BABYLON.Vector2(point0.x, point0.y));

              if ((point0.x ==  point1.x) && (point0.y ==  point1.y)) break;
              var e2 = 2 * err;
              if (e2 > -dy) { err -= dy; point0.x += sx; }
              if (e2 < dx) { err += dx; point0.y += sy; }
          }
      }
    }
  }
}
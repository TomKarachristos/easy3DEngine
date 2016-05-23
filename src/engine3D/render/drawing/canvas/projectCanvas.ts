namespace engine3D {
  export namespace Render {
    export class projectCanvas {
      private _workingCanvas: engine3D.Render.workingCanvas;

      constructor(workingCanvas: engine3D.Render.workingCanvas) {
        this._workingCanvas = workingCanvas;
      }

      public from3DTo2D(coordinate: BABYLON.Vector3, transformMatrix: BABYLON.Matrix) {
        var point = BABYLON.Vector3.TransformCoordinates(coordinate, transformMatrix);
        // We need to transform them to have x:0, y:0 on top left from center that is now.
        var x = point.x * this._workingCanvas.getWorkingWidth() + this._workingCanvas.getWorkingWidth() / 2.0 >> 0;
        var y = -point.y * this._workingCanvas.getWorkingHeight() + this._workingCanvas.getWorkingHeight() / 2.0 >> 0;
        return (new BABYLON.Vector2(x, y));
      }

      public verticlesToScreen(cMesh, transformMatrix) {
        for (var indexVertices = 0; indexVertices < cMesh.Vertices.length; indexVertices++) {
          var projectedPoint = this.from3DTo2D(cMesh.Vertices[indexVertices], transformMatrix);
          this.drawPoint(projectedPoint,  new BABYLON.Color4(255, 255, 255, 255));
        }
      }

      public facesToScreen(cMesh, transformMatrix) {
        for (var indexFaces = 0; indexFaces < cMesh.Faces.length; indexFaces++) {
          var currentFace = cMesh.Faces[indexFaces];
          var pixelA = this.from3DTo2D(cMesh.Vertices[currentFace.A], transformMatrix);
          var pixelB = this.from3DTo2D(cMesh.Vertices[currentFace.B], transformMatrix);
          var pixelC = this.from3DTo2D(cMesh.Vertices[currentFace.C], transformMatrix);
          this.drawTriangle(pixelA, pixelB, pixelC);
        }
      }
      
      public drawTriangle(pixelA:BABYLON.Vector2, pixelB:BABYLON.Vector2, pixelC:BABYLON.Vector2): void {
        this.drawBline(pixelA, pixelB, new BABYLON.Color4(150, 255, 0, 255));
        this.drawBline(pixelB, pixelC, new BABYLON.Color4(150, 255, 0, 255));
        this.drawBline(pixelC, pixelA, new BABYLON.Color4(150, 255, 0, 255));
      }

      // http://www.tutorialspoint.com/computer_graphics/line_generation_algorithm.htm
      public drawBline(point0: BABYLON.Vector2, point1: BABYLON.Vector2, color: BABYLON.Color4): void {
        var dx = Math.abs(point1.x - point0.x);
        var dy = Math.abs(point1.y - point0.y);
        var sx = (point0.x < point1.x) ? 1 : -1;
        var sy = (point0.y < point1.y) ? 1 : -1;
        var err = dx - dy;

        while (true) {
          this.drawPoint(new BABYLON.Vector2(point0.x, point0.y), color);
          if ((point0.x == point1.x) && (point0.y == point1.y)) break;
          var e2 = 2 * err;
          if (e2 > -dy) { err -= dy; point0.x += sx; }
          if (e2 < dx) { err += dx; point0.y += sy; }
        }
      }

      private drawPoint(point: BABYLON.Vector2,color: BABYLON.Color4): void {
        // Clipping what's visible on screen
        if (this.isInBound(point)) {
          this._workingCanvas.putPixel(point.x, point.y, color);
        }
      }

      public isInBound(point: BABYLON.Vector2): boolean {
        return point.x >= 0 && point.y >= 0 && point.x < this._workingCanvas.getWorkingWidth()
          && point.y < this._workingCanvas.getWorkingHeight()
      }




    }
  }
}
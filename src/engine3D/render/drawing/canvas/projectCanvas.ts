namespace engine3D {
  export namespace Render {
    export class projectCanvas {
      private _workingCanvas: engine3D.Render.workingCanvas;

      constructor(workingCanvas: engine3D.Render.workingCanvas) {
        this._workingCanvas = workingCanvas;
      }
      
      public facesTo2D(mesh, transformMatrix) {
        for (var indexFaces = 0; indexFaces < mesh.Faces.length; indexFaces++) {
          var currentFace = mesh.Faces[indexFaces];

          var pixelA = this.corrdinate3DTo2D(mesh.Vertices[currentFace.A], transformMatrix);
          var pixelB = this.corrdinate3DTo2D(mesh.Vertices[currentFace.B], transformMatrix);
          var pixelC = this.corrdinate3DTo2D(mesh.Vertices[currentFace.C], transformMatrix);

          var color: number = 0.25 + ((indexFaces % mesh.Faces.length) / mesh.Faces.length) * 0.75 *255;
          this.drawTriangle(pixelA, pixelB, pixelC, new BABYLON.Color4(255, color, color, color));
        }
      }
      
      public corrdinate3DTo2D(coordinate: BABYLON.Vector3, transformMatrix: BABYLON.Matrix) {
        var point = BABYLON.Vector3.TransformCoordinates(coordinate, transformMatrix);
        //  We then need transform them to have x:0, y:0 on top left.
        var x = point.x * this._workingCanvas.getWorkingWidth() + this._workingCanvas.getWorkingWidth() / 2.0;
        var y = -point.y * this._workingCanvas.getWorkingHeight() + this._workingCanvas.getWorkingHeight() / 2.0;
        return (new BABYLON.Vector3(x, y, point.z));
      }

      private drawPoint(point: BABYLON.Vector3, color: BABYLON.Color4): void {
        // Clipping what's visible on screen
        if (this.isInBound(point)) {
          this._workingCanvas.putPixel(point.x, point.y, point.z, color);
        }
      }

      public isInBound(point: BABYLON.Vector3): boolean {
        return point.x >= 0 && point.y >= 0 && point.x < this._workingCanvas.getWorkingWidth()
          && point.y < this._workingCanvas.getWorkingHeight()
      }
      
      public drawTriangle(p1: BABYLON.Vector3, p2: BABYLON.Vector3, 
                    p3: BABYLON.Vector3, color: BABYLON.Color4): void {
          // Sorting the points in order to always have this order on screen p1, p2 & p3
          // with p1 always up (thus having the Y the lowest possible to be near the top screen)
          // then p2 between p1 & p3
          if (p1.y > p2.y) {
            [p1, p2] = [p2, p1];
          }

          if (p2.y > p3.y) {
            [p2, p3] = [p3, p2];
          }

          if (p1.y > p2.y) {
            [p1, p2] = [p2, p1];
          }

          let slopeP1P2:number = (p2.y - p1.y > 0) ? (p2.x - p1.x) / (p2.y - p1.y) : 0;
          let slopeP1P3:number = (p3.y - p1.y > 0) ? (p3.x - p1.x) / (p3.y - p1.y) : 0;
          // P3
          if (slopeP1P2 > slopeP1P3) {
            this._sketchRightDirectionTringle(p1, p2, p3, color);
          }else {
            this._sketchLeftDirectionTringle(p1, p2, p3, color);
          }
      }

      private _sketchRightDirectionTringle(p1: BABYLON.Vector3, p2: BABYLON.Vector3,
      p3: BABYLON.Vector3, color: BABYLON.Color4):void {
        for (let y = p1.y >> 0; y <= p3.y >> 0; y++) {
          if (y < p2.y) {
            this.processScanLine(y, p1, p3, p1, p2, color);
          }
          else {
            this.processScanLine(y, p1, p3, p2, p3, color);
          }
        }
      }

      private _sketchLeftDirectionTringle(p1: BABYLON.Vector3, p2: BABYLON.Vector3,
      p3: BABYLON.Vector3, color: BABYLON.Color4):void {
        for (let y = p1.y >> 0; y <= p3.y >> 0; y++) {
          if (y < p2.y) {
            this.processScanLine(y, p1, p2, p1, p3, color);
          }
          else {
            this.processScanLine(y, p2, p3, p1, p3, color);
          }
        }
      }

      // drawing line between 2 points from left to right
      // papb -> pcpd
      // pa, pb, pc, pd must then be sorted before
      public processScanLine(y: number, pa: BABYLON.Vector3, pb: BABYLON.Vector3, 
                            pc: BABYLON.Vector3, pd: BABYLON.Vector3, color: BABYLON.Color4): void {
          // Thanks to current Y, we can compute the gradient to compute others values like
          // the starting X (sx) and ending X (ex) to draw between
          // if pa.Y == pb.Y or pc.Y == pd.Y, gradient is forced to 1
          var gradient1 = pa.y != pb.y ? (y - pa.y) / (pb.y - pa.y) : 1;
          var gradient2 = pc.y != pd.y ? (y - pc.y) / (pd.y - pc.y) : 1;

          // Fragments are produced via interpolation of the vertices
          var sx = BABYLON.MathTools.interpolate(pa.x, pb.x, gradient1) >> 0;
          var ex = BABYLON.MathTools.interpolate(pc.x, pd.x, gradient2) >> 0;
              
          // starting Z & ending Z
          var z1: number = BABYLON.MathTools.interpolate(pa.z, pb.z, gradient1);
          var z2: number = BABYLON.MathTools.interpolate(pc.z, pd.z, gradient2);

          // drawing a line from left (sx) to right (ex) 
          for (var x = sx; x < ex; x++) {
            var gradient: number = (x - sx) / (ex - sx);

            var z =  BABYLON.MathTools.interpolate(z1, z2, gradient);

            this.drawPoint(new BABYLON.Vector3(x, y, z), color);
          }
      }

    }
  }
}
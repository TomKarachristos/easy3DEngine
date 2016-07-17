namespace engine3D {
  export namespace Render {
    export class projectCanvas {
      private _canvasElement: HTMLCanvasElement;
      private _drawCanvas: DrawCanvas;

      constructor(canvasElement: HTMLCanvasElement, drawCanvas: DrawCanvas) {
        this._canvasElement = canvasElement;
        this._drawCanvas = drawCanvas;
      }

      public facesTo2D(mesh, transformMatrix) {
        for (let indexFaces = 0; indexFaces < mesh.Faces.length; indexFaces++) {
          let currentFace = mesh.Faces[indexFaces];

          let pixelA = this.corrdinate3DTo2D(mesh.Vertices[currentFace.A], transformMatrix);
          let pixelB = this.corrdinate3DTo2D(mesh.Vertices[currentFace.B], transformMatrix);
          let pixelC = this.corrdinate3DTo2D(mesh.Vertices[currentFace.C], transformMatrix);

          let color: number = 0.25 + ((indexFaces % mesh.Faces.length) / mesh.Faces.length) * 0.75 * 255;
          this.drawTriangle(pixelA, pixelB, pixelC, new BABYLON.Color4(255, color, color, color));
        }
      }

      public corrdinate3DTo2D(coordinate: BABYLON.Vector3, transformMatrix: BABYLON.Matrix) {
        let point = BABYLON.Vector3.TransformCoordinates(coordinate, transformMatrix);
        //  We then need transform them to have x:0, y:0 on top left.
        let x = point.x * this._canvasElement.width + this._canvasElement.width / 2.0;
        let y = -point.y * this._canvasElement.height + this._canvasElement.height / 2.0;
        return (new BABYLON.Vector3(x, y, point.z));
      }

      private drawPoint(point: BABYLON.Vector3, color: BABYLON.Color4): void {
        // Clipping what's visible on screen
        if (this.isInBound(point)) {
          this._drawCanvas.putPixel(point.x, point.y, point.z, color);
        }
      }

      public isInBound(point: BABYLON.Vector3): boolean {
        return point.x >= 0 && point.y >= 0 && point.x < this._canvasElement.width
          && point.y < this._canvasElement.height
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

        let slopeP1P2: number = (p2.y - p1.y > 0) ? (p2.x - p1.x) / (p2.y - p1.y) : 0;
        let slopeP1P3: number = (p3.y - p1.y > 0) ? (p3.x - p1.x) / (p3.y - p1.y) : 0;
        // P3
        if (slopeP1P2 > slopeP1P3) {
          this._sketchRightDirectionTringle(p1, p2, p3, color);
        } else {
          this._sketchLeftDirectionTringle(p1, p2, p3, color);
        }
      }

      private _sketchRightDirectionTringle(p1: BABYLON.Vector3, p2: BABYLON.Vector3,
        p3: BABYLON.Vector3, color: BABYLON.Color4): void {
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
        p3: BABYLON.Vector3, color: BABYLON.Color4): void {
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
        let gradientPaToPb = BABYLON.MathTools.Gradient(y, pa.y, pb.y);
        let gradientPcToPd = BABYLON.MathTools.Gradient(y, pc.y, pd.y);

        let startingX = BABYLON.MathTools.Interpolate(pa.x, pb.x, gradientPaToPb) >> 0;
        let endingX = BABYLON.MathTools.Interpolate(pc.x, pd.x, gradientPcToPd) >> 0;

        let startingZ: number = BABYLON.MathTools.Interpolate(pa.z, pb.z, gradientPaToPb);
        let endingZ: number = BABYLON.MathTools.Interpolate(pc.z, pd.z, gradientPcToPd);

        // drawing a line from left (startingX) to right (ex) 
        this._drawLineFromLeftToRight(y, startingX, endingX, startingZ, endingZ, color)
      }


      private _drawLineFromLeftToRight(y: number, startingX: number, endingX: number, startingZ: number, endingZ: number, color: BABYLON.Color4): void {
        for (let x = startingX; x < endingX; x++) {
          let gradient: number = BABYLON.MathTools.Gradient(x, startingX, endingX);
          let z = BABYLON.MathTools.Interpolate(startingZ, endingZ, gradient);
          this.drawPoint(new BABYLON.Vector3(x, y, z), color);
        }
      }

    }
  }
}
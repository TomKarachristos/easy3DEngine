declare var render: engine3D.Render.Canvas;
declare var mesh: any;
declare function init(): void;
declare function loadJSONCompleted(meshesLoaded: mesh3D.Mesh[]): void;
declare function resize(): void;
declare namespace mesh3D {
    interface Face {
        A: number;
        B: number;
        C: number;
    }
    class Mesh {
        name: string;
        Position: BABYLON.Vector3;
        Rotation: BABYLON.Vector3;
        Vertices: BABYLON.Vector3[];
        Faces: Face[];
        constructor(name: string, verticesCount: number, facesCount: number);
        static CreateMeshesFromJSON(jsonObject: any): Mesh[];
        private static createMesh(meshJson);
        private static getBlenderPosition(jsonObject, meshIndex);
        private static getverticesStepIndex(meshJson);
        private static fillingFaces(mesh, indicesArray);
        private static fillingVertices(mesh, verticesArray, verticesStep);
    }
    function LoadJSONFileAsync(fileName: string, callback: (result: Mesh[]) => any): void;
}
declare namespace engine3D {
    namespace Render {
        abstract class AbstractDraw {
        }
    }
}
declare namespace engine3D {
    namespace Render {
        abstract class AbstractPlatform {
            protected render: engine3D.Render.renderToCanvas;
            constructor(canvasElement: HTMLCanvasElement);
            start(scene: engine3D.Scene, camera: engine3D.Camera.AbstractCamera): void;
            protected abstract startDrawing(): void;
            abstract stop(): void;
            changeScene(scene: engine3D.Scene): void;
            changeCamera(camera: engine3D.Camera.AbstractCamera): void;
            setWorkingHeight(height: number): void;
            setWorkingWidth(width: number): void;
        }
    }
}
declare namespace engine3D {
    namespace Render {
        class Canvas extends engine3D.Render.AbstractPlatform {
            protected startDrawing(): void;
            stop(): void;
        }
    }
}
declare namespace engine3D {
    namespace Render {
        class CanvasDraw extends engine3D.Render.AbstractDraw {
            private backbuffer;
            private workingCanvas;
            private workingContext;
            private workingWidth;
            private workingHeight;
            private backbufferdata;
            constructor(canvasElement: HTMLCanvasElement);
            setWorkingWidth(width: number): void;
            setWorkingHeight(height: number): void;
            getWorkingWidth(): number;
            getWorkingHeight(): number;
            clear(): void;
            present(): void;
            putPixel(x: number, y: number, r: any, g: any, b: any, a: any): void;
            project(coord: BABYLON.Vector3, transMat: BABYLON.Matrix): BABYLON.Vector2;
            drawPoint(point: BABYLON.Vector2): void;
            drawBline(point0: BABYLON.Vector2, point1: BABYLON.Vector2): void;
        }
    }
}
declare namespace engine3D {
    namespace Render {
        class renderToCanvas {
            private canvasDraw;
            private camera;
            private scene;
            private requestID;
            constructor(canvasElement: HTMLCanvasElement);
            start(camera: engine3D.Camera.AbstractCamera, scene: engine3D.Scene): void;
            pause(): void;
            drawingLoop: (timestamp: any) => void;
            setWorkingHeight(height: number): void;
            setWorkingWidth(width: number): void;
            private render();
        }
    }
}
declare namespace engine3D {
    class Scene {
        private _meshes;
        meshes: mesh3D.Mesh[];
        constructor(object?: any);
        add(object: any, ...rest: any[]): Scene;
        showConsoleMesh(): void;
        private _deleteMesh(object);
        remove(object: any, ...rest: any[]): Scene;
        private _isMesh(object);
        private _isArray(object);
        private _CallCallbackForEachArgument(arg, callback);
    }
}
declare namespace engine3D {
    namespace Camera {
        abstract class AbstractCamera {
            protected _Position: BABYLON.Vector3;
            Position: BABYLON.Vector3;
            protected _Target: BABYLON.Vector3;
            Target: BABYLON.Vector3;
        }
    }
}
declare namespace engine3D {
    namespace Camera {
        class Orthographic extends engine3D.Camera.AbstractCamera {
            constructor(fov: number, aspect: number, near: number, far: number);
        }
    }
}
declare namespace engine3D {
    namespace Camera {
        class Prospective extends engine3D.Camera.AbstractCamera {
            constructor(fov: number, aspect: number, near: number, far: number);
        }
    }
}
declare namespace BABYLON {
    class Color4 {
        r: number;
        g: number;
        b: number;
        a: number;
        constructor(initialR: number, initialG: number, initialB: number, initialA: number);
        toString(): string;
    }
    class Vector2 {
        x: number;
        y: number;
        constructor(initialX: any, initialY: any);
        toString(): string;
        add(otherVector: Vector2): Vector2;
        subtract(otherVector: Vector2): Vector2;
        negate(): Vector2;
        scale(scale: number): Vector2;
        equals(otherVector: Vector2): boolean;
        length(): number;
        lengthSquared(): number;
        normalize(): void;
        static Zero(): Vector2;
        static Copy(source: Vector2): Vector2;
        static Normalize(vector: Vector2): Vector2;
        static Minimize(left: Vector2, right: Vector2): Vector2;
        static Maximize(left: Vector2, right: Vector2): Vector2;
        static Transform(vector: Vector2, transformation: any): Vector2;
        static Distance(value1: Vector2, value2: Vector2): number;
        static DistanceSquared(value1: Vector2, value2: Vector2): number;
    }
    class Vector3 {
        x: number;
        y: number;
        z: number;
        constructor(initialX: number, initialY: number, initialZ: number);
        toString(): string;
        add(otherVector: Vector3): Vector3;
        subtract(otherVector: Vector3): Vector3;
        negate(): Vector3;
        scale(scale: number): Vector3;
        equals(otherVector: Vector3): boolean;
        multiply(otherVector: Vector3): Vector3;
        divide(otherVector: Vector3): Vector3;
        length(): number;
        lengthSquared(): number;
        normalize(): void;
        static FromArray(array: any, offset: any): Vector3;
        static Zero(): Vector3;
        static Up(): Vector3;
        static Copy(source: Vector3): Vector3;
        static TransformCoordinates(vector: Vector3, transformation: any): Vector3;
        static TransformNormal(vector: Vector3, transformation: any): Vector3;
        static Dot(left: Vector3, right: Vector3): number;
        static Cross(left: Vector3, right: Vector3): Vector3;
        static Normalize(vector: Vector3): Vector3;
        static Distance(value1: Vector3, value2: Vector3): number;
        static DistanceSquared(value1: Vector3, value2: Vector3): number;
    }
    class Matrix {
        m: any[];
        constructor();
        isIdentity(): boolean;
        determinant(): number;
        toArray(): any[];
        invert(): void;
        multiply(other: Matrix): Matrix;
        equals(value: Matrix): boolean;
        static FromValues(initialM11: number, initialM12: number, initialM13: number, initialM14: number, initialM21: number, initialM22: number, initialM23: number, initialM24: number, initialM31: number, initialM32: number, initialM33: number, initialM34: number, initialM41: number, initialM42: number, initialM43: number, initialM44: number): Matrix;
        static Identity(): Matrix;
        static Zero(): Matrix;
        static Copy(source: Matrix): Matrix;
        static RotationX(angle: number): Matrix;
        static RotationY(angle: number): Matrix;
        static RotationZ(angle: number): Matrix;
        static RotationAxis(axis: Vector3, angle: number): Matrix;
        static RotationYawPitchRoll(yaw: number, pitch: number, roll: number): Matrix;
        static Scaling(x: number, y: number, z: number): Matrix;
        static Translation(x: number, y: number, z: number): Matrix;
        static LookAtLH(eye: Vector3, target: Vector3, up: Vector3): Matrix;
        static PerspectiveLH(width: number, height: number, znear: number, zfar: number): Matrix;
        static PerspectiveFovLH(fov: number, aspect: number, znear: number, zfar: number): Matrix;
        static Transpose(matrix: Matrix): Matrix;
    }
}

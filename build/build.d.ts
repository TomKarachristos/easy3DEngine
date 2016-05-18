declare var canvas: HTMLCanvasElement;
declare var screen: engine3D.Screen;
declare var scene: engine3D.Scene;
declare function init(): void;
declare function loadJSONCompleted(meshesLoaded: mesh3D.Mesh[]): void;
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
    class Device {
        private backbuffer;
        private workingCanvas;
        private workingContext;
        private workingWidth;
        private workingHeight;
        private backbufferdata;
        constructor(canvas: HTMLCanvasElement);
        setWorkingWidth(width: number): void;
        setWorkingHeight(height: number): void;
        getWorkingWidth(): number;
        getWorkingHeight(): number;
        clear(): void;
        present(): void;
        putPixel(x: number, y: number, color: BABYLON.Color4): void;
        project(coord: BABYLON.Vector3, transMat: BABYLON.Matrix): BABYLON.Vector2;
        drawPoint(point: BABYLON.Vector2): void;
        drawBline(point0: BABYLON.Vector2, point1: BABYLON.Vector2): void;
    }
}
declare namespace engine3D {
    class Screen {
        private device;
        private mera;
        private scene;
        constructor(canvasElement: HTMLCanvasElement);
        private resize;
        private render(camera, meshes);
        drawingLoop: (timestamp: any) => void;
        start(scene: engine3D.Scene): void;
    }
}
declare namespace engine3D {
    class Scene {
        meshes: mesh3D.Mesh[];
        constructor(meshes: mesh3D.Mesh[]);
        add(object: any): this;
        remove(object: any): this;
    }
}
declare namespace engine3D {
    class Camera {
        private Position;
        private Target;
        constructor();
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

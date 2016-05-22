var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var render;
document.addEventListener("DOMContentLoaded", init, false);
function init() {
    render = new engine3D.Render.Canvas(document.getElementById("frontBuffer"));
    mesh3D.Utils.LoadJSONFileAsync("https://raw.githubusercontent.com/deltakosh/MVA3DHTML5GameDev/master/Chapter%201/003.%20loading%20meshes%20from%20Blender/monkey.babylon", loadJSONCompleted);
}
function loadJSONCompleted(meshesLoaded) {
    var scene = new engine3D.Scene();
    scene.add(meshesLoaded);
    var camera = new engine3D.Camera.Prospective(0, 0, 0, 0);
    render.start(scene, camera);
    this.resize();
    window.onresize = this.resize;
}
function resize() {
    render.setWorkingHeight(window.innerHeight);
    render.setWorkingWidth(window.innerWidth);
}
var engine3D;
(function (engine3D) {
    var Camera;
    (function (Camera) {
        var AbstractCamera = (function () {
            function AbstractCamera() {
            }
            Object.defineProperty(AbstractCamera.prototype, "Position", {
                get: function () {
                    return this._Position;
                },
                set: function (value) {
                    this._Position = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractCamera.prototype, "Target", {
                get: function () {
                    return this._Target;
                },
                set: function (value) {
                    this._Target = value;
                },
                enumerable: true,
                configurable: true
            });
            return AbstractCamera;
        }());
        Camera.AbstractCamera = AbstractCamera;
    })(Camera = engine3D.Camera || (engine3D.Camera = {}));
})(engine3D || (engine3D = {}));
var engine3D;
(function (engine3D) {
    var Camera;
    (function (Camera) {
        var Orthographic = (function (_super) {
            __extends(Orthographic, _super);
            function Orthographic(fov, aspect, near, far) {
                _super.call(this);
                this._Position = BABYLON.Vector3.Zero();
                this._Target = BABYLON.Vector3.Zero();
            }
            return Orthographic;
        }(engine3D.Camera.AbstractCamera));
        Camera.Orthographic = Orthographic;
    })(Camera = engine3D.Camera || (engine3D.Camera = {}));
})(engine3D || (engine3D = {}));
var engine3D;
(function (engine3D) {
    var Camera;
    (function (Camera) {
        var Prospective = (function (_super) {
            __extends(Prospective, _super);
            function Prospective(fov, aspect, near, far) {
                _super.call(this);
                this._Position = new BABYLON.Vector3(0, 0, 10);
                this._Target = new BABYLON.Vector3(0, 0, 0);
            }
            return Prospective;
        }(engine3D.Camera.AbstractCamera));
        Camera.Prospective = Prospective;
    })(Camera = engine3D.Camera || (engine3D.Camera = {}));
})(engine3D || (engine3D = {}));
var engine3D;
(function (engine3D) {
    var Render;
    (function (Render) {
        var AbstractDraw = (function () {
            function AbstractDraw() {
            }
            return AbstractDraw;
        }());
        Render.AbstractDraw = AbstractDraw;
    })(Render = engine3D.Render || (engine3D.Render = {}));
})(engine3D || (engine3D = {}));
var engine3D;
(function (engine3D) {
    var Render;
    (function (Render) {
        var CanvasDraw = (function (_super) {
            __extends(CanvasDraw, _super);
            function CanvasDraw(canvasElement) {
                _super.call(this);
                this.workingCanvas = canvasElement;
                this.workingWidth = canvasElement.width;
                this.workingHeight = canvasElement.height;
                this.workingContext = this.workingCanvas.getContext("2d");
            }
            CanvasDraw.prototype.setWorkingWidth = function (width) {
                this.workingWidth = width;
                this.workingCanvas.width = width;
            };
            CanvasDraw.prototype.setWorkingHeight = function (height) {
                this.workingHeight = height;
                this.workingCanvas.height = height;
            };
            CanvasDraw.prototype.getWorkingWidth = function () {
                return this.workingWidth;
            };
            CanvasDraw.prototype.getWorkingHeight = function () {
                return this.workingHeight;
            };
            // This function is called to clear the back buffer with a specific color
            CanvasDraw.prototype.clear = function () {
                // Clearing with black color by default
                this.workingContext.clearRect(0, 0, this.workingWidth, this.workingHeight);
                // once cleared with black pixels, we're getting back the associated image data to 
                // clear out back buffer
                this.backbuffer = this.workingContext.createImageData(this.workingWidth, this.workingHeight);
            };
            // Once everything is ready, we can flush the back buffer
            // into the front buffer. 
            CanvasDraw.prototype.present = function () {
                this.workingContext.putImageData(this.backbuffer, 0, 0);
            };
            // Called to put a pixel on screen at a specific X,Y coordinates
            // rgba pass individual for performance reasons. 
            CanvasDraw.prototype.putPixel = function (x, y, r, g, b, a) {
                this.backbufferdata = this.backbuffer.data;
                // As we have a 1-D Array for our back buffer
                // we need to know the equivalent cell index in 1-D based
                // on the 2D coordinates of the screen
                // x >> 0 just convert the number to integer.
                var index = (x + y * this.workingWidth) * 4;
                // RGBA color space is used by the HTML5 canvas
                this.backbufferdata[index] = r * 255;
                this.backbufferdata[index + 1] = g * 255;
                this.backbufferdata[index + 2] = b * 255;
                this.backbufferdata[index + 3] = a * 255;
            };
            // Project takes some 3D coordinates and transform them
            // in 2D coordinates using the transformation matrix
            CanvasDraw.prototype.project = function (coord, transMat) {
                // transforming the coordinates
                var point = BABYLON.Vector3.TransformCoordinates(coord, transMat);
                // The transformed coordinates will be based on coordinate system
                // starting on the center of the screen. But drawing on screen normally starts
                // from top left. We then need to transform them again to have x:0, y:0 on top left.
                var x = point.x * this.workingWidth + this.workingWidth / 2.0 >> 0;
                var y = -point.y * this.workingHeight + this.workingHeight / 2.0 >> 0;
                return (new BABYLON.Vector2(x, y));
            };
            // drawPoint calls putPixel but does the clipping operation before
            CanvasDraw.prototype.drawPoint = function (point) {
                // Clipping what's visible on screen
                if (point.x >= 0 && point.y >= 0 && point.x < this.workingWidth
                    && point.y < this.workingHeight) {
                    // Drawing a yellow point
                    this.putPixel(point.x, point.y, 255, 255, 0, 255);
                }
            };
            // http://www.tutorialspoint.com/computer_graphics/line_generation_algorithm.htm
            CanvasDraw.prototype.drawBline = function (point0, point1) {
                var dx = Math.abs(point1.x - point0.x);
                var dy = Math.abs(point1.y - point0.y);
                var sx = (point0.x < point1.x) ? 1 : -1;
                var sy = (point0.y < point1.y) ? 1 : -1;
                var err = dx - dy;
                while (true) {
                    this.drawPoint(new BABYLON.Vector2(point0.x, point0.y));
                    if ((point0.x == point1.x) && (point0.y == point1.y))
                        break;
                    var e2 = 2 * err;
                    if (e2 > -dy) {
                        err -= dy;
                        point0.x += sx;
                    }
                    if (e2 < dx) {
                        err += dx;
                        point0.y += sy;
                    }
                }
            };
            return CanvasDraw;
        }(engine3D.Render.AbstractDraw));
        Render.CanvasDraw = CanvasDraw;
    })(Render = engine3D.Render || (engine3D.Render = {}));
})(engine3D || (engine3D = {}));
var engine3D;
(function (engine3D) {
    var Render;
    (function (Render_1) {
        var Render = (function () {
            function Render(CanvasDraw) {
                this.canvasDraw = CanvasDraw;
            }
            Render.prototype.doIt = function (camera, scene) {
                var meshes = scene.meshes;
                // Builds a left-handed look-at Matrix
                var viewMatrix = BABYLON.Matrix.LookAtLH(camera.Position, camera.Target, BABYLON.Vector3.Up());
                // Creates a left-handed perspective projection matrix based on the field of view
                var projectionMatrix = BABYLON.Matrix.PerspectiveFovLH(0.78, this.canvasDraw.getWorkingWidth() / this.canvasDraw.getWorkingHeight(), 0.01, 1.0);
                for (var index = 0; index < meshes.length; index++) {
                    // current mesh to work on
                    var cMesh = meshes[index];
                    this.animation(meshes, index);
                    // Beware to apply rotation before translation
                    var worldMatrix = this.getWorldMatrix(cMesh);
                    var transformMatrix = this.getTransformMatrix(worldMatrix, viewMatrix, projectionMatrix);
                    this.projectVerticlesToScreen(cMesh, transformMatrix);
                    this.projectFacesToScreen(cMesh, transformMatrix);
                }
            };
            Render.prototype.projectVerticlesToScreen = function (cMesh, transformMatrix) {
                for (var indexVertices = 0; indexVertices < cMesh.Vertices.length; indexVertices++) {
                    // First, we project the 3D coordinates into the 2D space
                    var projectedPoint = this.canvasDraw.project(cMesh.Vertices[indexVertices], transformMatrix);
                    // Then we can draw on screen
                    this.canvasDraw.drawPoint(projectedPoint);
                }
            };
            Render.prototype.projectFacesToScreen = function (cMesh, transformMatrix) {
                for (var indexFaces = 0; indexFaces < cMesh.Faces.length; indexFaces++) {
                    var currentFace = cMesh.Faces[indexFaces];
                    var vertexA = cMesh.Vertices[currentFace.A];
                    var vertexB = cMesh.Vertices[currentFace.B];
                    var vertexC = cMesh.Vertices[currentFace.C];
                    var pixelA = this.canvasDraw.project(vertexA, transformMatrix);
                    var pixelB = this.canvasDraw.project(vertexB, transformMatrix);
                    var pixelC = this.canvasDraw.project(vertexC, transformMatrix);
                    this.canvasDraw.drawBline(pixelA, pixelB);
                    this.canvasDraw.drawBline(pixelB, pixelC);
                    this.canvasDraw.drawBline(pixelC, pixelA);
                }
            };
            Render.prototype.getWorldMatrix = function (cMesh) {
                return BABYLON.Matrix.RotationYawPitchRoll(cMesh.Rotation.y, cMesh.Rotation.x, cMesh.Rotation.z)
                    .multiply(BABYLON.Matrix.Translation(cMesh.Position.x, cMesh.Position.y, cMesh.Position.z));
            };
            Render.prototype.getTransformMatrix = function (worldMatrix, viewMatrix, projectionMatrix) {
                return worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
            };
            Render.prototype.animation = function (meshes, index) {
                meshes[index].Rotation.x += 0.01;
                meshes[index].Rotation.y += 0.01;
            };
            return Render;
        }());
        Render_1.Render = Render;
    })(Render = engine3D.Render || (engine3D.Render = {}));
})(engine3D || (engine3D = {}));
var engine3D;
(function (engine3D) {
    var Render;
    (function (Render) {
        var RenderToCanvas = (function () {
            function RenderToCanvas(canvasElement) {
                var _this = this;
                this.drawingLoop = function (timestamp) {
                    _this.canvasDraw.clear();
                    _this.render.doIt(_this.camera, _this.scene); // Doing the various matrix operations
                    _this.canvasDraw.present(); // Flushing the back buffer into the front buffer
                    requestAnimationFrame(_this.drawingLoop);
                };
                this.canvasDraw = new engine3D.Render.CanvasDraw(canvasElement);
                this.render = new engine3D.Render.Render(this.canvasDraw);
            }
            RenderToCanvas.prototype.start = function (camera, scene) {
                this.camera = camera;
                this.scene = scene;
                this.requestID = requestAnimationFrame(this.drawingLoop);
            };
            RenderToCanvas.prototype.pause = function () {
                window.cancelAnimationFrame(this.requestID);
            };
            RenderToCanvas.prototype.setWorkingHeight = function (height) {
                this.canvasDraw.setWorkingHeight(height);
            };
            RenderToCanvas.prototype.setWorkingWidth = function (width) {
                this.canvasDraw.setWorkingWidth(width);
            };
            return RenderToCanvas;
        }());
        Render.RenderToCanvas = RenderToCanvas;
    })(Render = engine3D.Render || (engine3D.Render = {}));
})(engine3D || (engine3D = {}));
var engine3D;
(function (engine3D) {
    var Render;
    (function (Render) {
        var AbstractPlatform = (function () {
            function AbstractPlatform(canvasElement) {
                this.render = new engine3D.Render.RenderToCanvas(canvasElement);
            }
            AbstractPlatform.prototype.start = function (scene, camera) {
                this.render.start(camera, scene);
            };
            AbstractPlatform.prototype.stop = function () {
                this.render.pause();
            };
            AbstractPlatform.prototype.changeScene = function (scene) {
            };
            AbstractPlatform.prototype.changeCamera = function (camera) {
            };
            AbstractPlatform.prototype.setWorkingHeight = function (height) {
                this.render.setWorkingHeight(height);
            };
            AbstractPlatform.prototype.setWorkingWidth = function (width) {
                this.render.setWorkingWidth(width);
            };
            return AbstractPlatform;
        }());
        Render.AbstractPlatform = AbstractPlatform;
    })(Render = engine3D.Render || (engine3D.Render = {}));
})(engine3D || (engine3D = {}));
var engine3D;
(function (engine3D) {
    var Render;
    (function (Render) {
        var Canvas = (function (_super) {
            __extends(Canvas, _super);
            function Canvas() {
                _super.apply(this, arguments);
            }
            return Canvas;
        }(engine3D.Render.AbstractPlatform));
        Render.Canvas = Canvas;
    })(Render = engine3D.Render || (engine3D.Render = {}));
})(engine3D || (engine3D = {}));
var engine3D;
(function (engine3D) {
    var Render;
    (function (Render) {
        var WebGl = (function (_super) {
            __extends(WebGl, _super);
            function WebGl() {
                _super.apply(this, arguments);
            }
            return WebGl;
        }(engine3D.Render.AbstractPlatform));
        Render.WebGl = WebGl;
    })(Render = engine3D.Render || (engine3D.Render = {}));
})(engine3D || (engine3D = {}));
var engine3D;
(function (engine3D) {
    var Scene = (function () {
        function Scene(object) {
            this._meshes = [];
            this._meshes = [];
            if (object)
                this.add(object);
        }
        Scene.prototype.add = function (object) {
            var _this = this;
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            if (arguments.length > 1) {
                Utils._CallCallbackForEachArgument(arguments, this.add);
            }
            else if (Utils._isMesh(object)) {
                this.meshes.push(object);
            }
            else if (Utils._isArray(object)) {
                object.forEach(function (item) {
                    if (Utils._isMesh(item)) {
                        _this.meshes.push(item);
                    }
                });
            }
            else {
                console.warn("not accepted object: " + object);
            }
            return this;
        };
        Scene.prototype.remove = function (object) {
            var _this = this;
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            if (arguments.length > 1) {
                Utils._CallCallbackForEachArgument(arguments, this.remove);
            }
            else if (Utils._isMesh(object)) {
                this._deleteMesh(object);
            }
            else if (Utils._isArray(object)) {
                object.forEach(function (item) {
                    if (Utils._isMesh(item)) {
                        _this._deleteMesh(item);
                    }
                });
            }
            else {
                console.warn("not accepted object: " + object);
            }
            return this;
        };
        Scene.prototype._deleteMesh = function (object) {
            var index = this._meshes.indexOf(object);
            if (index > -1) {
                this._meshes.splice(index, 1);
            }
        };
        Object.defineProperty(Scene.prototype, "meshes", {
            get: function () {
                return this._meshes;
            },
            set: function (value) {
                this._meshes = value;
            },
            enumerable: true,
            configurable: true
        });
        return Scene;
    }());
    engine3D.Scene = Scene;
})(engine3D || (engine3D = {}));
var BABYLON;
(function (BABYLON) {
    var Color4 = (function () {
        function Color4(initialR, initialG, initialB, initialA) {
            this.r = initialR;
            this.g = initialG;
            this.b = initialB;
            this.a = initialA;
        }
        Color4.prototype.toString = function () {
            return "{R: " + this.r + " G:" + this.g + " B:" + this.b + " A:" + this.a + "}";
        };
        return Color4;
    }());
    BABYLON.Color4 = Color4;
    var Vector2 = (function () {
        function Vector2(initialX, initialY) {
            this.x = initialX;
            this.y = initialY;
        }
        Vector2.prototype.toString = function () {
            return "{X: " + this.x + " Y:" + this.y + "}";
        };
        Vector2.prototype.add = function (otherVector) {
            return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
        };
        Vector2.prototype.subtract = function (otherVector) {
            return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
        };
        Vector2.prototype.negate = function () {
            return new Vector2(-this.x, -this.y);
        };
        Vector2.prototype.scale = function (scale) {
            return new Vector2(this.x * scale, this.y * scale);
        };
        Vector2.prototype.equals = function (otherVector) {
            return this.x === otherVector.x && this.y === otherVector.y;
        };
        Vector2.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vector2.prototype.lengthSquared = function () {
            return (this.x * this.x + this.y * this.y);
        };
        Vector2.prototype.normalize = function () {
            var len = this.length();
            if (len === 0) {
                return;
            }
            var num = 1.0 / len;
            this.x *= num;
            this.y *= num;
        };
        Vector2.Zero = function () {
            return new Vector2(0, 0);
        };
        Vector2.Copy = function (source) {
            return new Vector2(source.x, source.y);
        };
        Vector2.Normalize = function (vector) {
            var newVector = Vector2.Copy(vector);
            newVector.normalize();
            return newVector;
        };
        Vector2.Minimize = function (left, right) {
            var x = (left.x < right.x) ? left.x : right.x;
            var y = (left.y < right.y) ? left.y : right.y;
            return new Vector2(x, y);
        };
        Vector2.Maximize = function (left, right) {
            var x = (left.x > right.x) ? left.x : right.x;
            var y = (left.y > right.y) ? left.y : right.y;
            return new Vector2(x, y);
        };
        Vector2.Transform = function (vector, transformation) {
            var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]);
            var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]);
            return new Vector2(x, y);
        };
        Vector2.Distance = function (value1, value2) {
            return Math.sqrt(Vector2.DistanceSquared(value1, value2));
        };
        Vector2.DistanceSquared = function (value1, value2) {
            var x = value1.x - value2.x;
            var y = value1.y - value2.y;
            return (x * x) + (y * y);
        };
        return Vector2;
    }());
    BABYLON.Vector2 = Vector2;
    var Vector3 = (function () {
        function Vector3(initialX, initialY, initialZ) {
            this.x = initialX;
            this.y = initialY;
            this.z = initialZ;
        }
        Vector3.prototype.toString = function () {
            return "{X: " + this.x + " Y:" + this.y + " Z:" + this.z + "}";
        };
        Vector3.prototype.add = function (otherVector) {
            return new Vector3(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z);
        };
        Vector3.prototype.subtract = function (otherVector) {
            return new Vector3(this.x - otherVector.x, this.y - otherVector.y, this.z - otherVector.z);
        };
        Vector3.prototype.negate = function () {
            return new Vector3(-this.x, -this.y, -this.z);
        };
        Vector3.prototype.scale = function (scale) {
            return new Vector3(this.x * scale, this.y * scale, this.z * scale);
        };
        Vector3.prototype.equals = function (otherVector) {
            return this.x === otherVector.x && this.y === otherVector.y && this.z === otherVector.z;
        };
        Vector3.prototype.multiply = function (otherVector) {
            return new Vector3(this.x * otherVector.x, this.y * otherVector.y, this.z * otherVector.z);
        };
        Vector3.prototype.divide = function (otherVector) {
            return new Vector3(this.x / otherVector.x, this.y / otherVector.y, this.z / otherVector.z);
        };
        Vector3.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        };
        Vector3.prototype.lengthSquared = function () {
            return (this.x * this.x + this.y * this.y + this.z * this.z);
        };
        Vector3.prototype.normalize = function () {
            var len = this.length();
            if (len === 0) {
                return;
            }
            var num = 1.0 / len;
            this.x *= num;
            this.y *= num;
            this.z *= num;
        };
        Vector3.FromArray = function (array, offset) {
            if (!offset) {
                offset = 0;
            }
            return new Vector3(array[offset], array[offset + 1], array[offset + 2]);
        };
        Vector3.Zero = function () {
            return new Vector3(0, 0, 0);
        };
        Vector3.Up = function () {
            return new Vector3(0, 1.0, 0);
        };
        Vector3.Copy = function (source) {
            return new Vector3(source.x, source.y, source.z);
        };
        // Transforms a vector into a new vector
        Vector3.TransformCoordinates = function (vector, transformation) {
            var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]) + transformation.m[12];
            var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]) + transformation.m[13];
            var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]) + transformation.m[14];
            var w = (vector.x * transformation.m[3]) + (vector.y * transformation.m[7]) + (vector.z * transformation.m[11]) + transformation.m[15];
            return new Vector3(x / w, y / w, z / w);
        };
        Vector3.TransformNormal = function (vector, transformation) {
            var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]);
            var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]);
            var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]);
            return new Vector3(x, y, z);
        };
        Vector3.Dot = function (left, right) {
            return (left.x * right.x + left.y * right.y + left.z * right.z);
        };
        Vector3.Cross = function (left, right) {
            var x = left.y * right.z - left.z * right.y;
            var y = left.z * right.x - left.x * right.z;
            var z = left.x * right.y - left.y * right.x;
            return new Vector3(x, y, z);
        };
        Vector3.Normalize = function (vector) {
            var newVector = Vector3.Copy(vector);
            newVector.normalize();
            return newVector;
        };
        Vector3.Distance = function (value1, value2) {
            return Math.sqrt(Vector3.DistanceSquared(value1, value2));
        };
        Vector3.DistanceSquared = function (value1, value2) {
            var x = value1.x - value2.x;
            var y = value1.y - value2.y;
            var z = value1.z - value2.z;
            return (x * x) + (y * y) + (z * z);
        };
        return Vector3;
    }());
    BABYLON.Vector3 = Vector3;
    var Matrix = (function () {
        function Matrix() {
            this.m = [];
        }
        Matrix.prototype.isIdentity = function () {
            if (this.m[0] != 1.0 || this.m[5] != 1.0 || this.m[10] != 1.0 || this.m[15] != 1.0) {
                return false;
            }
            if (this.m[12] != 0.0 || this.m[13] != 0.0 || this.m[14] != 0.0 || this.m[4] != 0.0 || this.m[6] != 0.0 || this.m[7] != 0.0 || this.m[8] != 0.0 || this.m[9] != 0.0 || this.m[11] != 0.0 || this.m[12] != 0.0 || this.m[13] != 0.0 || this.m[14] != 0.0) {
                return false;
            }
            return true;
        };
        Matrix.prototype.determinant = function () {
            var temp1 = (this.m[10] * this.m[15]) - (this.m[11] * this.m[14]);
            var temp2 = (this.m[9] * this.m[15]) - (this.m[11] * this.m[13]);
            var temp3 = (this.m[9] * this.m[14]) - (this.m[10] * this.m[13]);
            var temp4 = (this.m[8] * this.m[15]) - (this.m[11] * this.m[12]);
            var temp5 = (this.m[8] * this.m[14]) - (this.m[10] * this.m[12]);
            var temp6 = (this.m[8] * this.m[13]) - (this.m[9] * this.m[12]);
            return ((((this.m[0] * (((this.m[5] * temp1) - (this.m[6] * temp2)) + (this.m[7] * temp3))) - (this.m[1] * (((this.m[4] * temp1) - (this.m[6] * temp4)) + (this.m[7] * temp5)))) + (this.m[2] * (((this.m[4] * temp2) - (this.m[5] * temp4)) + (this.m[7] * temp6)))) - (this.m[3] * (((this.m[4] * temp3) - (this.m[5] * temp5)) + (this.m[6] * temp6))));
        };
        Matrix.prototype.toArray = function () {
            return this.m;
        };
        Matrix.prototype.invert = function () {
            var l1 = this.m[0];
            var l2 = this.m[1];
            var l3 = this.m[2];
            var l4 = this.m[3];
            var l5 = this.m[4];
            var l6 = this.m[5];
            var l7 = this.m[6];
            var l8 = this.m[7];
            var l9 = this.m[8];
            var l10 = this.m[9];
            var l11 = this.m[10];
            var l12 = this.m[11];
            var l13 = this.m[12];
            var l14 = this.m[13];
            var l15 = this.m[14];
            var l16 = this.m[15];
            var l17 = (l11 * l16) - (l12 * l15);
            var l18 = (l10 * l16) - (l12 * l14);
            var l19 = (l10 * l15) - (l11 * l14);
            var l20 = (l9 * l16) - (l12 * l13);
            var l21 = (l9 * l15) - (l11 * l13);
            var l22 = (l9 * l14) - (l10 * l13);
            var l23 = ((l6 * l17) - (l7 * l18)) + (l8 * l19);
            var l24 = -(((l5 * l17) - (l7 * l20)) + (l8 * l21));
            var l25 = ((l5 * l18) - (l6 * l20)) + (l8 * l22);
            var l26 = -(((l5 * l19) - (l6 * l21)) + (l7 * l22));
            var l27 = 1.0 / ((((l1 * l23) + (l2 * l24)) + (l3 * l25)) + (l4 * l26));
            var l28 = (l7 * l16) - (l8 * l15);
            var l29 = (l6 * l16) - (l8 * l14);
            var l30 = (l6 * l15) - (l7 * l14);
            var l31 = (l5 * l16) - (l8 * l13);
            var l32 = (l5 * l15) - (l7 * l13);
            var l33 = (l5 * l14) - (l6 * l13);
            var l34 = (l7 * l12) - (l8 * l11);
            var l35 = (l6 * l12) - (l8 * l10);
            var l36 = (l6 * l11) - (l7 * l10);
            var l37 = (l5 * l12) - (l8 * l9);
            var l38 = (l5 * l11) - (l7 * l9);
            var l39 = (l5 * l10) - (l6 * l9);
            this.m[0] = l23 * l27;
            this.m[4] = l24 * l27;
            this.m[8] = l25 * l27;
            this.m[12] = l26 * l27;
            this.m[1] = -(((l2 * l17) - (l3 * l18)) + (l4 * l19)) * l27;
            this.m[5] = (((l1 * l17) - (l3 * l20)) + (l4 * l21)) * l27;
            this.m[9] = -(((l1 * l18) - (l2 * l20)) + (l4 * l22)) * l27;
            this.m[13] = (((l1 * l19) - (l2 * l21)) + (l3 * l22)) * l27;
            this.m[2] = (((l2 * l28) - (l3 * l29)) + (l4 * l30)) * l27;
            this.m[6] = -(((l1 * l28) - (l3 * l31)) + (l4 * l32)) * l27;
            this.m[10] = (((l1 * l29) - (l2 * l31)) + (l4 * l33)) * l27;
            this.m[14] = -(((l1 * l30) - (l2 * l32)) + (l3 * l33)) * l27;
            this.m[3] = -(((l2 * l34) - (l3 * l35)) + (l4 * l36)) * l27;
            this.m[7] = (((l1 * l34) - (l3 * l37)) + (l4 * l38)) * l27;
            this.m[11] = -(((l1 * l35) - (l2 * l37)) + (l4 * l39)) * l27;
            this.m[15] = (((l1 * l36) - (l2 * l38)) + (l3 * l39)) * l27;
        };
        Matrix.prototype.multiply = function (other) {
            var result = new Matrix();
            result.m[0] = this.m[0] * other.m[0] + this.m[1] * other.m[4] + this.m[2] * other.m[8] + this.m[3] * other.m[12];
            result.m[1] = this.m[0] * other.m[1] + this.m[1] * other.m[5] + this.m[2] * other.m[9] + this.m[3] * other.m[13];
            result.m[2] = this.m[0] * other.m[2] + this.m[1] * other.m[6] + this.m[2] * other.m[10] + this.m[3] * other.m[14];
            result.m[3] = this.m[0] * other.m[3] + this.m[1] * other.m[7] + this.m[2] * other.m[11] + this.m[3] * other.m[15];
            result.m[4] = this.m[4] * other.m[0] + this.m[5] * other.m[4] + this.m[6] * other.m[8] + this.m[7] * other.m[12];
            result.m[5] = this.m[4] * other.m[1] + this.m[5] * other.m[5] + this.m[6] * other.m[9] + this.m[7] * other.m[13];
            result.m[6] = this.m[4] * other.m[2] + this.m[5] * other.m[6] + this.m[6] * other.m[10] + this.m[7] * other.m[14];
            result.m[7] = this.m[4] * other.m[3] + this.m[5] * other.m[7] + this.m[6] * other.m[11] + this.m[7] * other.m[15];
            result.m[8] = this.m[8] * other.m[0] + this.m[9] * other.m[4] + this.m[10] * other.m[8] + this.m[11] * other.m[12];
            result.m[9] = this.m[8] * other.m[1] + this.m[9] * other.m[5] + this.m[10] * other.m[9] + this.m[11] * other.m[13];
            result.m[10] = this.m[8] * other.m[2] + this.m[9] * other.m[6] + this.m[10] * other.m[10] + this.m[11] * other.m[14];
            result.m[11] = this.m[8] * other.m[3] + this.m[9] * other.m[7] + this.m[10] * other.m[11] + this.m[11] * other.m[15];
            result.m[12] = this.m[12] * other.m[0] + this.m[13] * other.m[4] + this.m[14] * other.m[8] + this.m[15] * other.m[12];
            result.m[13] = this.m[12] * other.m[1] + this.m[13] * other.m[5] + this.m[14] * other.m[9] + this.m[15] * other.m[13];
            result.m[14] = this.m[12] * other.m[2] + this.m[13] * other.m[6] + this.m[14] * other.m[10] + this.m[15] * other.m[14];
            result.m[15] = this.m[12] * other.m[3] + this.m[13] * other.m[7] + this.m[14] * other.m[11] + this.m[15] * other.m[15];
            return result;
        };
        Matrix.prototype.equals = function (value) {
            return (this.m[0] === value.m[0] && this.m[1] === value.m[1] && this.m[2] === value.m[2] && this.m[3] === value.m[3] && this.m[4] === value.m[4] && this.m[5] === value.m[5] && this.m[6] === value.m[6] && this.m[7] === value.m[7] && this.m[8] === value.m[8] && this.m[9] === value.m[9] && this.m[10] === value.m[10] && this.m[11] === value.m[11] && this.m[12] === value.m[12] && this.m[13] === value.m[13] && this.m[14] === value.m[14] && this.m[15] === value.m[15]);
        };
        Matrix.FromValues = function (initialM11, initialM12, initialM13, initialM14, initialM21, initialM22, initialM23, initialM24, initialM31, initialM32, initialM33, initialM34, initialM41, initialM42, initialM43, initialM44) {
            var result = new Matrix();
            result.m[0] = initialM11;
            result.m[1] = initialM12;
            result.m[2] = initialM13;
            result.m[3] = initialM14;
            result.m[4] = initialM21;
            result.m[5] = initialM22;
            result.m[6] = initialM23;
            result.m[7] = initialM24;
            result.m[8] = initialM31;
            result.m[9] = initialM32;
            result.m[10] = initialM33;
            result.m[11] = initialM34;
            result.m[12] = initialM41;
            result.m[13] = initialM42;
            result.m[14] = initialM43;
            result.m[15] = initialM44;
            return result;
        };
        Matrix.Identity = function () {
            return Matrix.FromValues(1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0);
        };
        Matrix.Zero = function () {
            return Matrix.FromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        };
        Matrix.Copy = function (source) {
            return Matrix.FromValues(source.m[0], source.m[1], source.m[2], source.m[3], source.m[4], source.m[5], source.m[6], source.m[7], source.m[8], source.m[9], source.m[10], source.m[11], source.m[12], source.m[13], source.m[14], source.m[15]);
        };
        Matrix.RotationX = function (angle) {
            var result = Matrix.Zero();
            var s = Math.sin(angle);
            var c = Math.cos(angle);
            result.m[0] = 1.0;
            result.m[15] = 1.0;
            result.m[5] = c;
            result.m[10] = c;
            result.m[9] = -s;
            result.m[6] = s;
            return result;
        };
        Matrix.RotationY = function (angle) {
            var result = Matrix.Zero();
            var s = Math.sin(angle);
            var c = Math.cos(angle);
            result.m[5] = 1.0;
            result.m[15] = 1.0;
            result.m[0] = c;
            result.m[2] = -s;
            result.m[8] = s;
            result.m[10] = c;
            return result;
        };
        Matrix.RotationZ = function (angle) {
            var result = Matrix.Zero();
            var s = Math.sin(angle);
            var c = Math.cos(angle);
            result.m[10] = 1.0;
            result.m[15] = 1.0;
            result.m[0] = c;
            result.m[1] = s;
            result.m[4] = -s;
            result.m[5] = c;
            return result;
        };
        Matrix.RotationAxis = function (axis, angle) {
            var s = Math.sin(-angle);
            var c = Math.cos(-angle);
            var c1 = 1 - c;
            axis.normalize();
            var result = Matrix.Zero();
            result.m[0] = (axis.x * axis.x) * c1 + c;
            result.m[1] = (axis.x * axis.y) * c1 - (axis.z * s);
            result.m[2] = (axis.x * axis.z) * c1 + (axis.y * s);
            result.m[3] = 0.0;
            result.m[4] = (axis.y * axis.x) * c1 + (axis.z * s);
            result.m[5] = (axis.y * axis.y) * c1 + c;
            result.m[6] = (axis.y * axis.z) * c1 - (axis.x * s);
            result.m[7] = 0.0;
            result.m[8] = (axis.z * axis.x) * c1 - (axis.y * s);
            result.m[9] = (axis.z * axis.y) * c1 + (axis.x * s);
            result.m[10] = (axis.z * axis.z) * c1 + c;
            result.m[11] = 0.0;
            result.m[15] = 1.0;
            return result;
        };
        Matrix.RotationYawPitchRoll = function (yaw, pitch, roll) {
            return Matrix.RotationZ(roll).multiply(Matrix.RotationX(pitch)).multiply(Matrix.RotationY(yaw));
        };
        Matrix.Scaling = function (x, y, z) {
            var result = Matrix.Zero();
            result.m[0] = x;
            result.m[5] = y;
            result.m[10] = z;
            result.m[15] = 1.0;
            return result;
        };
        Matrix.Translation = function (x, y, z) {
            var result = Matrix.Identity();
            result.m[12] = x;
            result.m[13] = y;
            result.m[14] = z;
            return result;
        };
        Matrix.LookAtLH = function (eye, target, up) {
            var zAxis = target.subtract(eye);
            zAxis.normalize();
            var xAxis = Vector3.Cross(up, zAxis);
            xAxis.normalize();
            var yAxis = Vector3.Cross(zAxis, xAxis);
            yAxis.normalize();
            var ex = -Vector3.Dot(xAxis, eye);
            var ey = -Vector3.Dot(yAxis, eye);
            var ez = -Vector3.Dot(zAxis, eye);
            return Matrix.FromValues(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, ex, ey, ez, 1);
        };
        Matrix.PerspectiveLH = function (width, height, znear, zfar) {
            var matrix = Matrix.Zero();
            matrix.m[0] = (2.0 * znear) / width;
            matrix.m[1] = matrix.m[2] = matrix.m[3] = 0.0;
            matrix.m[5] = (2.0 * znear) / height;
            matrix.m[4] = matrix.m[6] = matrix.m[7] = 0.0;
            matrix.m[10] = -zfar / (znear - zfar);
            matrix.m[8] = matrix.m[9] = 0.0;
            matrix.m[11] = 1.0;
            matrix.m[12] = matrix.m[13] = matrix.m[15] = 0.0;
            matrix.m[14] = (znear * zfar) / (znear - zfar);
            return matrix;
        };
        Matrix.PerspectiveFovLH = function (fov, aspect, znear, zfar) {
            var matrix = Matrix.Zero();
            var tan = 1.0 / (Math.tan(fov * 0.5));
            matrix.m[0] = tan / aspect;
            matrix.m[1] = matrix.m[2] = matrix.m[3] = 0.0;
            matrix.m[5] = tan;
            matrix.m[4] = matrix.m[6] = matrix.m[7] = 0.0;
            matrix.m[8] = matrix.m[9] = 0.0;
            matrix.m[10] = -zfar / (znear - zfar);
            matrix.m[11] = 1.0;
            matrix.m[12] = matrix.m[13] = matrix.m[15] = 0.0;
            matrix.m[14] = (znear * zfar) / (znear - zfar);
            return matrix;
        };
        Matrix.Transpose = function (matrix) {
            var result = new Matrix();
            result.m[0] = matrix.m[0];
            result.m[1] = matrix.m[4];
            result.m[2] = matrix.m[8];
            result.m[3] = matrix.m[12];
            result.m[4] = matrix.m[1];
            result.m[5] = matrix.m[5];
            result.m[6] = matrix.m[9];
            result.m[7] = matrix.m[13];
            result.m[8] = matrix.m[2];
            result.m[9] = matrix.m[6];
            result.m[10] = matrix.m[10];
            result.m[11] = matrix.m[14];
            result.m[12] = matrix.m[3];
            result.m[13] = matrix.m[7];
            result.m[14] = matrix.m[11];
            result.m[15] = matrix.m[15];
            return result;
        };
        return Matrix;
    }());
    BABYLON.Matrix = Matrix;
})(BABYLON || (BABYLON = {}));
// <reference path="./lib/babylon.math.ts"/>
var mesh3D;
(function (mesh3D) {
    var Mesh = (function () {
        function Mesh(name, verticesCount, facesCount) {
            this.name = name;
            this.Vertices = new Array(verticesCount);
            this.Faces = new Array(facesCount);
            this.Rotation = BABYLON.Vector3.Zero();
            this.Position = BABYLON.Vector3.Zero();
        }
        return Mesh;
    }());
    mesh3D.Mesh = Mesh;
})(mesh3D || (mesh3D = {}));
var mesh3D;
(function (mesh3D) {
    function CreateMeshesFromJSON(jsonObject) {
        var meshes = [];
        for (var meshIndex = 0; meshIndex < jsonObject.meshes.length; meshIndex++) {
            var mesh = createMesh(jsonObject.meshes[meshIndex]);
            mesh.Position = getBlenderPosition(jsonObject, meshIndex);
            meshes.push(mesh);
        }
        return meshes;
    }
    mesh3D.CreateMeshesFromJSON = CreateMeshesFromJSON;
    function createMesh(meshJson) {
        var verticesArray = meshJson.vertices;
        var indicesArray = meshJson.indices;
        var verticesStep = getverticesStepIndex(meshJson);
        var verticesCount = verticesArray.length / verticesStep;
        var facesCount = indicesArray.length / 3;
        var mesh = new mesh3D.Mesh(meshJson.name, verticesCount, facesCount);
        fillingFaces(mesh, indicesArray);
        fillingVertices(mesh, verticesArray, verticesStep);
        return mesh;
    }
    function getBlenderPosition(jsonObject, meshIndex) {
        var position = jsonObject.meshes[meshIndex].position;
        return new BABYLON.Vector3(position[0], position[1], position[2]);
    }
    // Depending of the number of texture's coordinates per vertex
    // we're jumping in the vertices array  by 6, 8 & 10 windows frame
    function getverticesStepIndex(meshJson) {
        switch (meshJson.uvCount) {
            case 0:
                return 6;
            case 1:
                return 8;
            case 2:
                return 10;
            default:
                return 1;
        }
    }
    function fillingFaces(mesh, indicesArray) {
        // number of faces is logically the size of the array divided by 3 (A, B, C)
        for (var index = 0, facesCount = indicesArray.length / 3; index < facesCount; index++) {
            var a = indicesArray[index * 3];
            var b = indicesArray[index * 3 + 1];
            var c = indicesArray[index * 3 + 2];
            mesh.Faces[index] = {
                A: a,
                B: b,
                C: c
            };
        }
    }
    function fillingVertices(mesh, verticesArray, verticesStep) {
        for (var index = 0, verticesCount = verticesArray.length / verticesStep; index < verticesCount; index++) {
            var x = verticesArray[index * verticesStep];
            var y = verticesArray[index * verticesStep + 1];
            var z = verticesArray[index * verticesStep + 2];
            mesh.Vertices[index] = new BABYLON.Vector3(x, y, z);
        }
    }
})(mesh3D || (mesh3D = {}));
var mesh3D;
(function (mesh3D) {
    var Utils;
    (function (Utils) {
        function LoadJSONFileAsync(fileName, callback) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", fileName, true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var jsonObject = JSON.parse(xmlhttp.responseText);
                    callback(mesh3D.CreateMeshesFromJSON(jsonObject));
                }
            };
            xmlhttp.send(null);
        }
        Utils.LoadJSONFileAsync = LoadJSONFileAsync;
    })(Utils = mesh3D.Utils || (mesh3D.Utils = {}));
})(mesh3D || (mesh3D = {}));
var Utils;
(function (Utils) {
    function _isMesh(object) {
        return object instanceof mesh3D.Mesh;
    }
    Utils._isMesh = _isMesh;
    function _isArray(object) {
        return object instanceof Array;
    }
    Utils._isArray = _isArray;
    function _CallCallbackForEachArgument(arg, callback) {
        for (var i = 0; i < arg.length; i++) {
            callback.call(this, arg[i]);
        }
        return arg.length > 1;
    }
    Utils._CallCallbackForEachArgument = _CallCallbackForEachArgument;
})(Utils || (Utils = {}));
/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */
WebGLUtils = function () {
    /**
     * Creates the HTLM for a failure message
     * @param {string} canvasContainerId id of container of th
     *        canvas.
     * @return {string} The html.
     */
    var makeFailHTML = function (msg) {
        return '' +
            '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
            '<td align="center">' +
            '<div style="display: table-cell; vertical-align: middle;">' +
            '<div style="">' + msg + '</div>' +
            '</div>' +
            '</td></tr></table>';
    };
    /**
     * Mesasge for getting a webgl browser
     * @type {string}
     */
    var GET_A_WEBGL_BROWSER = '' +
        'This page requires a browser that supports WebGL.<br/>' +
        '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';
    /**
     * Mesasge for need better hardware
     * @type {string}
     */
    var OTHER_PROBLEM = '' +
        "It doesn't appear your computer can support WebGL.<br/>" +
        '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';
    /**
     * Creates a webgl context. If creation fails it will
     * change the contents of the container of the <canvas>
     * tag to an error message with the correct links for WebGL.
     * @param {Element} canvas. The canvas element to create a
     *     context from.
     * @param {WebGLContextCreationAttirbutes} opt_attribs Any
     *     creation attributes you want to pass in.
     * @return {WebGLRenderingContext} The created context.
     */
    var setupWebGL = function (canvas, opt_attribs) {
        function showLink(str) {
            var container = canvas.parentNode;
            if (container) {
                container.innerHTML = makeFailHTML(str);
            }
        }
        ;
        if (!window.WebGLRenderingContext) {
            showLink(GET_A_WEBGL_BROWSER);
            return null;
        }
        var context = create3DContext(canvas, opt_attribs);
        if (!context) {
            showLink(OTHER_PROBLEM);
        }
        return context;
    };
    /**
     * Creates a webgl context.
     * @param {!Canvas} canvas The canvas tag to get context
     *     from. If one is not passed in one will be created.
     * @return {!WebGLContext} The created context.
     */
    var create3DContext = function (canvas, opt_attribs) {
        var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        var context = null;
        for (var ii = 0; ii < names.length; ++ii) {
            try {
                context = canvas.getContext(names[ii], opt_attribs);
            }
            catch (e) { }
            if (context) {
                break;
            }
        }
        return context;
    };
    return {
        create3DContext: create3DContext,
        setupWebGL: setupWebGL
    };
}();
/**
 * Provides requestAnimationFrame in a cross browser way.
 */
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();
/**
 * Provides cancelAnimationFrame in a cross browser way.
 */
window.cancelAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        window.clearTimeout;
})();

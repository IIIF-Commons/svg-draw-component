// svg-draw-component v1.0.1 https://github.com/sdellis/svg-draw-component#readme
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.svgDrawComponent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){








var IIIFComponents;
(function (IIIFComponents) {
    var ImageSubject = (function () {
        function ImageSubject(target) {
            this.imgID = target;
            this._$wrapper = $('<div><canvas id="canvas-1" class="paper"></canvas></div>');
        }
        ImageSubject.prototype.freeze = function () {
            console.log("Image frozen!");
        };
        ImageSubject.prototype.addBackground = function (svgDrawPaper) {
            this.raster = new svgDrawPaper.Raster(this.imgID);
            svgDrawPaper.view.viewSize.width = this.raster.width;
            svgDrawPaper.view.viewSize.height = this.raster.height;
            this.raster.position = svgDrawPaper.view.center;
        };
        ImageSubject.prototype.getSubjectType = function () {
            return new IIIFComponents.SubjectType('image');
        };
        return ImageSubject;
    }());
    IIIFComponents.ImageSubject = ImageSubject;
})(IIIFComponents || (IIIFComponents = {}));
(function (w) {
    if (!w._Components) {
        w._Components = _Components;
    }
})(window);

var IIIFComponents;
(function (IIIFComponents) {
    var OSDSubject = (function () {
        function OSDSubject(target) {
            console.log(target);
            var _this = this;
            this._$wrapper = $('<div><canvas id="canvas-1" class="paper"></canvas></div>');
            this.viewer = new OpenSeadragon(target);
            this.viewer.addHandler("open", function () {
                _this.addOverlay();
                _this.addTools();
            });
        }
        OSDSubject.prototype.freeze = function () {
            console.log("OSD frozen!");
        };
        OSDSubject.prototype.addBackground = function (svgDrawPaper) {
            console.log("OSD addBackground!");
        };
        OSDSubject.prototype.getSubjectType = function () {
            return new IIIFComponents.SubjectType('openseadragon');
        };
        OSDSubject.prototype.addOverlay = function () {
            var element = document.getElementById('canvas-1');
            var rect = new OpenSeadragon.Rect(0, 0, 1, this.viewer.viewport.getAspectRatio() + .07);
            this.viewer.addOverlay({
                element: element,
                location: rect
            });
            paper.view.viewSize.width = $("#canvas-1").width();
            paper.view.viewSize.height = $("#canvas-1").height();
        };
        OSDSubject.prototype.addTools = function () {
            var _this = this;
            $(document).ready(function () {
                $('#toolbar').append($('<li><button id="drawmode">draw mode (off)</button></li>'));
                $("#drawmode").on("click", function () {
                    if (_this.viewer.isMouseNavEnabled() === true) {
                        _this.viewer.setMouseNavEnabled(false);
                        $(this).text('draw mode (on)');
                    }
                    else {
                        _this.viewer.setMouseNavEnabled(true);
                        $(this).text('draw mode (off)');
                    }
                    return false;
                });
            });
        };
        return OSDSubject;
    }());
    IIIFComponents.OSDSubject = OSDSubject;
})(IIIFComponents || (IIIFComponents = {}));
(function (w) {
    if (!w._Components) {
        w._Components = _Components;
    }
})(window);

var IIIFComponents;
(function (IIIFComponents) {
    var StringValue = (function () {
        function StringValue(value) {
            this.value = "";
            if (value) {
                this.value = value.toLowerCase();
            }
        }
        StringValue.prototype.toString = function () {
            return this.value;
        };
        return StringValue;
    }());
    IIIFComponents.StringValue = StringValue;
})(IIIFComponents || (IIIFComponents = {}));

var IIIFComponents;
(function (IIIFComponents) {
    var Subject = (function () {
        function Subject(target) {
            this._$wrapper = $('<div><canvas id="canvas-1" class="paper"></canvas></div>');
        }
        Subject.prototype.addBackground = function (svgDrawPaper) {
            console.log("Default addBackground!");
        };
        Subject.prototype.freeze = function () {
            console.log("default frozen!");
        };
        Subject.prototype.getSubjectType = function () {
            return new IIIFComponents.SubjectType('');
        };
        return Subject;
    }());
    IIIFComponents.Subject = Subject;
})(IIIFComponents || (IIIFComponents = {}));
(function (w) {
    if (!w._Components) {
        w._Components = _Components;
    }
})(window);

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IIIFComponents;
(function (IIIFComponents) {
    var SubjectType = (function (_super) {
        __extends(SubjectType, _super);
        function SubjectType() {
            _super.apply(this, arguments);
        }
        // todo: use getters when ES3 target is no longer required.
        SubjectType.prototype.default = function () {
            return new SubjectType(SubjectType.DEFAULT.toString());
        };
        SubjectType.prototype.image = function () {
            return new SubjectType(SubjectType.IMAGE.toString());
        };
        SubjectType.prototype.openseadragon = function () {
            return new SubjectType(SubjectType.OPENSEADRAGON.toString());
        };
        SubjectType.DEFAULT = new SubjectType("");
        SubjectType.IMAGE = new SubjectType("image");
        SubjectType.OPENSEADRAGON = new SubjectType("openseadragon");
        return SubjectType;
    }(IIIFComponents.StringValue));
    IIIFComponents.SubjectType = SubjectType;
})(IIIFComponents || (IIIFComponents = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IIIFComponents;
(function (IIIFComponents) {
    var SvgDrawComponent = (function (_super) {
        __extends(SvgDrawComponent, _super);
        function SvgDrawComponent(options) {
            _super.call(this, options);
            this._init();
            this._resize();
            this._hitOptions = {
                segments: true,
                stroke: true,
                fill: true,
                tolerance: 5
            };
        }
        SvgDrawComponent.prototype._init = function () {
            var success = _super.prototype._init.call(this);
            var raster;
            if (!success) {
                console.error("Component failed to initialise");
            }
            switch (this.options.subjectType.toString()) {
                case 'openseadragon':
                    this.subject = new IIIFComponents.OSDSubject(this.options.subject);
                    break;
                case 'image':
                    this.subject = new IIIFComponents.ImageSubject(this.options.subject);
                    break;
                default:
                    this.subject = new IIIFComponents.Subject(this.options.subject);
            }
            this._$wrapper = this.subject._$wrapper;
            this._$canvas = this._$wrapper.find('#canvas-1');
            this._$element.append(this._$wrapper);
            this.paperSetup(this._$canvas[0]);
            this.addToolbar();
            return success;
        };
        SvgDrawComponent.prototype.debug = function () {
            this._emit(SvgDrawComponent.Events.DEBUG, this.options.subjectType);
        };
        SvgDrawComponent.prototype.pathComplete = function (msg) {
            this._emit(SvgDrawComponent.Events.SHAPECOMPLETE, msg);
        };
        SvgDrawComponent.prototype.addToolbar = function () {
            var _this = this;
            var tools = [
                $('<li><button id="selectTool">Select</button></li>'),
                $('<li><button id="lineTool">Lines</button></li>'),
                $('<li><button id="cloudTool">Clouds</button></li>'),
                $('<li><button id="rectTool">Rect</button></li>')
            ];
            this._$toolbarDiv = $('<div id="toolbarDiv" class="toolbar"/>');
            this._$toolbar = $('<ul id="toolbar"/>');
            this._$toolbar.append(tools);
            this._$toolbarDiv.append(this._$toolbar);
            this._$element.after(this._$toolbarDiv);
            $("button").on("click", function (e) {
                switch (e.target.id) {
                    case 'selectTool':
                        _this.svgDrawPaper.selectTool.activate();
                        break;
                    case 'lineTool':
                        _this.svgDrawPaper.lineTool.activate();
                        break;
                    case 'cloudTool':
                        _this.svgDrawPaper.cloudTool.activate();
                        break;
                    case 'rectTool':
                        _this.svgDrawPaper.rectTool.activate();
                        break;
                    default:
                        _this.svgDrawPaper.selectTool.activate();
                }
            });
        };
        SvgDrawComponent.prototype.paperSetup = function (el) {
            var path, segment, line, cloud, start;
            var rectangle = null;
            var movePath = false;
            var _this = this;
            this.svgDrawPaper = new paper.PaperScope();
            this.svgDrawPaper.setup(el);
            this.subject.addBackground(this.svgDrawPaper);
            //todo: add bg to separate layer, move to back, and lock it
            ////// S E L E C T   T O O L ////////////
            this.svgDrawPaper.selectTool = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.selectTool.onMouseDown = function (event) {
                segment = path = null;
                var hitResult = _this.svgDrawPaper.project.hitTest(event.point, _this._hitOptions);
                if (!hitResult)
                    return;
                if (event.modifiers.shift) {
                    if (hitResult.type == 'segment') {
                        hitResult.segment.remove();
                    }
                    ;
                    return;
                }
                if (hitResult) {
                    path = hitResult.item;
                    if (hitResult.type == 'segment') {
                        segment = hitResult.segment;
                    }
                    else if (hitResult.type == 'stroke') {
                        var location = hitResult.location;
                        segment = path.insert(location.index + 1, event.point);
                        path.smooth();
                    }
                }
                movePath = hitResult.type == 'fill';
                if (movePath)
                    _this.svgDrawPaper.project.activeLayer.addChild(hitResult.item);
            };
            this.svgDrawPaper.selectTool.onMouseMove = function (event) {
                _this.svgDrawPaper.project.activeLayer.selected = false;
                if (event.item)
                    event.item.selected = true;
            };
            this.svgDrawPaper.selectTool.onMouseDrag = function (event) {
                if (segment) {
                    segment.point += event.delta;
                    path.smooth();
                }
                else if (path) {
                    path.position += event.delta;
                }
            };
            ////// S T R A I G H T  L I N E S ////////////
            this.svgDrawPaper.lineTool = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.lineTool.onMouseDown = function (event) {
                line = new _this.svgDrawPaper.Path();
                line.strokeColor = 'red';
                line.fillColor = 'white';
                line.opacity = 0.5;
                line.add(event.point);
            };
            this.svgDrawPaper.lineTool.onMouseDrag = function (event) {
                line.add(event.point);
            };
            this.svgDrawPaper.lineTool.onMouseUp = function (event) {
                line.closed = true;
                line.smooth();
                var lineCopy = line.clone();
                // todo: emit _this.pathComplete() event
                line.remove();
            };
            ////// C L O U D Y  L I N E S ////////////
            this.svgDrawPaper.cloudTool = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.cloudTool.minDistance = 20;
            this.svgDrawPaper.cloudTool.onMouseDown = function (event) {
                cloud = new _this.svgDrawPaper.Path();
                cloud.strokeColor = 'red';
                cloud.fillColor = 'white';
                cloud.opacity = 0.5;
                cloud.add(event.point);
            };
            this.svgDrawPaper.cloudTool.onMouseDrag = function (event) {
                // Use the arcTo command to draw cloudy lines
                cloud.arcTo(event.point);
            };
            this.svgDrawPaper.cloudTool.onMouseUp = function (event) {
                cloud.closed = true;
                var cloudCopy = cloud.clone();
                // todo: emit _this.pathComplete() event
                cloud.remove();
            };
            ////// R E C T A N G L E ////////////
            this.svgDrawPaper.rectTool = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.rectTool.onMouseDrag = function (event) {
                if (rectangle) {
                    rectangle.remove();
                }
                drawRect(event.downPoint, event.point);
            };
            this.svgDrawPaper.rectTool.onMouseUp = function (event) {
                var rectCopy = rectangle.clone();
                _this.pathComplete({ 'type': 'rect',
                    'data': { 'x': rectangle.bounds.x,
                        'y': rectangle.bounds.y,
                        'h': rectangle.bounds.height,
                        'w': rectangle.bounds.width }
                });
                rectangle.remove();
            };
            function drawRect(start, end) {
                var rect = new _this.svgDrawPaper.Rectangle(start, end);
                rectangle = new _this.svgDrawPaper.Path.Rectangle(rect);
                rectangle.strokeColor = 'red';
                rectangle.fillColor = 'white';
                rectangle.opacity = 0.5;
            }
        };
        SvgDrawComponent.prototype._getDefaultOptions = function () {
            return {
                overlayType: 'img'
            };
        };
        SvgDrawComponent.prototype._resize = function () {
        };
        return SvgDrawComponent;
    }(_Components.BaseComponent));
    IIIFComponents.SvgDrawComponent = SvgDrawComponent;
})(IIIFComponents || (IIIFComponents = {}));
var IIIFComponents;
(function (IIIFComponents) {
    var SvgDrawComponent;
    (function (SvgDrawComponent) {
        var Events = (function () {
            function Events() {
            }
            Events.DEBUG = 'debug';
            Events.SHAPECOMPLETE = 'shapeComplete';
            return Events;
        }());
        SvgDrawComponent.Events = Events;
    })(SvgDrawComponent = IIIFComponents.SvgDrawComponent || (IIIFComponents.SvgDrawComponent = {}));
})(IIIFComponents || (IIIFComponents = {}));
(function (w) {
    if (!w.IIIFComponents) {
        w.IIIFComponents = IIIFComponents;
    }
    else {
        w.IIIFComponents.SvgDrawComponent = IIIFComponents.SvgDrawComponent;
    }
})(window);

},{}]},{},[1])(1)
});
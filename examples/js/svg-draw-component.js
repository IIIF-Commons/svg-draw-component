// svg-draw-component v1.0.1 https://github.com/sdellis/svg-draw-component#readme
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.svgDrawComponent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){








var IIIFComponents;
(function (IIIFComponents) {
    var ImageSubject = (function () {
        function ImageSubject(target) {
            this.imgID = target;
            this.$wrapper = $('<div><canvas id="canvas-1" class="paper" resize="true"></canvas></div>');
        }
        ImageSubject.prototype.freeze = function () {
            console.log("Image frozen!");
        };
        ImageSubject.prototype.addBackground = function (svgDrawPaper) {
            var _this = this;
            this.raster = new svgDrawPaper.Raster(this.imgID);
            this.raster.onLoad = function () {
                console.log('The image has finished loading.');
                $('.paper').css('width', _this.raster.width + 'px');
                $('.paper').css('height', _this.raster.height + 'px');
                svgDrawPaper.view.viewSize.width = _this.raster.width;
                svgDrawPaper.view.viewSize.height = _this.raster.height;
                _this.raster.position = svgDrawPaper.view.center;
            };
        };
        ImageSubject.prototype.getSubjectType = function () {
            return IIIFComponents.SubjectType.IMAGE;
        };
        return ImageSubject;
    }());
    IIIFComponents.ImageSubject = ImageSubject;
})(IIIFComponents || (IIIFComponents = {}));

var IIIFComponents;
(function (IIIFComponents) {
    var OSDSubject = (function () {
        function OSDSubject(target) {
            console.log(target);
            var _this = this;
            this.$wrapper = $('<div><canvas id="canvas-1" class="paper"></canvas></div>');
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
            return IIIFComponents.SubjectType.OPENSEADRAGON;
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
            $(function () {
                $('#toolbar').append($('<li><button id="drawmode">draw mode (off)</button></li>'));
                $('#drawmode').on('click', function (e) {
                    if (_this.viewer.isMouseNavEnabled() === true) {
                        _this.viewer.setMouseNavEnabled(false);
                        $(e.target).text('draw mode (on)');
                    }
                    else {
                        _this.viewer.setMouseNavEnabled(true);
                        $(e.target).text('draw mode (off)');
                    }
                    return false;
                });
            });
        };
        return OSDSubject;
    }());
    IIIFComponents.OSDSubject = OSDSubject;
})(IIIFComponents || (IIIFComponents = {}));

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
            this.$wrapper = $('<div><canvas id="canvas-1" class="paper"></canvas></div>');
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
                segments: false,
                stroke: false,
                fill: true,
                tolerance: 5,
                class: paper.Path
            };
        }
        SvgDrawComponent.prototype._init = function () {
            var success = _super.prototype._init.call(this);
            var raster;
            if (!success) {
                console.error("Component failed to initialise");
            }
            switch (this.options.subjectType.toString()) {
                case IIIFComponents.SubjectType.OPENSEADRAGON.toString():
                    this.subject = new IIIFComponents.OSDSubject(this.options.subject);
                    break;
                case IIIFComponents.SubjectType.IMAGE.toString():
                    this.subject = new IIIFComponents.ImageSubject(this.options.subject);
                    break;
                default:
                    this.subject = new IIIFComponents.Subject(this.options.subject);
            }
            this._$wrapper = this.subject.$wrapper;
            this._$canvas = this._$wrapper.find('#canvas-1');
            this._$element.append(this._$wrapper);
            this.paperSetup(this._$canvas[0]);
            this.addToolbar();
            return success;
        };
        SvgDrawComponent.prototype.debug = function () {
            this._emit(SvgDrawComponent.Events.DEBUG, this.options.subjectType);
        };
        SvgDrawComponent.prototype.pathCompleted = function (shape) {
            var payload = {};
            var media_fragment_coords = null;
            var $svg = $("<svg xmlns='http://www.w3.org/2000/svg'/>");
            var $shape = $(shape.exportSVG({ matchShapes: true }));
            $svg.append($shape);
            shape.name = $shape[0].tagName + "_" + shape._id;
            if ($shape[0].tagName === 'rect' && shape.rotation === 0) {
                media_fragment_coords = {
                    'x': shape.bounds.x,
                    'y': shape.bounds.y,
                    'h': shape.bounds.height,
                    'w': shape.bounds.width
                };
            }
            payload = {
                'name': shape.name,
                'media_fragment_coords': media_fragment_coords,
                'svg': $svg[0].outerHTML
            };
            this._emit(SvgDrawComponent.Events.SHAPECOMPLETED, payload);
        };
        SvgDrawComponent.prototype.pathUpdated = function (shape) {
            var payload = {};
            var media_fragment_coords = null;
            var $svg = $("<svg xmlns='http://www.w3.org/2000/svg'/>");
            var $shape = $(shape.exportSVG({ matchShapes: true }));
            $svg.append($shape);
            if ($shape[0].tagName === 'rect' && shape.rotation === 0) {
                media_fragment_coords = {
                    'x': shape.bounds.x,
                    'y': shape.bounds.y,
                    'h': shape.bounds.height,
                    'w': shape.bounds.width
                };
            }
            payload = {
                'name': shape.name,
                'media_fragment_coords': media_fragment_coords,
                'svg': $svg[0].outerHTML
            };
            this._emit(SvgDrawComponent.Events.SHAPEUPDATED, payload);
        };
        SvgDrawComponent.prototype.pathDeleted = function (shape) {
            var payload = { 'name': shape.name };
            this._emit(SvgDrawComponent.Events.SHAPEDELETED, payload);
        };
        SvgDrawComponent.prototype.addToolbar = function () {
            var _this = this;
            var tools = [
                //$('<li><button id="selectTool">Select</button></li>'),
                $('<li class="tool-btn"><input id="pointTool" type="radio" name="toolbar" checked><label for="pointTool"><i class="fa fa-fw fa-map-pin"></i></label></li>'),
                $('<li class="tool-btn"><input id="lineTool" type="radio" name="toolbar" checked><label for="lineTool"><i class="fa fa-fw fa-pencil"></i></label></li>'),
                $('<li class="tool-btn"><input id="cloudTool" type="radio" name="toolbar" checked><label for="cloudTool"><i class="fa fa-fw fa-cloud"></i></label></li>'),
                $('<li class="tool-btn"><input id="rectTool" type="radio" name="toolbar" checked><label for="rectTool"><i class="fa fa-fw fa-pencil-square"></i></label></li>'),
                $('<li class="separator"></li>'),
                $('<li class="tool-btn"><input id="selectTool" type="radio" name="toolbar" checked><label for="selectTool"><i class="fa fa-fw fa-arrows"></i></label></li>'),
            ];
            this._$toolbarDiv = $('<div class="toolbar toolbar-tools">');
            this._$toolbarCtrl = $('<div class="ctrl ctrl-tools">Tools</div>');
            this._$toolbar = $('<ul class="tools">');
            this._$toolbar.append(tools);
            this._$toolbarDiv.append(this._$toolbarCtrl);
            this._$toolbarDiv.append(this._$toolbar);
            this._$element.after(this._$toolbarDiv);
            $('.toolbar').draggable({ handle: ".ctrl" });
            $('.ctrl-layers').on("dblclick", function () {
                $('.toolbar-layers').toggleClass('minToolbar');
            });
            $('.ctrl-tools').on("dblclick", function () {
                $('.toolbar-tools').toggleClass('minToolbar');
            });
            $('input').on('click', function (e) {
                switch (e.target.id) {
                    case 'selectTool':
                        _this.svgDrawPaper.selectTool.activate();
                        break;
                    case 'pointTool':
                        _this.svgDrawPaper.pointTool.activate();
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
        SvgDrawComponent.prototype.importSVG = function (svg) {
            this.svgDrawPaper.project.activeLayer.importSVG(svg, this._emit(SvgDrawComponent.Events.SVGLOADED, true));
        };
        SvgDrawComponent.prototype.layers = function (name) {
            if (name)
                return this.svgDrawPaper.project.layers[name];
            else
                return this.svgDrawPaper.project.layers;
        };
        SvgDrawComponent.prototype.addLayer = function (name) {
            var layer;
            if (name) {
                layer = new this.svgDrawPaper.Layer({ 'name': name });
            }
            else {
                layer = new this.svgDrawPaper.Layer();
            }
            return layer;
        };
        SvgDrawComponent.prototype.paperSetup = function (el) {
            var path, point, line, cloud, rectangle;
            var dragging = false;
            var _this = this;
            this.svgDrawPaper = new paper.PaperScope();
            this.svgDrawPaper.setup(el);
            this.subject.addBackground(this.svgDrawPaper);
            this.svgDrawPaper.project.activeLayer.name = 'bg';
            var bgLayer = this.svgDrawPaper.project.activeLayer;
            bgLayer.locked = true;
            var drawLayer = new this.svgDrawPaper.Layer();
            drawLayer.name = 'drawlayer';
            ////// S E L E C T   T O O L ////////////
            this.svgDrawPaper.selectTool = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.selectTool.onMouseDown = function (event) {
                _this.svgDrawPaper.project.activeLayer.selected = false;
                if (event.item) {
                    event.item.selected = true;
                }
            };
            this.svgDrawPaper.selectTool.onMouseDrag = function (event) {
                if (event.item) {
                    dragging = true;
                    event.item.position.x += event.delta.x;
                    event.item.position.y += event.delta.y;
                }
            };
            this.svgDrawPaper.selectTool.onMouseUp = function (event) {
                if (event.item) {
                    if (dragging) {
                        dragging = false;
                        _this.pathUpdated(event.item); // fire update event
                    }
                }
            };
            this.svgDrawPaper.selectTool.onKeyUp = function (event) {
                if (event.key == 'backspace') {
                    var selected = _this.svgDrawPaper.project.selectedItems;
                    for (var i = 0; i < selected.length; i++) {
                        var item = selected[i];
                        // todo: allow other components to confirm delete?
                        _this.pathDeleted(item); // fire delete event
                        item.remove();
                    }
                    return false;
                }
            };
            ////// P O I N T S ////////////
            this.svgDrawPaper.pointTool = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.pointTool.onMouseDown = function (event) {
                point = new _this.svgDrawPaper.Path.Circle(event.point, 10);
                point.strokeColor = 'red';
                point.fillColor = 'white';
                point.opacity = 0.5;
            };
            this.svgDrawPaper.pointTool.onMouseUp = function (event) {
                var pointCopy = point.clone();
                pointCopy.selected = true;
                //_this.svgDrawPaper.selectTool.activate();
                _this.pathCompleted(pointCopy); // fire event
                point.remove();
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
                line.simplify();
                var lineCopy = line.clone();
                lineCopy.selected = true;
                //_this.svgDrawPaper.selectTool.activate();
                _this.pathCompleted(lineCopy); // fire event
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
                cloudCopy.selected = true;
                //_this.svgDrawPaper.selectTool.activate();
                _this.pathCompleted(cloudCopy); // fire event
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
                rectCopy.selected = true;
                //_this.svgDrawPaper.selectTool.activate();
                _this.pathCompleted(rectCopy);
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
                subject: {},
                subjectType: IIIFComponents.SubjectType.DEFAULT.toString()
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
            Events.SHAPECOMPLETED = 'shapeCompleted';
            Events.SHAPEUPDATED = 'shapeUpdated';
            Events.SHAPEDELETED = 'shapeDeleted';
            Events.SVGLOADED = 'svgLoaded';
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
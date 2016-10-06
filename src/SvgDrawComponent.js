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
                case SubjectType.OPENSEADRAGON.toString():
                    this.subject = new OSDSubject(this.options.subject);
                    break;
                case SubjectType.IMAGE.toString():
                    this.subject = new ImageSubject(this.options.subject);
                    break;
                default:
                    this.subject = new Subject(this.options.subject);
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
                $('<li class="tool-btn"><input id="pointTool" type="radio" name="toolbar" checked><label for="pointTool"><i class="fa fa-fw fa-map-pin"></i></label></li>'),
                $('<li class="tool-btn"><input id="lineTool" type="radio" name="toolbar" checked><label for="lineTool"><i class="fa fa-fw fa-pencil"></i></label></li>'),
                $('<li class="tool-btn"><input id="cloudTool" type="radio" name="toolbar" checked><label for="cloudTool"><i class="fa fa-fw fa-cloud"></i></label></li>'),
                $('<li class="tool-btn"><input id="rectTool" type="radio" name="toolbar" checked><label for="rectTool"><i class="fa fa-fw fa-pencil-square"></i></label></li>'),
                $('<li class="separator"></li>'),
                $('<li class="tool-btn"><input id="selectTool" type="radio" name="toolbar" checked><label for="selectTool"><i class="fa fa-fw fa-arrows"></i></label></li>'),
            ];
            this._$toolbarDiv = $('<div id="toolbarDiv" class="toolbar"/>');
            this._$toolbar = $('<ul class="tools">');
            this._$toolbar.append(tools);
            this._$toolbarDiv.append(this._$toolbar);
            this._$element.after(this._$toolbarDiv);
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
                        _this.pathUpdated(event.item);
                    }
                }
            };
            this.svgDrawPaper.selectTool.onKeyUp = function (event) {
                if (event.key == 'backspace') {
                    var selected = _this.svgDrawPaper.project.selectedItems;
                    for (var i = 0; i < selected.length; i++) {
                        var item = selected[i];
                        _this.pathDeleted(item);
                        item.remove();
                    }
                    return false;
                }
            };
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
                _this.pathCompleted(pointCopy);
                point.remove();
            };
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
                _this.pathCompleted(lineCopy);
                line.remove();
            };
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
                cloud.arcTo(event.point);
            };
            this.svgDrawPaper.cloudTool.onMouseUp = function (event) {
                cloud.closed = true;
                var cloudCopy = cloud.clone();
                cloudCopy.selected = true;
                _this.pathCompleted(cloudCopy);
                cloud.remove();
            };
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
                subjectType: SubjectType.DEFAULT.toString(),
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

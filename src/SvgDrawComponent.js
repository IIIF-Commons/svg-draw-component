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
            $('button').on('click', function (e) {
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
            this.svgDrawPaper.selectTool = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.selectTool.onMouseDown = function (event) {
                _this.svgDrawPaper.project.activeLayer.selected = false;
                if (event.item) {
                    event.item.selected = true;
                }
            };
            this.svgDrawPaper.selectTool.onMouseDrag = function (event) {
                if (event.item) {
                    event.item.position.x += event.delta.x;
                    event.item.position.y += event.delta.y;
                }
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

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
        }
        SvgDrawComponent.prototype._init = function () {
            var success = _super.prototype._init.call(this);
            var raster;
            if (!success) {
                console.error("Component failed to initialise");
            }
            switch (this.options.subjectType.toString()) {
                case 'openseadragon':
                    this.subject = new OSDSubject(this.options.subject);
                    break;
                case 'image':
                    this.subject = new ImageSubject(this.options.subject);
                    break;
                default:
                    this.subject = new Subject(this.options.subject);
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
        SvgDrawComponent.prototype.shapeComplete = function (msg) {
            this._emit(SvgDrawComponent.Events.SHAPECOMPLETE, msg);
        };
        SvgDrawComponent.prototype.addToolbar = function () {
            var _this = this;
            var tools = [
                $('<li><button id="tool1">Lines</button></li>'),
                $('<li><button id="tool2">Clouds</button></li>'),
                $('<li><button id="tool3">Rect</button></li>')
            ];
            this._$toolbarDiv = $('<div id="toolbarDiv" class="toolbar"/>');
            this._$toolbar = $('<ul id="toolbar"/>');
            this._$toolbar.append(tools);
            this._$toolbarDiv.append(this._$toolbar);
            this._$element.after(this._$toolbarDiv);
            $("button").on("click", function (e) {
                switch (e.target.id) {
                    case 'tool1':
                        _this.svgDrawPaper.tool1.activate();
                        break;
                    case 'tool2':
                        _this.svgDrawPaper.tool2.activate();
                        break;
                    case 'tool3':
                        _this.svgDrawPaper.tool3.activate();
                        break;
                    default:
                        _this.svgDrawPaper.tool1.activate();
                }
            });
        };
        SvgDrawComponent.prototype.paperSetup = function (el) {
            var path, start;
            var rectangle = null;
            var _this = this;
            this.svgDrawPaper = new paper.PaperScope();
            this.svgDrawPaper.setup(el);
            this.subject.addBackground(this.svgDrawPaper);
            path = new this.svgDrawPaper.Path();
            function onMouseDown(event) {
                path.strokeColor = 'red';
                path.add(event.point);
            }
            this.svgDrawPaper.tool1 = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.tool1.onMouseDown = onMouseDown;
            this.svgDrawPaper.tool1.onMouseDrag = function (event) {
                path.add(event.point);
            };
            this.svgDrawPaper.tool2 = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.tool2.minDistance = 20;
            this.svgDrawPaper.tool2.onMouseDown = onMouseDown;
            this.svgDrawPaper.tool2.onMouseDrag = function (event) {
                path.arcTo(event.point);
            };
            this.svgDrawPaper.tool3 = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.tool3.onMouseDrag = function (event) {
                if (rectangle) {
                    rectangle.remove();
                }
                drawRect(event.downPoint, event.point);
            };
            function drawRect(start, end) {
                rectangle = new _this.svgDrawPaper.Path.Rectangle(start, end);
                rectangle.strokeColor = 'red';
            }
        };
        SvgDrawComponent.prototype._getDefaultOptions = function () {
            return {
                overlayType: 'img',
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

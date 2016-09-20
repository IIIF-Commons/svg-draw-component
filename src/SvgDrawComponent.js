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
        SvgDrawComponent.prototype.debug = function () {
            this._emit(SvgDrawComponent.Events.DEBUG, this.options.overlayType);
        };
        SvgDrawComponent.prototype.paperSetup = function (msg) {
            $(this._$canvas).css("background-color", "yellow");
            this.mypaper = new paper.PaperScope();
            this.mypaper.setup(this._$canvas);
            this.mypaper.tool1 = new this.mypaper.Tool();
            this.path = new this.mypaper.Path();
            this.path.strokeColor = 'red';
            this.start = new this.mypaper.Point(100, 100);
            this.path.moveTo(this.start);
            this.path.lineTo(this.start.add([200, -50]));
            this.mypaper.view.draw();
            this._emit(SvgDrawComponent.Events.PAPERSETUP, msg);
        };
        SvgDrawComponent.prototype._init = function () {
            var success = _super.prototype._init.call(this);
            if (!success) {
                console.error("Component failed to initialise");
            }
            switch (this.options.overlayType) {
                case 'osd':
                    this._$canvas = $('<canvas id="canvas-1" class="highlight" resize></canvas>');
                    break;
                case 'img':
                    this._$canvas = $('<div class="outsideWrapper"><div class="insideWrapper"><img src="img/floorplan.png" class="coveredImage"><canvas id="canvas-1" class="coveringCanvas"></canvas></div></div>');
                    break;
                default:
                    this._$canvas = $('<canvas id="canvas-1" class="paper"></canvas>');
            }
            this._$element.append(this._$canvas);
            return success;
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
            Events.PAPERSETUP = 'paperSetup';
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

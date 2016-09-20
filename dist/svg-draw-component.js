// svg-draw-component v1.0.1 https://github.com/sdellis/svg-draw-component#readme
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.svgDrawComponent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){




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
        SvgDrawComponent.prototype.shapeComplete = function (msg) {
            this._emit(SvgDrawComponent.Events.SHAPECOMPLETE, msg);
        };
        SvgDrawComponent.prototype.addToolbar = function () {
            var _this = this;
            this._$toolbar = $('<ul/>');
            this._$tool1 = $('<li><button id="tool1">Lines</button></li>');
            this._$tool2 = $('<li><button id="tool2">Clouds</button></li>');
            this._$tool3 = $('<li><button id="tool3">Rect</button></li>');
            this._$toolbar.append([this._$tool1, this._$tool2, this._$tool3]);
            this._$element.append(this._$toolbar);
            $("button").on("click", function (e) {
                switch (e.target.id) {
                    case 'tool1':
                        _this.mypaper.tool1.activate();
                        break;
                    case 'tool2':
                        _this.mypaper.tool2.activate();
                        break;
                    case 'tool3':
                        _this.mypaper.tool3.activate();
                        break;
                    default:
                        _this.mypaper.tool1.activate();
                }
            });
        };
        SvgDrawComponent.prototype.paperSetup = function (el) {
            var path, start;
            var rectangle = null;
            var _this = this;
            this.mypaper = new paper.PaperScope();
            this.mypaper.setup(el);
            path = new this.mypaper.Path();
            function onMouseDown(event) {
                path.strokeColor = 'red';
                path.add(event.point);
            }
            ////// S T R A I G H T  L I N E S ////////////
            this.mypaper.tool1 = new this.mypaper.Tool();
            this.mypaper.tool1.onMouseDown = onMouseDown;
            this.mypaper.tool1.onMouseDrag = function (event) {
                path.add(event.point);
            };
            ////// C L O U D Y  L I N E S ////////////
            this.mypaper.tool2 = new this.mypaper.Tool();
            this.mypaper.tool2.minDistance = 20;
            this.mypaper.tool2.onMouseDown = onMouseDown;
            this.mypaper.tool2.onMouseDrag = function (event) {
                // Use the arcTo command to draw cloudy lines
                path.arcTo(event.point);
            };
            ////// R E C T A N G L E ////////////
            this.mypaper.tool3 = new this.mypaper.Tool();
            this.mypaper.tool3.onMouseDrag = function (event) {
                if (rectangle) {
                    rectangle.remove();
                }
                drawRect(event.downPoint, event.point);
            };
            function drawRect(start, end) {
                rectangle = new _this.mypaper.Path.Rectangle(start, end);
                rectangle.strokeColor = 'red';
            }
        };
        SvgDrawComponent.prototype._init = function () {
            var success = _super.prototype._init.call(this);
            if (!success) {
                console.error("Component failed to initialise");
            }
            switch (this.options.overlayType) {
                case 'osd':
                    this._$wrapper = $('<div><canvas id="canvas-1" class="highlight" resize></canvas></div>');
                    break;
                case 'img':
                    this._$wrapper = $('<div class="outsideWrapper"><div class="insideWrapper"><img src="img/floorplan.png" class="coveredImage"><canvas id="canvas-1" class="coveringCanvas"></canvas></div></div>');
                    break;
                default:
                    this._$wrapper = $('<div><canvas id="canvas-1" class="paper"></canvas></div>');
            }
            this._$canvas = this._$wrapper.find('#canvas-1');
            this._$element.append(this._$wrapper);
            this.paperSetup(this._$canvas[0]);
            this.addToolbar();
            return success;
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
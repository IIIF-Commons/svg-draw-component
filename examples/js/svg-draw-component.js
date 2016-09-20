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
        SvgDrawComponent.prototype.paperSetup = function (msg) {
            $(this._$canvas).css("background-color", "yellow");
            this.mypaper = new paper.PaperScope();
            this.mypaper.setup(this._$canvas);
            this.mypaper.tool1 = new this.mypaper.Tool();
            // Create a Paper.js Path to draw a line into it:
            this.path = new this.mypaper.Path();
            // Give the stroke a color
            this.path.strokeColor = 'red';
            this.start = new this.mypaper.Point(100, 100);
            // Move to start and draw a line from there
            this.path.moveTo(this.start);
            // Note that the plus operator on Point objects does not work
            // in JavaScript. Instead, we need to call the add() function:
            this.path.lineTo(this.start.add([200, -50]));
            // Draw the view now:
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

},{}]},{},[1])(1)
});
// component-boilerplate v1.0.1 https://github.com/viewdir/iiif-tree-component#readme
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.componentBoilerplate = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyComponents;
(function (MyComponents) {
    var ExampleComponent = (function (_super) {
        __extends(ExampleComponent, _super);
        function ExampleComponent(options) {
            _super.call(this, options);
            this._init();
            this._resize();
        }
        ExampleComponent.prototype.test = function () {
            this._emit(ExampleComponent.Events.TEST, [1, 2, 'three']);
        };
        ExampleComponent.prototype._init = function () {
            var success = _super.prototype._init.call(this);
            if (!success) {
                console.error("Component failed to initialise");
            }
            this._$element.append("I am an example component");
            return success;
        };
        ExampleComponent.prototype._getDefaultOptions = function () {
            return {};
        };
        ExampleComponent.prototype._resize = function () {
        };
        return ExampleComponent;
    }(_Components.BaseComponent));
    MyComponents.ExampleComponent = ExampleComponent;
})(MyComponents || (MyComponents = {}));
var MyComponents;
(function (MyComponents) {
    var ExampleComponent;
    (function (ExampleComponent) {
        var Events = (function () {
            function Events() {
            }
            Events.TEST = 'test';
            return Events;
        }());
        ExampleComponent.Events = Events;
    })(ExampleComponent = MyComponents.ExampleComponent || (MyComponents.ExampleComponent = {}));
})(MyComponents || (MyComponents = {}));
(function (w) {
    if (!w.MyComponents) {
        w.MyComponents = MyComponents;
    }
    else {
        w.MyComponents.ExampleComponent = MyComponents.ExampleComponent;
    }
})(window);



},{}]},{},[1])(1)
});
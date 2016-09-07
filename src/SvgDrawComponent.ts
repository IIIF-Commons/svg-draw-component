namespace IIIFComponents {
    export class SvgDrawComponent extends _Components.BaseComponent implements ISvgDrawComponent{

        public options: ISvgDrawComponentOptions;
        private _$canvas: JQuery;
        private _$wrapper: JQuery;

        constructor(options: ISvgDrawComponentOptions) {
            super(options);

            this._init();
            this._resize();
        }

        public debug(): void {
            this._emit(SvgDrawComponent.Events.DEBUG, this.options.overlayType);
        }

        public addPoint(point): void {
            this._emit(SvgDrawComponent.Events.ADDPOINT, point);
        }

        protected _init(): boolean {
            var success: boolean = super._init();

            if (!success){
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
        }


        protected _getDefaultOptions(): ISvgDrawComponentOptions {
            return <ISvgDrawComponentOptions>{
              overlayType: 'img',
            }
        }

        protected _resize(): void {

        }
    }
}

namespace IIIFComponents.SvgDrawComponent {
    export class Events {
        static DEBUG: string = 'debug';
        static ADDPOINT: string = 'addPoint';
    }
}

(function(w) {
    if (!w.IIIFComponents){
        w.IIIFComponents = IIIFComponents;
    } else {
        w.IIIFComponents.SvgDrawComponent = IIIFComponents.SvgDrawComponent;
    }
})(window);

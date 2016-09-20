declare var paper: any;

namespace IIIFComponents {
    export class SvgDrawComponent extends _Components.BaseComponent implements ISvgDrawComponent{

        public options: ISvgDrawComponentOptions;
        private _$canvas: JQuery;
        private _$wrapper: JQuery;
        public mypaper: any;
        public path: any;
        public start: any;

        constructor(options: ISvgDrawComponentOptions) {
            super(options);

            this._init();
            this._resize();
        }

        public debug(): void {
            this._emit(SvgDrawComponent.Events.DEBUG, this.options.overlayType);
        }

        public paperSetup(msg): void {

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
          		this.path.lineTo(this.start.add([ 200, -50 ]));
          		// Draw the view now:
              this.mypaper.view.draw();

            this._emit(SvgDrawComponent.Events.PAPERSETUP, msg);
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
        static PAPERSETUP: string = 'paperSetup';
    }
}

(function(w) {
    if (!w.IIIFComponents){
        w.IIIFComponents = IIIFComponents;
    } else {
        w.IIIFComponents.SvgDrawComponent = IIIFComponents.SvgDrawComponent;
    }
})(window);

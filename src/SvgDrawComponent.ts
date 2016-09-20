declare var paper: any;

namespace IIIFComponents {
    export class SvgDrawComponent extends _Components.BaseComponent implements ISvgDrawComponent{

        public options: ISvgDrawComponentOptions;
        private _$canvas: JQuery;
        private _$wrapper: JQuery;
        private _$toolbar: JQuery;
        private _$tool1: JQuery;
        private _$tool2: JQuery;
        private _$tool3: JQuery;
        public mypaper: any;

        constructor(options: ISvgDrawComponentOptions) {
            super(options);

            this._init();
            this._resize();
        }

        public debug(): void {
            this._emit(SvgDrawComponent.Events.DEBUG, this.options.overlayType);
        }

        public shapeComplete(msg): void {
            this._emit(SvgDrawComponent.Events.SHAPECOMPLETE, msg);
        }

        public addToolbar(): void {
          var _this = this;
          this._$toolbar = $('<ul/>');
          this._$tool1 = $('<li><button id="tool1">Lines</button></li>');
          this._$tool2 = $('<li><button id="tool2">Clouds</button></li>');
          this._$tool3 = $('<li><button id="tool3">Rect</button></li>');
          this._$toolbar.append([this._$tool1,this._$tool2,this._$tool3]);
          this._$element.append(this._$toolbar);

          $( "button" ).on( "click", function(e) {
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
        }


        public paperSetup(el): void {
              var path, start
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
              this.mypaper.tool1.onMouseDrag = function(event) {
                path.add(event.point);
              }

              ////// C L O U D Y  L I N E S ////////////
              this.mypaper.tool2 = new this.mypaper.Tool();
              this.mypaper.tool2.minDistance = 20;
              this.mypaper.tool2.onMouseDown = onMouseDown;

              this.mypaper.tool2.onMouseDrag = function(event) {
                // Use the arcTo command to draw cloudy lines
                path.arcTo(event.point);
              }

              ////// R E C T A N G L E ////////////
              this.mypaper.tool3 = new this.mypaper.Tool();
              this.mypaper.tool3.onMouseDrag = function(event) {
                if (rectangle) {
                  rectangle.remove();
                }
                drawRect(event.downPoint, event.point);
              }

              function drawRect(start, end) {
                rectangle = new _this.mypaper.Path.Rectangle(start, end);
                rectangle.strokeColor = 'red';
              }

        }

        protected _init(): boolean {
            var success: boolean = super._init();

            if (!success){
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
        static SHAPECOMPLETE: string = 'shapeComplete';
    }
}

(function(w) {
    if (!w.IIIFComponents){
        w.IIIFComponents = IIIFComponents;
    } else {
        w.IIIFComponents.SvgDrawComponent = IIIFComponents.SvgDrawComponent;
    }
})(window);

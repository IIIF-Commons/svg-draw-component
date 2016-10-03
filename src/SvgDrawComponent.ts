declare var paper: any;

namespace IIIFComponents {
    export class SvgDrawComponent extends _Components.BaseComponent implements ISvgDrawComponent{

        public options: ISvgDrawComponentOptions;
        public subject: ISubject;
        private _$canvas: JQuery;
        private _$wrapper: JQuery;
        private _$toolbarDiv: JQuery;
        private _$toolbar: JQuery;
        public svgDrawPaper: any;
        private _hitOptions: any;

        constructor(options: ISvgDrawComponentOptions) {
            super(options);

            this._init();
            this._resize();
            this._hitOptions = {
            	segments: true,
            	stroke: true,
            	fill: true,
            	tolerance: 5
            };
        }

        protected _init(): boolean {
            var success: boolean = super._init();
            var raster;

            if (!success){
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
        }

        public debug(): void {
            this._emit(SvgDrawComponent.Events.DEBUG, this.options.subjectType);
        }

        public pathComplete(msg): void {
            this._emit(SvgDrawComponent.Events.SHAPECOMPLETE, msg);
        }

        public addToolbar(): void {
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

          $('button').on( 'click', function(e) {
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
        }


        public paperSetup(el: HTMLElement): void {
              var path, segment, line, cloud, start
              var rectangle = null;
              var movePath = false;
              var _this = this;

              this.svgDrawPaper = new paper.PaperScope();
          	  this.svgDrawPaper.setup(el);

              this.subject.addBackground(this.svgDrawPaper);
              //todo: add bg to separate layer, move to back, and lock it

              ////// S E L E C T   T O O L ////////////
              this.svgDrawPaper.selectTool = new this.svgDrawPaper.Tool();
              this.svgDrawPaper.selectTool.onMouseDown = function(event) {
              	segment = path = null;
              	var hitResult = _this.svgDrawPaper.project.hitTest(event.point, _this._hitOptions);
              	if (!hitResult)
              		return;

              	if (event.modifiers.shift) {
              		if (hitResult.type == 'segment') {
              			hitResult.segment.remove();
              		};
              		return;
              	}

              	if (hitResult) {
              		path = hitResult.item;
              		if (hitResult.type == 'segment') {
              			segment = hitResult.segment;
              		} else if (hitResult.type == 'stroke') {
              			var location = hitResult.location;
              			segment = path.insert(location.index + 1, event.point);
              			path.smooth();
              		}
              	}
              	movePath = hitResult.type == 'fill';
              	if (movePath)
              		_this.svgDrawPaper.project.activeLayer.addChild(hitResult.item);
              }

              this.svgDrawPaper.selectTool.onMouseMove = function(event) {
              	_this.svgDrawPaper.project.activeLayer.selected = false;
              	if (event.item)
              		event.item.selected = true;
              }

              this.svgDrawPaper.selectTool.onMouseDrag = function(event) {
              	if (segment) {
              		segment.point += event.delta;
              		path.smooth();
              	} else if (path) {
              		path.position += event.delta;
              	}
              }

              ////// S T R A I G H T  L I N E S ////////////
              this.svgDrawPaper.lineTool = new this.svgDrawPaper.Tool();
              this.svgDrawPaper.lineTool.onMouseDown = function(event) {
                line = new _this.svgDrawPaper.Path();
                line.strokeColor = 'red';
                line.fillColor = 'white';
                line.opacity = 0.5;
                line.add(event.point);
              }
              this.svgDrawPaper.lineTool.onMouseDrag = function(event) {
                line.add(event.point);
              }
              this.svgDrawPaper.lineTool.onMouseUp = function(event) {
                line.closed = true;
                line.smooth();
                var lineCopy = line.clone();
                // todo: emit _this.pathComplete() event
                line.remove();
              }

              ////// C L O U D Y  L I N E S ////////////
              this.svgDrawPaper.cloudTool = new this.svgDrawPaper.Tool();
              this.svgDrawPaper.cloudTool.minDistance = 20;
              this.svgDrawPaper.cloudTool.onMouseDown = function(event) {
                cloud = new _this.svgDrawPaper.Path();
                cloud.strokeColor = 'red';
                cloud.fillColor = 'white';
                cloud.opacity = 0.5;
                cloud.add(event.point);
              }
              this.svgDrawPaper.cloudTool.onMouseDrag = function(event) {
                // Use the arcTo command to draw cloudy lines
                cloud.arcTo(event.point);
              }
              this.svgDrawPaper.cloudTool.onMouseUp = function(event) {
                cloud.closed = true;
                var cloudCopy = cloud.clone();
                // todo: emit _this.pathComplete() event
                cloud.remove();
              }

              ////// R E C T A N G L E ////////////
              this.svgDrawPaper.rectTool = new this.svgDrawPaper.Tool();
              this.svgDrawPaper.rectTool.onMouseDrag = function(event) {
                if (rectangle) {
                  rectangle.remove();
                }
                drawRect(event.downPoint, event.point);
              }

              this.svgDrawPaper.rectTool.onMouseUp = function(event) {
                var rectCopy = rectangle.clone();
                _this.pathComplete(
                  {'type':'rect',
                   'data':{'x':rectangle.bounds.x,
                          'y': rectangle.bounds.y,
                          'h': rectangle.bounds.height,
                          'w': rectangle.bounds.width}
                  }
                );
                rectangle.remove();
              }

              function drawRect(start, end) {
                var rect = new _this.svgDrawPaper.Rectangle(start, end);
                rectangle = new _this.svgDrawPaper.Path.Rectangle(rect);
                rectangle.strokeColor = 'red';
                rectangle.fillColor = 'white';
                rectangle.opacity = 0.5;
              }

        }

        protected _getDefaultOptions(): ISvgDrawComponentOptions {
            return <ISvgDrawComponentOptions>{
                subject: {},
                subjectType: SubjectType.DEFAULT.toString(),
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

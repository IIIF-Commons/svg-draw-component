declare var paper: any;

namespace IIIFComponents {
    export class SvgDrawComponent extends _Components.BaseComponent implements ISvgDrawComponent{

        public options: ISvgDrawComponentOptions;
        public subject: ISubject;
        public importSVG(svg): void;
        private _$canvas: JQuery;
        private _$wrapper: JQuery;
        private _$toolbarDiv: JQuery;
        private _$toolbarCtrl: JQuery;
        private _$layersToolbarDiv: JQuery;
        private _$layersToolbarCtrl: JQuery;
        private _$toolbar: JQuery;
        public svgDrawPaper: any;
        private _hitOptions: any;

        constructor(options: ISvgDrawComponentOptions) {
            super(options);

            this._init();
            this._resize();
            this._hitOptions = {
            	segments: false,
            	stroke: false,
            	fill: true,
            	tolerance: 5,
                class: paper.Path
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

            if(this.options.toolbars){
                if(this.options.toolbars.tools){
                    this.addToolsToolbar();
                }
                if(this.options.toolbars.layers){
                    this.addLayersToolbar();
                }
                // Shared Event Handler
                (<any>$('.toolbar')).draggable({handle:".ctrl"});
            }

            return success;
        }

        public debug(): void {
            this._emit(SvgDrawComponent.Events.DEBUG, this.options.subjectType);
        }

        public pathCompleted(shape): void {
            var payload = {}
            var media_fragment_coords = null;
            var $svg = $( "<svg xmlns='http://www.w3.org/2000/svg'/>" );
            var $shape = $( shape.exportSVG({matchShapes:true}) );
            $svg.append($shape);
            shape.name = $shape[0].tagName + "_" + shape._id;
            if($shape[0].tagName === 'rect' && shape.rotation === 0){ // if a non-rotated rectangle
                media_fragment_coords = {
                    'x': shape.bounds.x,
                    'y': shape.bounds.y,
                    'h': shape.bounds.height,
                    'w': shape.bounds.width
                 }
            }
            payload = {
                  'name': shape.name,
                  'media_fragment_coords':media_fragment_coords,
                  'svg': $svg[0].outerHTML
              }

            this._emit(SvgDrawComponent.Events.SHAPECOMPLETED, payload);
        }

        public pathUpdated(shape): void {
            var payload = {}
            var media_fragment_coords = null;
            var $svg = $( "<svg xmlns='http://www.w3.org/2000/svg'/>" );
            var $shape = $( shape.exportSVG({matchShapes:true}) );
            $svg.append($shape);
            if($shape[0].tagName === 'rect' && shape.rotation === 0){ // if a non-rotated rectangle
                media_fragment_coords = {
                    'x': shape.bounds.x,
                    'y': shape.bounds.y,
                    'h': shape.bounds.height,
                    'w': shape.bounds.width
                 }
            }
            payload = {
                  'name': shape.name,
                  'media_fragment_coords':media_fragment_coords,
                  'svg': $svg[0].outerHTML
              }

            this._emit(SvgDrawComponent.Events.SHAPEUPDATED, payload);
        }

        public pathDeleted(shape): void {
            var payload = { 'name': shape.name };
            this._emit(SvgDrawComponent.Events.SHAPEDELETED, payload);
        }

        private _slugify(text): string {
            return text.toString().toLowerCase().trim()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/&/g, '-and-')         // Replace & with 'and'
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-');        // Replace multiple - with single -
        }

        public addLayersToolbar(): void {
          var _this = this;

          var layers = this.options.toolbars.layers.presets.map(function(layer) {
              var isActive = '', isVisible = '', isLocked = '', tmp;

              tmp = _this.addLayer(layer.name);
              if(layer.active){
                  isActive = 'selected';
                  tmp.activate();
              };
              if(layer.visible){
                  isVisible = 'checked';
                  tmp.visible = true;
              };
              if(layer.locked){
                  isLocked = 'checked';
                  tmp.locked = true;
              };
              return $('<li id="'+ tmp.name +'" class="tool-btn '+ isActive +'"><input id="'+ tmp.name +'-eye_btn" class="eye_btn" type="checkbox" name="'+ tmp.name +'" '+ isVisible +'><label for="'+ tmp.name +'-eye_btn"> <i class="fa fa-fw fa-eye"></i></label><input id="'+ tmp.name +'-lock_btn" class="lock_btn" type="checkbox" name="'+ tmp.name +'" '+ isLocked +'><label for="'+ tmp.name +'-lock_btn"><i class="fa fa-fw fa-lock"></i></label><span>'+ layer.name +'</span></li>');
          });

          this._$layersToolbarDiv = $('<div class="toolbar toolbar-layers">');
          this._$layersToolbarCtrl = $('<div class="ctrl ctrl-layers">Layers</div>');
          this._$toolbar = $('<ul class="tools">');
          this._$toolbar.append(layers);
          this._$layersToolbarDiv.append(this._$layersToolbarCtrl);
          this._$layersToolbarDiv.append(this._$toolbar);
          this._$element.after(this._$layersToolbarDiv);

          /* //////
          // EVENT HANDLERS
          */

          $('.ctrl-layers').on("dblclick",function(){
            $('.toolbar-layers').toggleClass('minToolbar');
          });

          $('.toolbar-layers input').on( 'click', function(e) {
            var target = (<HTMLInputElement>e.target);
            switch (e.target.className) {
              case 'eye_btn':
                  _this.svgDrawPaper.project.layers[target.name].visible = !_this.svgDrawPaper.project.layers[target.name].visible;
                  break;
              case 'lock_btn':
                  _this.svgDrawPaper.project.layers[target.name].locked = !_this.svgDrawPaper.project.layers[target.name].locked;
                  break;
            }
          });

          $('.toolbar-layers span').on( 'click', function(e) {
              var target = (<HTMLInputElement>e.target);
              // clear select class
              $('.toolbar-layers li').removeClass('selected');
              // activate parent
              _this.svgDrawPaper.project.layers[target.parentElement.id].activate();
              // add select class
              $('li#'+target.parentElement.id).addClass('selected');

          });


        }

        public addToolsToolbar(): void {
          var _this = this;

          var tools = this.options.toolbars.tools.buttons.map(function(tool) {
             if(tool.name === 'separator'){
                 return $('<li class="separator"></li>');
             }else{
                 return $('<li class="tool-btn"><input id="'+tool.name+'Tool" type="radio" name="toolbar"><label for="'+tool.name+'Tool"><i class="fa fa-fw '+tool.fa_icon+'"></i></label></li>');
             }
          });

          this._$toolbarDiv = $('<div class="toolbar toolbar-tools">');
          this._$toolbarCtrl = $('<div class="ctrl ctrl-tools">Tools</div>');
          this._$toolbar = $('<ul class="tools">');
          this._$toolbar.append(tools);
          this._$toolbarDiv.append(this._$toolbarCtrl);
          this._$toolbarDiv.append(this._$toolbar);
          this._$element.after(this._$toolbarDiv);

          /* //////
          // EVENT HANDLERS
          */

            $('.ctrl-tools').on("dblclick",function(){
              $('.toolbar-tools').toggleClass('minToolbar');
            });

          $('.toolbar-tools input').on( 'click', function(e) {
            switch (e.target.id) {
              case 'selectTool':
                  _this.svgDrawPaper.selectTool.activate();
                  break;
              case 'pointTool':
                  _this.svgDrawPaper.pointTool.activate();
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

        public importSVG(svg): void {
            this.svgDrawPaper.project.activeLayer.importSVG(svg,this._emit(SvgDrawComponent.Events.SVGLOADED, true));
        }

        public layers(name?: string): any {
            if (name)
                return this.svgDrawPaper.project.layers[name];
            else
                return this.svgDrawPaper.project.layers;
        }

        public addLayer(name?: string): any {
            var layer;
            if (name){
                layer = new this.svgDrawPaper.Layer({ 'name': this._slugify(name) });
            }else{
                layer = new this.svgDrawPaper.Layer();
            }
            return layer;
        }

        public paperSetup(el: HTMLElement): void {
              var path, point, line, cloud, rectangle;
              var dragging = false;
              var _this = this;

              this.svgDrawPaper = new paper.PaperScope();
          	  this.svgDrawPaper.setup(el);

              this.subject.addBackground(this.svgDrawPaper);
              this.svgDrawPaper.project.activeLayer.name = 'bg';
              var bgLayer = this.svgDrawPaper.project.activeLayer;
              bgLayer.locked = true;
              var drawLayer = new this.svgDrawPaper.Layer();
              drawLayer.name = 'drawlayer';

              ////// S E L E C T   T O O L ////////////
              this.svgDrawPaper.selectTool = new this.svgDrawPaper.Tool();

              this.svgDrawPaper.selectTool.onMouseDown = function(event) {
              	_this.svgDrawPaper.project.activeLayer.selected = false;
              	if (event.item){
              		event.item.selected = true;
                }
              }

              this.svgDrawPaper.selectTool.onMouseDrag = function(event) {
                  if (event.item){
                      dragging = true;
                      event.item.position.x +=event.delta.x;
                      event.item.position.y +=event.delta.y;
                  }
              }

              this.svgDrawPaper.selectTool.onMouseUp = function(event) {
                  if (event.item){
                      if(dragging){
                         dragging = false;
                         _this.pathUpdated(event.item); // fire update event
                      }
                  }
              }

              this.svgDrawPaper.selectTool.onKeyUp = function(event) {

                    if (event.key == 'backspace') {

                        var selected = _this.svgDrawPaper.project.selectedItems;

                        for (var i = 0; i < selected.length; i++) {
                        	var item = selected[i];
                            // todo: allow other components to confirm delete?
                            _this.pathDeleted(item); // fire delete event
                        	item.remove();
                        }
                        return false;
                    }
                }

                ////// P O I N T S ////////////
                this.svgDrawPaper.pointTool = new this.svgDrawPaper.Tool();

                this.svgDrawPaper.pointTool.onMouseDown = function(event) {
                  point = new _this.svgDrawPaper.Path.Circle(event.point, 10);
                  point.strokeColor = 'red';
                  point.fillColor = 'white';
                  point.opacity = 0.5;
                }

                this.svgDrawPaper.pointTool.onMouseUp = function(event) {
                  var pointCopy = point.clone();
                  pointCopy.selected = true;
                  //_this.svgDrawPaper.selectTool.activate();
                  _this.pathCompleted(pointCopy); // fire event
                  point.remove();
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
                line.simplify();
                var lineCopy = line.clone();
                lineCopy.selected = true;
                //_this.svgDrawPaper.selectTool.activate();
                _this.pathCompleted(lineCopy); // fire event
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
                cloudCopy.selected = true;
                //_this.svgDrawPaper.selectTool.activate();
                _this.pathCompleted(cloudCopy); // fire event
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
                rectCopy.selected = true;
                //_this.svgDrawPaper.selectTool.activate();
                _this.pathCompleted(rectCopy);
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
        static SHAPECOMPLETED: string = 'shapeCompleted';
        static SHAPEUPDATED: string = 'shapeUpdated';
        static SHAPEDELETED: string = 'shapeDeleted';
        static SVGLOADED: string = 'svgLoaded';
    }
}

(function(w) {
    if (!w.IIIFComponents){
        w.IIIFComponents = IIIFComponents;
    } else {
        w.IIIFComponents.SvgDrawComponent = IIIFComponents.SvgDrawComponent;
    }
})(window);

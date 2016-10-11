declare var OpenSeadragon: any;
declare var paper: any;

namespace IIIFComponents {
    export class OSDSubject implements ISubject {

        public $wrapper: JQuery;
        private viewer: any;

        constructor(target) {
            console.log(target);
            var _this = this;
            this.$wrapper = $('<div><canvas id="canvas-1" class="paper"></canvas></div>');
            this.viewer = new OpenSeadragon(target);

            this.viewer.addHandler("open", function() {
              _this.addOverlay();
              _this.addTools();
            });
        }

        public freeze(): void {
            console.log("OSD frozen!");
        }

        public addBackground(svgDrawPaper): void {
            console.log("OSD addBackground!");
        }

        public getSubjectType(): SubjectType {
            return SubjectType.OPENSEADRAGON;
        }

        private addOverlay(): void {
            var element = document.getElementById('canvas-1');
            var rect = new OpenSeadragon.Rect(0, 0, 1, this.viewer.viewport.getAspectRatio()+.07);

            this.viewer.addOverlay({
                element: element,
                location: rect
            });

            paper.view.viewSize.width = $( "#canvas-1" ).width();
            paper.view.viewSize.height = $( "#canvas-1" ).height();

        }
        /*
        <a class="btn btn-danger" href="path/to/settings" aria-label="Delete">
          <i class="fa fa-trash-o" aria-hidden="true" title="Delete this item?"></i>
        </a>
        */

        private addTools(): void {
            $(() => {
                $('.toolbar-tools ul.tools').append($('<li class="tool-btn"><input id="drawmode" type="checkbox" name="drawmode" aria-label="Draw Mode Toggle"><label for="drawmode"><i class="fa fa-fw fa-pencil-square" aria-hidden="true" title="Toggle Draw Mode?"></i></label></li>'));
                $('#drawmode').on('click', (e) => {
                    if (this.viewer.isMouseNavEnabled() === true) {
                        this.viewer.setMouseNavEnabled(false);
                    } else {
                        this.viewer.setMouseNavEnabled(true);
                    }
                });
            });
        }

    }
}

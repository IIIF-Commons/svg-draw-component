declare var OpenSeadragon: any;
declare var paper: any;

namespace IIIFComponents {
    export class OSDSubject implements ISubject {

        public viewer: any; // todo: should this be private? (make everything private by default unless definitely required outside of class)
        public $wrapper: JQuery;

        constructor(target) {
            console.log(target);
            this.$wrapper = $('<div><canvas id="canvas-1" class="paper"></canvas></div>');
            this.viewer = new OpenSeadragon(target);

            this.viewer.addHandler("open", () => {
              this.addOverlay();
              this.addTools();
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
            var element = document.getElementById('canvas-1'); // todo: should this id be hard-coded?
            var rect = new OpenSeadragon.Rect(0, 0, 1, this.viewer.viewport.getAspectRatio()+.07);

            this.viewer.addOverlay({
                element: element,
                location: rect
            });

            paper.view.viewSize.width = $("#canvas-1").width();
            paper.view.viewSize.height = $("#canvas-1").height();
        }

        private addTools(): void {
            $(() => {
                $('#toolbar').append($('<li><button id="drawmode">draw mode (off)</button></li>'));
                $('#drawmode').on('click', () => {
                    if (this.viewer.isMouseNavEnabled() === true) {
                        this.viewer.setMouseNavEnabled(false);
                        $(this).text('draw mode (on)');
                    } else {
                        this.viewer.setMouseNavEnabled(true);
                        $(this).text('draw mode (off)');
                    }
                    return false;
                });
            });
        }
    }
}

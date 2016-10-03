declare var paper: any;

namespace IIIFComponents {
    export class ImageSubject implements ISubject {

        public raster: any;
        public $wrapper: JQuery;
        private imgID: string;

        constructor(target) {
            this.imgID = target;
            this.$wrapper = $('<div><canvas id="canvas-1" class="paper"></canvas></div>');
        }

        public freeze(): void {
          console.log("Image frozen!");
        }

        public addBackground(svgDrawPaper): void {
          this.raster = new svgDrawPaper.Raster(this.imgID);
          svgDrawPaper.view.viewSize.width = this.raster.width;
          svgDrawPaper.view.viewSize.height = this.raster.height;
          this.raster.position = svgDrawPaper.view.center;
        }

        public getSubjectType(): SubjectType {
          return SubjectType.IMAGE;
        }

    }
}
declare var paper: any;

namespace IIIFComponents {
    export class ImageSubject implements ISubject {

        public raster: any;
        public $wrapper: JQuery;
        private imgID: string;

        constructor(target) {
            this.imgID = target;
            this.$wrapper = $('<div><canvas id="canvas-1" class="paper" resize="true"></canvas></div>');
        }

        public freeze(): void {
          console.log("Image frozen!");
        }

        public addBackground(svgDrawPaper): void {
            var _this = this;
            this.raster = new svgDrawPaper.Raster(this.imgID);
            this.raster.onLoad = function() {
                console.log('The image has finished loading.');
                $('.paper').css('width', _this.raster.width + 'px');
                $('.paper').css('height', _this.raster.height + 'px');
                svgDrawPaper.view.viewSize.width = _this.raster.width;
                svgDrawPaper.view.viewSize.height = _this.raster.height;
                _this.raster.position = svgDrawPaper.view.center;
            };
        }

        public getSubjectType(): SubjectType {
          return SubjectType.IMAGE;
        }

    }
}

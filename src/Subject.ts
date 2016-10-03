namespace IIIFComponents {
    export class Subject implements ISubject {

        public $wrapper: JQuery;

        constructor(target) {
            this.$wrapper = $('<div><canvas id="canvas-1" class="paper"></canvas></div>');
        }

        public addBackground(svgDrawPaper): void {
          console.log("Default addBackground!");
        }

        public freeze(): void {
          console.log("default frozen!");
        }

        public getSubjectType(): SubjectType {
          return new SubjectType('');
        }

    }
}

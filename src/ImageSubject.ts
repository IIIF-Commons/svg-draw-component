namespace IIIFComponents {
    export class ImageSubject implements ISubject {

        constructor(target) {
            console.log(target);
        }

        public freeze(): void {
          console.log("Image frozen!");
        }

        public getSubjectType(): SubjectType {
          return new SubjectType('image');
        }

    }
}

(function(w) {
    if (!w._Components){
        w._Components = _Components;
    }
})(window);

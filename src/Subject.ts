namespace IIIFComponents {
    export class Subject implements ISubject {

        constructor(target) {
            console.log(target);
        }

        public freeze(): void {
          console.log("default frozen!");
        }

        public getSubjectType(): SubjectType {
          return new SubjectType('');
        }

    }
}

(function(w) {
    if (!w._Components){
        w._Components = _Components;
    }
})(window);

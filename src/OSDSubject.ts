namespace IIIFComponents {
    export class OSDSubject implements ISubject {

        constructor(target) {
            console.log(target);
        }

        public freeze(): void {
          console.log("OSD frozen!");
        }

        public getSubjectType(): SubjectType {
          return new SubjectType('openseadragon');
        }

    }
}

(function(w) {
    if (!w._Components){
        w._Components = _Components;
    }
})(window);

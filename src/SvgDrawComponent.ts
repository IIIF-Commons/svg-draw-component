namespace IIIFComponents {
    export class SvgDrawComponent extends _Components.BaseComponent {

        constructor(options: ISvgDrawComponentOptions) {
            super(options);

            this._init();
            this._resize();
        }

        public test(): void {
            this._emit(SvgDrawComponent.Events.TEST, [1, 2, 'three', 'four!']);
        }

        public addPoint(point): void {
            this._emit(SvgDrawComponent.Events.ADDPOINT, point);
        }

        protected _init(): boolean {
            var success: boolean = super._init();

            if (!success){
                console.error("Component failed to initialise");
            }

            this._$element.append("I am an example component");


            return success;
        }

        protected _getDefaultOptions(): ISvgDrawComponentOptions {
            return <ISvgDrawComponentOptions>{
            }
        }

        protected _resize(): void {

        }
    }
}

namespace IIIFComponents.SvgDrawComponent {
    export class Events {
        static TEST: string = 'test';
        static ADDPOINT: string = 'addPoint';
    }
}

(function(w) {
    if (!w.IIIFComponents){
        w.IIIFComponents = IIIFComponents;
    } else {
        w.IIIFComponents.SvgDrawComponent = IIIFComponents.SvgDrawComponent;
    }
})(window);

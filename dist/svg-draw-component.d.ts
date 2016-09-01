// svg-draw-component v1.0.1 https://github.com/sdellis/svg-draw-component#readme
declare namespace IIIFComponents {
    interface ISvgDrawComponentOptions extends _Components.IBaseComponentOptions {
    }
}

declare namespace IIIFComponents {
    class SvgDrawComponent extends _Components.BaseComponent {
        constructor(options: ISvgDrawComponentOptions);
        test(): void;
        addPoint(point: any): void;
        protected _init(): boolean;
        protected _getDefaultOptions(): ISvgDrawComponentOptions;
        protected _resize(): void;
    }
}
declare namespace IIIFComponents.SvgDrawComponent {
    class Events {
        static TEST: string;
        static ADDPOINT: string;
    }
}

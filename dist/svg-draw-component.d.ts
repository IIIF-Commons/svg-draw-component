// svg-draw-component v1.0.1 https://github.com/sdellis/svg-draw-component#readme
declare namespace IIIFComponents {
    interface ISvgDrawComponent extends _Components.IBaseComponent {
    }
}

declare namespace IIIFComponents {
    interface ISvgDrawComponentOptions extends _Components.IBaseComponentOptions {
        overlayType?: string;
    }
}

declare var paper: any;
declare namespace IIIFComponents {
    class SvgDrawComponent extends _Components.BaseComponent implements ISvgDrawComponent {
        options: ISvgDrawComponentOptions;
        private _$canvas;
        private _$wrapper;
        private _$toolbar;
        private _$tool1;
        private _$tool2;
        private _$tool3;
        mypaper: any;
        constructor(options: ISvgDrawComponentOptions);
        debug(): void;
        shapeComplete(msg: any): void;
        addToolbar(): void;
        paperSetup(el: any): void;
        protected _init(): boolean;
        protected _getDefaultOptions(): ISvgDrawComponentOptions;
        protected _resize(): void;
    }
}
declare namespace IIIFComponents.SvgDrawComponent {
    class Events {
        static DEBUG: string;
        static SHAPECOMPLETE: string;
    }
}

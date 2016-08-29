// base-component v1.0.1 https://github.com/viewdir/base-component#readme
interface Window {
    _Components: any;
}

declare var TinyEmitter: any;
declare namespace _Components {
    class BaseComponent implements IBaseComponent {
        options: IBaseComponentOptions;
        protected _$element: JQuery;
        constructor(options: IBaseComponentOptions);
        protected _init(): boolean;
        protected _getDefaultOptions(): IBaseComponentOptions;
        protected _emit(event: string, ...args: any[]): void;
        protected _resize(): void;
        databind(data: any): void;
    }
    function applyMixins(derivedCtor: any, baseCtors: any[]): void;
}

declare namespace _Components {
    interface IBaseComponent {
        options: IBaseComponentOptions;
        databind(data: any): void;
    }
}

declare namespace _Components {
    interface IBaseComponentOptions {
        element?: string;
    }
}

declare namespace IIIFComponents {
    interface ISvgDrawComponentOptions extends _Components.IBaseComponentOptions {
    }
}

declare namespace IIIFComponents {
    class SvgDrawComponent extends _Components.BaseComponent {
        constructor(options: ISvgDrawComponentOptions);
        test(): void;
        protected _init(): boolean;
        protected _getDefaultOptions(): ISvgDrawComponentOptions;
        protected _resize(): void;
    }
}
declare namespace IIIFComponents.SvgDrawComponent {
    class Events {
        static TEST: string;
    }
}

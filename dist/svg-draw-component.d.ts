// svg-draw-component v1.0.1 https://github.com/sdellis/svg-draw-component#readme
declare namespace IIIFComponents {
    interface ISubject {
        getSubjectType(): SubjectType;
        freeze(): void;
    }
}

declare namespace IIIFComponents {
    interface ISubjectOptions {
        target?: any;
    }
}

declare namespace IIIFComponents {
    interface ISvgDrawComponent extends _Components.IBaseComponent {
    }
}

declare namespace IIIFComponents {
    interface ISvgDrawComponentOptions extends _Components.IBaseComponentOptions {
        subjectType?: SubjectType;
        subject?: any;
    }
}

declare namespace IIIFComponents {
    class ImageSubject implements ISubject {
        constructor(target: any);
        freeze(): void;
        getSubjectType(): SubjectType;
    }
}

declare var OpenSeadragon: any;
declare var paper: any;
declare namespace IIIFComponents {
    class OSDSubject implements ISubject {
        viewer: any;
        constructor(target: any);
        freeze(): void;
        getSubjectType(): SubjectType;
        private addOverlay();
        private addTools();
    }
}

declare namespace IIIFComponents {
    class StringValue {
        value: string;
        constructor(value?: string);
        toString(): string;
    }
}

declare namespace IIIFComponents {
    class Subject implements ISubject {
        constructor(target: any);
        freeze(): void;
        getSubjectType(): SubjectType;
    }
}

declare namespace IIIFComponents {
    class SubjectType extends StringValue {
        static DEFAULT: SubjectType;
        static IMAGE: SubjectType;
        static OPENSEADRAGON: SubjectType;
        default(): SubjectType;
        image(): SubjectType;
        openseadragon(): SubjectType;
    }
}

declare var paper: any;
declare namespace IIIFComponents {
    class SvgDrawComponent extends _Components.BaseComponent implements ISvgDrawComponent {
        options: ISvgDrawComponentOptions;
        subject: ISubject;
        private _$canvas;
        private _$wrapper;
        private _$toolbarDiv;
        private _$toolbar;
        mypaper: any;
        constructor(options: ISvgDrawComponentOptions);
        protected _init(): boolean;
        debug(): void;
        shapeComplete(msg: any): void;
        addToolbar(): void;
        paperSetup(el: any): void;
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

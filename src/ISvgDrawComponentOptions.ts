namespace IIIFComponents{
    export interface ISvgDrawComponentOptions extends _Components.IBaseComponentOptions {
      subjectType?: string; // none, 'image', or 'openseadragon'
      subject?: any; // osd instance, img element, canvas element
      toolbars?: any;
    }
}

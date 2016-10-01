namespace IIIFComponents {
    export interface ISubject{
      _$wrapper: JQuery;
      addBackground(svgDrawPaper):void; // expects paperjs instance param
      getSubjectType(): SubjectType;
      freeze():void;
    }
}

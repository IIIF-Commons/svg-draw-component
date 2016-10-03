namespace IIIFComponents {
    export interface ISubject{
      $wrapper: JQuery;
      addBackground(svgDrawPaper):void; // expects paperjs instance param
      getSubjectType(): SubjectType;
      freeze():void;
    }
}

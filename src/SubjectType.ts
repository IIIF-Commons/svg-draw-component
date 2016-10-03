namespace IIIFComponents {
    export class SubjectType extends StringValue{
        public static DEFAULT = new SubjectType("");
        public static IMAGE = new SubjectType("image");
        public static OPENSEADRAGON = new SubjectType("openseadragon");
    }
}

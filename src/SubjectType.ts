namespace IIIFComponents {
    export class SubjectType extends StringValue{
        public static DEFAULT = new SubjectType("");
        public static IMAGE = new SubjectType("image");
        public static OPENSEADRAGON = new SubjectType("openseadragon");

        // todo: use getters when ES3 target is no longer required.

        default(): SubjectType {
            return new SubjectType(SubjectType.DEFAULT.toString());
        }

        image(): SubjectType {
            return new SubjectType(SubjectType.IMAGE.toString());
        }

        openseadragon(): SubjectType {
            return new SubjectType(SubjectType.OPENSEADRAGON.toString());
        }
    }
}

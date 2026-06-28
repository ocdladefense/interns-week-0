export class StringUtils {
    static convertToHTMLId(source) {

        let htmlID = source.trim()
                            .replaceAll(' ', '-')
                            .toLowerCase();


        return htmlID;
    }
}
export class Utils {
    static log(...params: any){
        let str = '';
        params.forEach(function (elem: any) {
            str = str + JSON.stringify(elem);
        });
    }
}
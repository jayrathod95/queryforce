import {Webview} from "../../core/Webview";
import {ViewColumn, window} from "vscode";
import {Org} from "../../core/Org";
import {OrgInstance} from "../../core/OrgInstance";


export class QueryResultWebView extends Webview {

    records: Array<any>;
    org: OrgInstance;
    totalRows: number;
    public static readonly viewType = 'queryResults';
    public static readonly title = 'Results';

    constructor(records: Array<any>,org: OrgInstance, totalRows: number) {
        super();
        this.records = records;
        this.org = org;
        this.totalRows = totalRows;
        console.log(records);
    }

    protected getHTML(): string {
        let records = this.records;
        let instanceUrl = this.org.instanceUrl;
        return `
        <html lang="en">
            <head>
                <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline';" />
                <style>
                    .qf-table{
                        border-collapse: collapse;
                        border-spacing: 0;
                    }
                    .qf-table td, th{
                        border: solid 1px #CCC;
                        height: 1.6rem;
                        padding: 2px 10px 2px 10px;
                    }
                    .qf-table td{
                        text-align: center;
                    }
                    .qf-table-body tr:nth-child(even){
                        background: #fdfdfd;
                    }
                    .qf-table-body tr:nth-child(odd){
                        background: #f5f5f5;
                    }
                </style>
            </head>
            <body>
                <table class="qf-table">
                    <thead>
                    <tr>
                    ${function () {
                        var theads = '';
                        console.log(records[0]);
                        
                        Object.keys(records[0]).forEach(value => {
                            if(value!== 'attributes'){
                                theads = theads + '<th>'+ value+'</th>';
                            }
                        });
                        return theads;
                    }()}
                    </tr>
                    </thead>
                    <tbody class="qf-table-body">
                    ${function () {
                        var trows = '';
                        records.forEach((value, index) => {
                            var trow = '<tr>';
                            Object.keys(value).forEach(value1 => {
                                if(value1==='attributes'){
                                    return;
                                }else if (value1 === 'Id'){
                                    var id = value[value1];
                                    var href = instanceUrl+'/'+id;
                                    trow = trow +'<td><a href="'+href+'">'+ id+ '</a></td>';
                                }else{
                                    trow = trow +'<td>'+ value[value1]+ '</td>';
                                }
                            });
                            trow = trow+ '</tr>';
                            trows= trows+trow;
                        });
                        return trows;
                    }()}
                    </tbody>
                </table>
            </body>
        </html>
        `;
    }

    show(): void {
        let webviewPanel = window.createWebviewPanel(QueryResultWebView.viewType,QueryResultWebView.title,{
            viewColumn: ViewColumn.Beside,
            preserveFocus: false
        });
        webviewPanel.webview.html = this.getHTML();

    }


}
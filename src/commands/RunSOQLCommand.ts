import {Command} from "../core/Command";
import {ProgressLocation, Uri, window} from "vscode";
import {Dao} from "../state-handler/Dao";
import {SForce} from "../core/SForce";
import {State} from "../state-handler/State";
import {QueryResultWebView} from "../view/webviews/QueryResultWebView";
import {Toast} from "../view/utils/Toast";

export class RunSOQLCommand extends Command {
    static commandLabel = "QF: Run SOQL";
    static commandName = "queryforce.connection.retrieve.soql";

    onCommandExecute(args?: any): void {


        if(args instanceof Uri){
            window.withProgress({title:'Queryforce',location: ProgressLocation.Notification,cancellable:true},(progress, token) => {
                return new Promise((resolve, reject) => {
                    Dao.readFile(args.fsPath).then(soql => {
                        State.getDefaultOrg().then(org => {
                            progress.report({message: 'Logging in'});
                            SForce.login(org).then(orgInstance => {
                                progress.report({message: 'Executing SOQL on your org'});
                                orgInstance.executeQuery(soql).then(result => {
                                    console.log(result);
                                    let view = new QueryResultWebView(result.records, orgInstance, result.totalSize);
                                    view.show();
                                    new Toast(`Query returned ${result.totalSize} rows`,).show();
                                    resolve();
                                },reason => {
                                    console.log(reason);
                                    new Toast('Error: '+reason.message,'error').show();
                                    reject(reason);
                                });
                            });
                        });
                    });
                });
            });

        }
    }

}
import {Command} from "../core/Command";
import {Uri} from "vscode";
import {Dao} from "../state-handler/Dao";
import {SForce} from "../core/SForce";
import {State} from "../state-handler/State";
import {Org} from "../core/Org";

export class RunSOQLCommand extends Command {
    static commandLabel = "QF: Run SOQL";
    static commandName = "queryforce.connection.retrieve.soql";

    onCommandExecute(args?: any): void {

        if(args instanceof Uri){
            Dao.readFile(args.fsPath).then(data => {
                State.getDefaultOrg().then(org => {
                    SForce.login(org).then(orgInstance => {
                        orgInstance.executeQuery(data).then(value => {
                            console.info(value);
                        },reason => {
                            console.error(reason);
                        });
                    });
                });
            });
        }
    }

}
import {Command} from "../core/Command";
import {State} from "../state-handler/State";
import {Toast} from "../view/utils/Toast";
import {Manifest} from "../Manifest";
import {Constants} from "../core/Constants";
import {TreeItem} from "vscode";
import {OrgTreeItem} from "../view/trees/OrgExplorerDataProvider";

export class SetDefaultConnectionCommand extends Command {
    static commandLabel = 'QF: Set a default connection';
    static commandName = 'queryforce.connection.default';

    onCommandExecute(param?: any): void {
        let username = param instanceof OrgTreeItem ? param.username : param;
        State.setDefaultOrg(username).then(value2 => {
            return new Toast(`${username} is default org now.`).show();
        }, reason => new Toast('Something went wrong while updating default org.').show());
    }

}
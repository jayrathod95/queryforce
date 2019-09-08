import {Command} from "../core/interfaces/Command";
import {ProgressLocation, window} from "vscode";
import {OrgType} from "../core/interfaces/OrgType";
import {Org} from "../core/classes/Org";
import {Utils} from "../core/Utils";
import {State} from "../state-handler/State";
import {Toast} from "../view/utils/Toast";
import {SForce} from "../core/SForce";

export class AddConnectionCommand implements Command {
    static commandLabel = 'QF: Add New Connection';
    static commandName = 'queryforce.connection.add';

    onCommandExecute(): void {
        window.showQuickPick(Utils.getOrgTypes(), {placeHolder: 'Select Salesforce org type'}).then(_orgType => {
            if (_orgType) {
                window.showInputBox({placeHolder: 'Enter username'}).then(username => {
                    if (username) {
                        window.showInputBox({prompt: 'Enter password', password: true}).then(password => {
                            if (password) {
                                window.showInputBox({prompt: 'Enter security token (Optional, press Enter to skip)'}).then(sToken => {
                                    let org = new Org(Utils.getOrgType(_orgType) as OrgType, username, password, sToken);
                                    console.log(org);
                                    window.withProgress({
                                        cancellable: true,
                                        location: ProgressLocation.Notification,
                                        title: 'Verifying credentials'
                                    }, (progress, token) => {
                                        return new Promise((resolve, reject) => {
                                            SForce.login(org).then(orgInstance => {
                                                State.saveConnection(org).then(() => resolve(orgInstance),reason => reject(reason));
                                            }, reason => reject(reason));
                                        });
                                    }).then(value => {
                                        new Toast('Org added').show();
                                    }, reason => {
                                        new Toast(reason, 'error').show();
                                    });
                                });
                            }
                        }, reason => console.warn(reason));
                    }
                }, reason => console.warn(reason));
            }
        }, reason => console.warn(reason));
    }

}
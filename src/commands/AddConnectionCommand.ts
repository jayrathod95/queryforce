import {Command} from "../core/Command";
import {ProgressLocation, window, commands} from "vscode";
import {OrgType} from "../core/OrgType";
import {Org} from "../core/Org";
import {Utils} from "../core/Utils";
import {State} from "../state-handler/State";
import {Toast} from "../view/utils/Toast";
import {SForce} from "../core/SForce";
import {SetDefaultConnectionCommand} from "./SetDefaultConnectionCommand";


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
                                                State.saveConnection(org).then(() => resolve(orgInstance), reason => reject(reason));
                                            }, reason => reject(reason));
                                        });
                                    }).then(value => {
                                        let action = new Toast('Org has been added successfully. Would you like to mark this as default org?').show('Yes', 'No');
                                        if (action) {
                                            action.then(value1 => {
                                                if (value1 === 'Yes') {
                                                    commands.executeCommand(SetDefaultConnectionCommand.commandName,org.username);
                                                }
                                            });
                                        }
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
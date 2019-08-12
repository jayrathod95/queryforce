import { window, MessageItem } from 'vscode';

export class Toast {
    type: string;
    message: string;
    sticky: boolean;
    modal?: boolean

    constructor(message: string, type: string = 'success', sticky: boolean = false,modal:boolean = false) {
        this.type = type;
        this.message = message;
        this.sticky = sticky;
        this.modal = modal;
    }

    show(action1?: string, action2?: string): Thenable<string | undefined> | undefined {
        if (this.type === 'success') {
            if (action1 && action2) {
                return window.showInformationMessage(this.message, { modal: this.modal }, action1, action2);
            }else if (action1) {
                return window.showInformationMessage(this.message, { modal: this.modal }, action1);
            } else {
                return window.showInformationMessage(this.message, { modal: this.modal });
            }
        }else if(this.type === 'warning') {
            if (action1 && action2) {
                return window.showWarningMessage(this.message, { modal: this.modal }, action1, action2);
            }else if (action1) {
                return window.showWarningMessage(this.message, { modal: this.modal }, action1);
            } else {
                return window.showWarningMessage(this.message, { modal: this.modal });
            }
        }else if(this.type === 'error') {
            if (action1 && action2) {
                return window.showErrorMessage(this.message, { modal: this.modal }, action1, action2);
            }else if (action1) {
                return window.showErrorMessage(this.message, { modal: this.modal }, action1);
            } else {
                return window.showErrorMessage(this.message, { modal: this.modal });
            }
        }
        return undefined;
    }

    

}
import {Event, EventEmitter, TreeDataProvider, TreeItem, TreeItemCollapsibleState} from "vscode";

export class OrgExplorerDataProvider implements TreeDataProvider<Org>{
    private _onDidChangeTreeData: EventEmitter<Org> = new EventEmitter<Org>();
    onDidChangeTreeData: Event<Org | undefined | null> = this._onDidChangeTreeData.event;

    refresh(): void{
        this._onDidChangeTreeData.fire();
    }

    getParent(element: Org): Thenable<Org | undefined | null> | Org | undefined | null {
        return undefined;
    }

    getTreeItem(element: Org): TreeItem | Thenable<TreeItem> {
        return element;
    }

    getChildren(element?: Org): Thenable<Org[]> {
        if(!element) return Promise.resolve(Array.of(new Org('Org 1',TreeItemCollapsibleState.Collapsed),new Org('Org 2',TreeItemCollapsibleState.Collapsed)));
        else return Promise.resolve([]);
    }

}

export class Org extends TreeItem{
    constructor(label:string,collapsibleState: TreeItemCollapsibleState){
        super(label,collapsibleState);
    }

}
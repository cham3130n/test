import { INode } from '../interfaces/INode';

export class Node implements INode {
    protected _name: string;
    protected _parent: INode;

    /**
     * Constructor
     * @param name
     * @param parent
     */
    constructor(name: string, parent: INode = null) {
        if (name === '' && parent !== null) {
            throw Error('Directory name cannot be empty.');
        }
        // TODO check invalid characters in the name
        this._name = name;
        this._parent = parent;
    }

    /**
     * Name getter
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Parent INode getter
     */
    public get parent(): INode {
        return this._parent;
    }

    /**
     * Parent INode setter
     * @param parent
     * TODO check security issues about illegal parent change
     */
    public set parent(parent: INode) {
        this._parent = parent;
    }

    /**
     * Full node path from root
     */
    public get path(): string {
        return `${this?.parent?.name || ''}/${this.name}`;
    }
}
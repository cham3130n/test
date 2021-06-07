import { INode } from '../interfaces/INode';
import { Node } from './Node';

/**
 * Directory type of INode
 */
export class Directory extends Node {
    private _nodes: INode[];

    /**
     * Constructor
     * @param name
     * @param parent
     * TODO need to protect external pushes to _nodes with __proto__
     */
    constructor(name: string, parent: INode = null) {
        super(name, parent);
        this._nodes = [];
        if (!parent) return;
        if (!(parent instanceof Directory)) {
            throw Error('Directory parent must be of a directory type.');
        }
    }

    /**
     * Add node to nodes list (no parent set in target node)
     * @param node
     */
    public addNode(node: INode): boolean {
        if (this === node) {
            throw Error('Cannot add node to itself.');
        }
        if (this._nodes.find(n => n === node)) {
            throw Error('Cannot add same node to folder twice, use copy instead.');
        }
        if (this._nodes.find(n => n.name === node.name)) {
            throw Error('Cannot add node with same name (check existing nodes in current folder).');
        }
        this._nodes.push(node);
        this._nodes.sort((a: INode, b: INode): number => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        });
        return true;
    }

    /**
     * Remove node from private list (no parent set in target node)
     * @param node
     */
    public removeNode(node: INode): boolean {
        if (!this._nodes.find(n => n === node)) {
            throw Error('Cannot remove node that is not belong to current folder.');
        }
        this._nodes = this._nodes.filter(t => t !== node);
        return false;
    }

    public get nodes(): INode[] {
        return this._nodes;
    }
}
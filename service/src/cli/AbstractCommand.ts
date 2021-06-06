import { ICommand } from "../interfaces/ICommand";
import {IFileSystem} from "../interfaces/IFileSystem";

/**
 * Abstract command with params count checking and FileSystem storing
 */
export class AbstractCommand implements ICommand {
    protected _paramsCount: number = null;
    protected _fs: IFileSystem;

    constructor(fs: IFileSystem) {
        this._fs = fs;
    }

    /**
     * execute command, just checks params count
     * @param params
     */
    public execute(params: string[]): string[] | null {
        if (this._paramsCount !== null && params.length !== this._paramsCount) {
            throw Error(`${this.constructor.name}: Exactly ${this._paramsCount} params needed.`);
        }
        return null;
    }
}
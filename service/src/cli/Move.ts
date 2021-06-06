import { ICommand } from '../interfaces/ICommand';
import { AbstractCommand } from './AbstractCommand';

/**
 * Move command
 */
export class Move extends AbstractCommand implements ICommand {
    protected _paramsCount = 2;
    public execute(params: string[]): string[] | null {
        super.execute(params);
        this._fs.moveNode.apply(this._fs, params);
        return null;
    }
}
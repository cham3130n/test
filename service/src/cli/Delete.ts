import { ICommand } from '../interfaces/ICommand';
import { AbstractCommand } from './AbstractCommand';

/**
 * Delete command
 */
export class Delete extends AbstractCommand implements ICommand {
    protected _paramsCount = 1;
    public execute(params: string[]): string[] | null {
        super.execute(params);
        this._fs.deleteNode.apply(this._fs, params);
        return null;
    }
}
import { ICommand } from '../interfaces/ICommand';
import { AbstractCommand } from './AbstractCommand';

/**
 * List command
 */
export class List extends AbstractCommand implements ICommand {
    protected _paramsCount = 0;
    public execute(params: string[]): string[] | null {
        super.execute(params);
        return this._fs.list.apply(this._fs, params);
    }
}
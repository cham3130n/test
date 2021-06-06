import { ICommand } from '../interfaces/ICommand';
import { AbstractCommand } from './AbstractCommand';

/**
 * Create command
 */
export class Create extends AbstractCommand implements ICommand {
    protected _paramsCount = 1;
    public execute(params: string[]): string[] | null {
        super.execute(params);
        this._fs.createDirectory.apply(this._fs, params);
        return null;
    }
}
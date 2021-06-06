/**
 * Simple interface of any command for command processor
 */
export interface ICommand {
    /**
     * Execute command being sent
     * @param params array of cli params, split by space symbol
     * @return string[]
     * @throws Error
     */
    execute (params: string[]): string[] | null;
}

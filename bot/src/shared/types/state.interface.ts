export interface StateService<T = unknown> {
    getState: (key: string | number) => Promise<T>;
    setState: (key: string | number, payload: Partial<T>) => Promise<T>;
}

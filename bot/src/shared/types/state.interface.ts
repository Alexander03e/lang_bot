export interface StateService {
    getState: (key: string | number) => Promise<unknown>
    setState: (key: string | number, payload: unknown) => Promise<void>

}
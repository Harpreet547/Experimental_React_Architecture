export type loadState = 'Loaded' | 'Loading' | 'Failed' | 'NotLoaded';

export interface IError {
    message?: string;
    stack?: string;
    name?: string;
}
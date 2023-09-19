export interface IRequestData {
    method: string; // will if need assembly name and namespace too
    type: 'GET' | 'POST';
    data?: unknown;
}
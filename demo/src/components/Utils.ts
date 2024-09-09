
export const addDelay = async <T,>(val: T, delayMS: number) => {
    return new Promise<T>((resolve) => {
        setTimeout(() => resolve(val), delayMS);
    });
}
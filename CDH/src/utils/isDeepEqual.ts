
export const isDeepEqual = (object1: unknown, object2: unknown) => {
    if (
        object1 === null && object2 === null
    ) return true;

    if (object1 === null || object2 === null) return false;

    if (
        !isObject(object1) &&
        !isObject(object2)
    ) return false;

    const objKeys1 = Object.keys(object1 as Record<string, unknown> | unknown[]);
    const objKeys2 = Object.keys(object2 as Record<string, unknown> | unknown[]);

    if (objKeys1.length !== objKeys2.length) return false;

    for (const key of objKeys1) {
        const value1 = (object1 as Record<string, unknown>)[key];
        const value2 = (object2 as Record<string, unknown>)[key];

        const isObjects = isObject(value1) && isObject(value2);

        if ((isObjects && !isDeepEqual(value1, value2)) ||
            (!isObjects && value1 !== value2)
        ) {
            return false;
        }
    }
    return true;
};

const isObject = (object: unknown) => {
    return object !== null && typeof object === "object";
};

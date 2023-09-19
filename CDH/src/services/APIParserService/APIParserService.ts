
const getRows = <T>(data: unknown) => {
    if(!data || !Array.isArray(data))
        throw new Error(`type of data is ${typeof data}. Which is not a collection.`);

    if(data.length !== 0 && (typeof data[0] !== 'object'))
        throw new Error(`type of data[0] is ${typeof data[0]}. Which is not an object. Rows in collection should be objects`);

    return data as T[];
};

const getObject = (data: unknown) => {
    if(!data || typeof data !== 'object' || Array.isArray(data))
        throw new Error(`type of data is ${typeof data}. Which is not an Object.`);

    return data  as Record<string, unknown>;
};

const APIParserService = {
    getRows,
    getObject,
};
export default APIParserService;
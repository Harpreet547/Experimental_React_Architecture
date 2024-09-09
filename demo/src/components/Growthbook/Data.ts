import { addDelay } from "../Utils";

export const getStudents = async () => {
    return addDelay([{
        id: 1,
        studentName: 'John Doe',
    }, {
        id: 2,
        studentName: 'Jane Doe',
    }, {
        id: 3,
        studentName: 'John Smith',
    }, {
        id: 4,
        studentName: 'Jane Smith',
    }, {
        id: 5,
        studentName: 'John Johnson',
    }, {
        id: 6,
        studentName: 'Jane Johnson',
    }, {
        id: 7,
        studentName: 'John Brown',
    }, {
        id: 8,
        studentName: 'Jane Brown',
    }, {
        id: 9,
        studentName: 'John Davis',
    }, {
        id: 10,
        studentName: 'Jane Davis',
    }], 2000);
};

export const getEntities = async () => {
    return addDelay([{
        id: 1,
        entityName: 'Entity 1',
    }, {
        id: 2,
        entityName: 'Entity 2',
    }], 2000);
};

export interface ITag extends Record<string, unknown> {
    tagID: string;
    entityID: number;
    name: string;
}
export const getTagsForEntity = async (entityID: number) => {
    return addDelay([{
        tagID: `Tag_1_${entityID}`,
        entityID: entityID,
        name: `Tag 1 ${entityID}`,
    }, {
        tagID: `Tag_2_${entityID}`,
        entityID: entityID,
        name: `Tag 2 ${entityID}`,
    }], 2000);
};

const proficiencies = [{
    proficiencyID: 1,
    title: 'Proficiency 1',
}, {
    proficiencyID: 2,
    title: 'Proficiency 2',
}, {
    proficiencyID: 3,
    title: 'Proficiency 3',
}, {
    proficiencyID: 4,
    title: 'Proficiency 4',
}];
export const getProficiencies = async () => {
    return addDelay(proficiencies, 2000);
};

export const getProficiencyIDForShortcut = (shortcut: string) => {
    if (isNaN(parseInt(shortcut))) return undefined;

    return proficiencies.find((proficiency) => proficiency.proficiencyID === parseInt(shortcut))?.proficiencyID;
};

export const getProficiencyTitle = (proficiencyID: number) => {
    return proficiencies.find((proficiency) => proficiency.proficiencyID === proficiencyID)?.title;
};
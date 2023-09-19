import React from 'react';
import { CollectionService, IQuestion, RootState } from '@harpreet547/cdh';
import { useSelector } from 'react-redux';
import useControlFromOption from './Hooks/useControlFromOption';

interface IDynamicQuestionProps {
    collectionID: string;
    index: number;
    optionIndex: number;
}
const DynamicQuestion: React.FC<IDynamicQuestionProps> = (props: IDynamicQuestionProps): React.ReactElement => {
    const { collectionID, index, optionIndex } = props;

    const option = useSelector((state: RootState) => {
        const question = CollectionService.get<IQuestion>(collectionID, state)?.rows?.[index];
        const option = question?.options?.[optionIndex];
        return option;
    });

    const Control = useControlFromOption(option, collectionID, index, optionIndex);

    return (
        <>
            {
                Control
            }
        </>
    );
};
export default DynamicQuestion;
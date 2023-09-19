import React from 'react';
import { CollectionService, IQuestion, RootState } from '@harpreet547/cdh';
import { useSelector } from 'react-redux';
import useGetControlForOption from './useGetControlForOption';


interface IOptionProps {
    collectionID: string;
    index: number;
    optionIndex: number;
}
const Option: React.FC<IOptionProps> = (props: IOptionProps): React.ReactElement => {
    const { collectionID, index, optionIndex } = props;

    const option = useSelector((state: RootState) => {
        const question = CollectionService.get<IQuestion>(collectionID, state)?.rows?.[index];
        const option = question?.options?.[optionIndex];
        return option;
    });

    const Control = useGetControlForOption(option, optionIndex, index, collectionID);

    return (
        <>
            {
                Control
            }
        </>
    );
};
export default Option;
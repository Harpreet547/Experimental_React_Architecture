import React from 'react';
import { View } from 'react-native';
import TextField from '../Controls/TextField/TextField';
import Option from './Option/Option';

interface IQuestionProps {
    collectionID: string; // Question will be part of questions array
    index: number; // index of question in id
}
/**
 * @depricated
 * @param props 
 * @returns 
 */
const Question: React.FC<IQuestionProps> = (props: IQuestionProps): React.ReactElement => {
    const { collectionID, index } = props;

    return (
        <View>
            <TextField
                label='Title'
                databind={{ collectionID, fieldName: 'title', index }}
            />

            <Option
                collectionID={collectionID}
                index={index}
                optionIndex={0} // TODO
            />
        </View>
    );
};
export default Question;
import { ObjectService, RootState, useObject } from '@harpreet547/cdh';
import React, { useCallback } from 'react';
import Province from './Components/Province';
import { Form_ObjectID } from './constants';
import School from './Components/School';
import { useSelector, useStore } from 'react-redux';
import { Button } from '@harpreet547/cwc';

const FormDemo: React.FC = (): React.ReactElement => {

    const store = useStore<RootState>();

    useObject(
        Form_ObjectID,
        undefined,
        true,
        false,
        {
            province: { value: null },
            school: { value: null }
        }
    );

    const provinceID = useSelector((state: RootState) => {
        return ObjectService.getField(Form_ObjectID, 'province', state);
    });

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fields = ObjectService.get(
            Form_ObjectID,
            store.getState()
        )?.fields;

        console.log(fields);
    }, [store]);

    return (
        <form
            id='form'
            onSubmit={onSubmit}
        >
            <Province />
            <School
                provinceID={provinceID as number | undefined}
            />
            <Button
                type='submit'
                label='Submit'
                form='form'
            />
        </ form>
    );
};
export default FormDemo;
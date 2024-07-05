import React from 'react';
import { useSelector } from 'react-redux';
import useObject from '@harpreet547/cdh/dist/hooks/useObject';
import ObjectService from '@harpreet547/cdh/dist/services/ObjectService/ObjectService';
import { RootState } from '@harpreet547/cdh/dist/store/Store';
import DropdownDemo from './DropdownDemo/DropdownDemo';
import ListViewDemo from './ListViewDemo/ListViewDemo';
import { DEMO_CONFIG_OBJECT_ID } from './constants';
import { Switch } from '@harpreet547/cwc';

const Demo: React.FC = (): React.ReactElement => {

    useObject(DEMO_CONFIG_OBJECT_ID, undefined, true, false, {
        showDropdownReduxDemo: { value: false },
        showDropdownEventDemo: { value: false },
        showListViewDemo: { value: false },
    });

    const showListViewDemo = useSelector((state: RootState) => ObjectService.getField(DEMO_CONFIG_OBJECT_ID, 'showListViewDemo', state) as boolean);

    return (
        <>
            <Switch
                label="Show Listview Demo"
                databind={{ objectID: DEMO_CONFIG_OBJECT_ID, fieldName: 'showListViewDemo' }}
            />

            <DropdownDemo />

            {
                showListViewDemo && (
                    <>
                        <hr
                            style={{
                                marginTop: '50px',
                            }}
                        />

                        <ListViewDemo />
                    </>
                )
            }
        </>
    );
};

export default Demo;

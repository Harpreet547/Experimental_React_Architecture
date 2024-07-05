import React from "react";
import { ObjectService, RootState } from "@harpreet547/cdh";
import UsingRedux from "./components/UsingRedux";
import UsingEvents from "./components/UsingEvents";
import { Switch } from "@harpreet547/cwc";
import { useSelector } from "react-redux";
import { DEMO_CONFIG_OBJECT_ID } from "../constants";

const DropdownDemo: React.FC = (): React.ReactElement => {

    const showReduxDemo = useSelector((state: RootState) => ObjectService.getField(DEMO_CONFIG_OBJECT_ID, 'showDropdownReduxDemo', state) as boolean);
    const showEventDemo = useSelector((state: RootState) => ObjectService.getField(DEMO_CONFIG_OBJECT_ID, 'showDropdownEventDemo', state) as boolean);

    return (
        <>
            <h1>Dropdown Demo</h1>

            <Switch
                label="Show Dropdown Event Demo"
                databind={{ objectID: DEMO_CONFIG_OBJECT_ID, fieldName: 'showDropdownEventDemo' }}
            />

            <Switch
                label="Show Dropdown Redux Demo"
                databind={{ objectID: DEMO_CONFIG_OBJECT_ID, fieldName: 'showDropdownReduxDemo' }}
            />

            {
                showEventDemo && (
                    <>
                        <hr />

                        <UsingEvents />
                    </>
                )
            }


            {
                showReduxDemo && (
                    <>
                        <hr
                            style={{
                                marginTop: '50px',
                            }}
                        />

                        <UsingRedux />
                    </>
                )
            }
        </>
    );
};
export default DropdownDemo;
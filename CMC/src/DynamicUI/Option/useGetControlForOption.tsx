import React, { useCallback, useEffect } from "react";
import {
    CollectionService,
    ComplexDatabindService,
    DynamicControlType,
    IDynamicOptionDependencies,
    IOption,
    IQuestion,
    RootState,
    isDeepEqual,
    useCollection
} from "@harpreet547/cdh";
import { useId, useMemo } from "react";
import { IOptionSettings } from "./Types";
import RadioGroupForOption from "./RadioGroupForOption";
import CheckboxGroupForOption from "./CheckboxGroupForOption";
import TextBoxForOption from "./TextBoxForOption";
import SwitchForOption from "./SwitchForOption";
import DropdownForOption from "./DropdownForOption";
import MultiSelectTextBoxForOption from "./MultiSelectTextBoxForOption";
import { useSelector, useStore } from "react-redux";

const useGetControlForOption = (
    option: IOption | undefined,
    optionIndex: number,
    index?: number,
    collectionID?: string,
    controlSettings?: IOptionSettings
) => {
    const { datasource, title, typeId, questionDetailId } = option ?? {};

    const { methodName, argumentList: args } = datasource ?? {};
    const { dependencies } = args ?? {};

    const DataSourceID = useId();
    const finalDataSourceID = datasource?.methodName ? (
        datasource.methodName + questionDetailId
    ) : (
        DataSourceID + DynamicControlType[typeId ?? DynamicControlType.CHECKBOX]
    );

    const store = useStore<RootState>();

    const databind = useMemo(() => (
        collectionID && index !== undefined ? { collectionID: collectionID, index, fieldName: `options.${optionIndex}.answer` } : undefined
    ), [collectionID, index, optionIndex]);

    useCollection(
        finalDataSourceID, // CollectionID
        datasource?.methodName ? { // Arguments
            method: datasource?.methodName,
            type: 'POST',
        } : undefined,
        !!datasource?.methodName || !!datasource?.values, //Declare
        false, /* !!datasource?.methodName, */ // Auto load
        datasource?.values ?? undefined // Rows
    );

    const depsSelectorFunction = useCallback((state: RootState) => {
        if (typeof index !== 'number' || !collectionID || !methodName || !dependencies || dependencies.length === 0) return null;

        return dependencies?.map((dependency): IDynamicOptionDependencies => {
            const options = CollectionService.get<IQuestion>(collectionID, state)?.rows?.[index].options;
            const answer = options?.find(option => option.questionDetailId === dependency.optionID)?.answer;

            return {
                ...dependency,
                selectedOptions: Array.isArray(answer) ? answer as IOption['answer'] : answer ? [answer as number] : []
            };
        });
    }, [collectionID, dependencies, index, methodName]);

    const deps = useSelector(depsSelectorFunction, isDeepEqual/* (val1, val2) => JSON.stringify(val1) === JSON.stringify(val2) */);

    const depsAnswerSelector = useCallback((state: RootState) => {
        if (typeof index !== 'number' || !collectionID || !methodName || !dependencies || dependencies.length === 0) return null;

        return dependencies?.map((dependency) => {
            const options = CollectionService.get<IQuestion>(collectionID, state)?.rows?.[index].options;
            const answer = options?.find(option => option.questionDetailId === dependency.optionID)?.answer;

            return answer;
        });
    }, [collectionID, dependencies, index, methodName]);
    const depsAnswer = useSelector(depsAnswerSelector, isDeepEqual);

    useEffect(() => {
        if (!methodName) return;

        void CollectionService.loadWithRequestData(
            finalDataSourceID,
            {
                method: methodName,
                type: 'POST',
                data: {
                    "userId": 0,
                    "locale": "en-US",
                    argumentList: {
                        ...args,
                        dependencies: deps ?? [],
                        conditions: args?.conditions ?? [],
                    }
                },
            },
            store
        );
    }, [args, deps, finalDataSourceID, methodName, store]);

    useEffect(() => {
        if (!databind) return;

        ComplexDatabindService.updateRowBoundValue(databind, null, store);
    }, [databind, depsAnswer, store]);

    const Control = useMemo(() => {
        if (!datasource) return null;

        switch (typeId) {
            case DynamicControlType.RADIOGROUP:
                return (
                    <RadioGroupForOption
                        finalDataSourceID={finalDataSourceID}
                        databind={databind}
                        datasource={datasource}
                        title={title}
                    />
                );
            case DynamicControlType.CHECKBOX:
                return (
                    <CheckboxGroupForOption
                        finalDataSourceID={finalDataSourceID}
                        datasource={datasource}
                        title={title}
                        databind={databind}
                    />
                );
            case DynamicControlType.TEXTBOX:
                return (
                    <TextBoxForOption
                        databind={databind}
                        title={title}
                        settings={controlSettings}
                    />
                );
            case DynamicControlType.TOGGLE:
                return (
                    <SwitchForOption
                        collectionID={finalDataSourceID}
                        databind={databind}
                        datasource={datasource}
                        title={title}
                        settings={controlSettings}
                    />
                );
            case DynamicControlType.DROPDOWN:
                return (
                    <DropdownForOption
                        databind={databind}
                        datasource={datasource}
                        finalDataSourceID={finalDataSourceID}
                        title={title}
                        settings={controlSettings}
                    />
                );
            case DynamicControlType.MULTISELECTTEXTBOX:
                return (
                    <MultiSelectTextBoxForOption
                        databind={databind}
                        title={title}
                        settings={controlSettings}
                    />
                );
            default:
                return null;
        }
    }, [controlSettings, databind, datasource, finalDataSourceID, title, typeId]);

    return Control;
};
export default useGetControlForOption;
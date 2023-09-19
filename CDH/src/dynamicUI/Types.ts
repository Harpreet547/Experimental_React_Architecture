import { IKeyValueDataSource, IKeyValueElement } from "../services/DataSourceService/Types";

export enum DynamicControlType {
    DROPDOWN = 1,
    CHECKBOX = 3,
    RADIOGROUP = 4,
    TEXTBOX = 2,
    SLIDER = 5,
    TOGGLE = 7,
    MULTISELECTTEXTBOX = 9,
}

export interface IDynamicOptionDependencies {
    masterName?: string;
    optionID?: number;
    selectedOptions?: IOption['answer'];
}
export interface IDynamicOptionArguments {
    dependencies: IDynamicOptionDependencies[];
    conditions: Record<string, unknown>[] | null;
}
export interface DynamicControlTypeDataSource extends Partial<Omit<IKeyValueDataSource, 'collectionID'>> {
    methodName?: string;
    values?: IKeyValueElement[] | null;
    argumentList?: IDynamicOptionArguments | null; //arguments
}
/**
 * {
  "options": [
    {
      "questionDetailId": 0,
      "title": "string",
      "type": "string",
      "typeId": 0,
      "datasource": {
        "methodName": "getPARTY",
        "arguments": {
          "dependencies": [{
            "masterName": "state",
            "optionID": 1,
            "selectedOption": null
          }],
          
        },
        "keyField": "string",
        "valueField": "string",
        "optionValues": "string",
        "values": [
          {
            "key": 0,
            "value": "string"
          }
        ],
        "slider": {
          "minValue": 0,
          "maxValue": 0,
          "numOrPercentage": "string"
        }
      },
      "datasourceType": "string",
      "answer": "string",
      "sequence": 0,
      "questionWeight": 0
    }
  ]
}
 */

export interface IQuestion {
    questionText: string | null;
    options: IOption[];
    questionId: number;
}

export interface IOption {
    title: string | null;
    questionDetailId: number; // ID will always be there in mobile but not in admin
    type: null; // TODO: confirm with Hanmant
    typeId: DynamicControlType | null;
    datasourceType: DatasourceType | null;
    datasource: DynamicControlTypeDataSource | null;
    answer: string | number | null | number[] | string[];
}

export enum DatasourceType {
    FromDB = 'FromDB',
    Manual = 'Manual',
}

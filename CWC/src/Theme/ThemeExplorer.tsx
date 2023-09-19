import React, { useState } from "react";
import { lightTheme } from "./Theme";
import TextBox from "../Controls/TextBox/TextBox";
import { InputOnChangeData } from "@fluentui/react-components";

const ThemeExplorer: React.FC = (): React.ReactElement => {

    const [filter, setFilter] = useState<string>();

    return (
        <div>
            <TextBox
                label="Filter"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setFilter(data.value)}
            />
            {
                Object.entries(lightTheme).filter(kvp => !filter ? true : kvp[0].toLowerCase().includes(filter.toLowerCase())).map(kvp => {
                    const [key, value] = kvp;
                    return (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>
                                {
                                    key.startsWith('color') ? (
                                        <div style={{ ...colorBoxStyles(value as string), display: 'inline-block' }} />
                                    ) : null
                                }
                                {
                                    key.startsWith('shadow') ? (
                                        <div style={{ ...borderBoxStyles, boxShadow: value as string }} />
                                    ) : null
                                }
                                {
                                    key.startsWith('borderRadius') ? (
                                        <div style={{ ...borderBoxStyles, borderRadius: value as string }} />
                                    ) : null
                                }
                                <span
                                    style={{ fontFamily: key.startsWith('fontFamily') ? value as string : 'monospace' }}
                                >
                                    {value}
                                </span>
                            </td>
                        </tr>
                    );
                })
            }
        </div>
    );
};
export default ThemeExplorer;

const colorBoxStyles = (slotColor: string) => ({
    height: '40px',
    width: '40px',
    backgroundColor: slotColor,
    marginRight: '10px',
    border: '1px solid gray',
});

const borderBoxStyles = {
    ...colorBoxStyles('white'),
    width: 40,
    height: 40,
    display: 'inline-block'
};
import React from "react";
import {
    TableCellLayout,
    TableColumnDefinition,
    createTableColumn,
} from "@fluentui/react-components";

export interface IColumnDefinition {
    columnId: string;
    compare?: (a: unknown, b: unknown) => number;
    headerLabel?: string;
    renderHeaderCell?: (data: unknown) => React.ReactElement;
    fieldName?: string;
    renderCell?: (item: unknown) => React.ReactElement;
}
const getColumn = (props: IColumnDefinition): TableColumnDefinition<unknown> => {
    const {
        columnId,
        compare,
        headerLabel,
        renderHeaderCell,
        fieldName,
        renderCell,
    } = props;
    return createTableColumn({
        columnId: columnId,
        compare: compare,
        renderHeaderCell: renderHeaderCell ?? (() => {
            return headerLabel ?? '';
        }),
        renderCell: renderCell ?? ((item: unknown) => {
            return (
                <TableCellLayout>
                    {
                        (item as Record<string, unknown>)[fieldName as string] as string
                    }
                </TableCellLayout>
            );
        }),
    });
};
export default getColumn;
import React, { useMemo } from "react";
import {
    DataGridBody,
    DataGridRow,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridCell,
    TableColumnDefinition,
    TableRowId
} from "@fluentui/react-components";
import getColumn, { IColumnDefinition } from "./Column";

interface ITableProps {
    columnDefinitions: IColumnDefinition[];
    rows: Record<string, unknown>[];
    getRowID: (item: Record<string, unknown>) => TableRowId;
}
const Table: React.FC<ITableProps> = (props: ITableProps): React.ReactElement => {
    const {
        columnDefinitions,
        rows,
        getRowID
    } = props;

    const columns = useMemo(() => getColumns(columnDefinitions), [columnDefinitions]);

    return (
        <DataGrid
            items={rows}
            columns={columns}
            // sortable
            // selectionMode="multiselect"
            getRowId={getRowID}
            focusMode="cell"
        // style={{ minWidth: "550px" }}
        >
            <DataGridHeader>
                <DataGridRow
                    selectionCell={{
                        checkboxIndicator: { "aria-label": "Select all rows" },
                    }}
                >
                    {({ renderHeaderCell }) => (
                        <DataGridHeaderCell>
                            {renderHeaderCell()}
                        </DataGridHeaderCell>
                    )}
                </DataGridRow>

                <DataGridBody>
                    {({ item, rowId }) => (
                        <DataGridRow
                            key={rowId}
                            selectionCell={{
                                checkboxIndicator: { "aria-label": "Select row" },
                            }}
                        >
                            {({ renderCell }) => (
                                <DataGridCell
                                    focusMode="group"
                                >
                                    {renderCell(item)}
                                </DataGridCell>
                            )}
                        </DataGridRow>
                    )}
                </DataGridBody>
            </DataGridHeader>
        </DataGrid>
    );
};
export default Table;

const getColumns = (columns: IColumnDefinition[]): TableColumnDefinition<unknown>[] => {
    return columns.map((column) => {
        return getColumn({
            columnId: column.columnId,
            compare: column.compare,
            renderHeaderCell: column.renderHeaderCell,
            renderCell: column.renderCell,
            fieldName: column.fieldName,
            headerLabel: column.headerLabel,
        });
    });
};
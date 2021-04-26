import React from 'react';
import { DataGrid, GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { Sheep } from '../types';

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 150 },
    { field: 'isBranded', headerName: 'Branded', width: 150 },
];

/**
 * Renders the table with the sheep
 * @param sheep
 * @param handleSelect
 * @constructor
 */
const SheepTable = ({ sheep, handleSelect }: SheepTableProps) => {
    /**
     * Transforms the data to the right format
     * for data grid table
     */
    const getRows = (): object[] =>
        Object.keys(sheep).map((id) => ({
            id,
            ...sheep[id],
            isBranded: sheep[id].isBranded ? 'Yes' : 'No',
        }));

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                onSelectionModelChange={handleSelect}
                rows={getRows()}
                columns={columns}
                pageSize={5}
                checkboxSelection
            />
        </div>
    );
};

interface SheepTableProps {
    sheep: { [key: string]: Sheep };
    handleSelect: (param: GridSelectionModelChangeParams) => void;
}

export { SheepTable };

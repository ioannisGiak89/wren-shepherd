import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Sheep } from '../types';

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 150 },
    { field: 'isBranded', headerName: 'Branded', width: 150 },
];

const SheepTable = ({ sheep }: SheepTableProps) => {
    const getRows = () =>
        Object.keys(sheep).map((id) => ({
            id,
            ...sheep[id],
        }));

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                // onSelectionModelChange={handleSelect}
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
    // handleSelect: (param: GridSelectionModelChangeParams) => void;
}

export { SheepTable };

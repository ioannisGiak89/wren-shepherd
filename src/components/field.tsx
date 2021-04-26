import React from 'react';
import { range } from 'lodash';
import { GreenBox } from './greenBox';
import { Sheep } from '../types';
import { find, findKey } from 'lodash';

const Field = ({ gridWidth, sheep, handleBranding }: FieldProps) => {
    const gridColumns: number = 5;
    const gridRows: number = 5;
    const numberOfBoxes: number = gridRows * gridColumns;

    return (
        <>
            {range(numberOfBoxes).map((box: number) => {
                const sheepIntoBox = find(sheep, (sheep: Sheep) => sheep.box === box);
                const sheepID = findKey(sheep, (sheep: Sheep) => sheep.box === box);
                return (
                    <GreenBox
                        key={box}
                        sheepIntoBox={sheepIntoBox}
                        sheepID={sheepID}
                        gridColumns={gridColumns}
                        box={box}
                        gridWidth={gridWidth}
                        handleBranding={handleBranding}
                    />
                );
            })}
        </>
    );
};

interface FieldProps {
    gridWidth: number;
    sheep: { [key: string]: Sheep };
    handleBranding: (id: string, isBranded: boolean) => void;
}

export { Field };

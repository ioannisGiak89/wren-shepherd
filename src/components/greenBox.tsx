import React, { ReactNode } from 'react';
import MaleSheep from '../../public/male-sheep.svg';
import FemaleSheep from '../../public/female-sheep.svg';
import BrandedSheep from '../../public/branded-sheep.svg';
import { Sheep } from '../types';

const useStyles = (props: any): { [key: string]: React.CSSProperties } => {
    const { gridWidth, gridHeight, top, left, isSelectedForMating } = props;
    return {
        box: {
            position: 'absolute',
            border: '1px solid #454545',
            width: gridWidth - 1,
            height: gridHeight - 1,
            top: top + 50,
            left: left + 200,
            backgroundColor: isSelectedForMating ? '#fc037b' : '#219c29',
        },
    };
};

/**
 * Renders the box where sheep live
 *
 * @param gridColumns
 * @param box
 * @param gridWidth
 * @param sheepIntoBox
 * @param handleBranding
 * @param sheepID
 * @param matingList
 * @constructor
 */
const GreenBox = ({
    gridColumns,
    box,
    gridWidth,
    sheepIntoBox,
    handleBranding,
    sheepID,
    matingList,
}: GreenBoxProps) => {
    const gridHeight: number = 140;
    const y: number = Math.floor(box / gridColumns) * gridHeight;
    const x: number = (box * gridWidth) % (gridColumns * gridWidth);
    const isSelectedForMating = sheepID && matingList.includes(sheepID);
    const styles: React.CSSProperties = useStyles({
        gridWidth,
        gridHeight,
        top: y,
        left: x,
        isSelectedForMating,
    }).box;

    const handleClick = () => {
        if (sheepID && sheepIntoBox) {
            handleBranding(sheepID, !sheepIntoBox.isBranded);
        }
    };

    /**
     * Returns the right image to display for each sheep
     */
    const getSheepImage = (): ReactNode => {
        if (!sheepIntoBox) {
            return null;
        }

        if (sheepIntoBox.isBranded) {
            return <BrandedSheep onClick={handleClick} width={gridWidth - 10} height={140} />;
        }

        return sheepIntoBox.gender === 'male' ? (
            <MaleSheep onClick={handleClick} width={gridWidth - 10} height={140} />
        ) : (
            <FemaleSheep onClick={handleClick} width={gridWidth - 10} height={140} />
        );
    };

    return <div style={styles}>{getSheepImage()}</div>;
};

interface GreenBoxProps {
    gridColumns: number;
    box: number;
    gridWidth: number;
    sheepIntoBox?: Sheep;
    sheepID?: string;
    handleBranding: (id: string, isBranded: boolean) => void;
    matingList: (number | string)[];
}

export { GreenBox };

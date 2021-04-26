import { Sheep } from '../types';

/**
 * Calculates the logic for breeding
 * @param setMessage
 */
const isBreedingPossible = (setMessage: React.Dispatch<string>) => (
    matingList: (string | number)[],
    sheep: { [key: string]: Sheep },
    totalSheep: number
): boolean => {
    if (!(matingList.length === 2)) {
        setMessage('You need to select only two sheep in order to be able to breed.');
        return false;
    }

    const firstSheep = sheep[matingList[0]];
    const secondSheep = sheep[matingList[1]];

    if (firstSheep.isBranded || secondSheep.isBranded) {
        setMessage('Remember, branded sheep are not able to breed!');
        return false;
    }

    if (firstSheep.gender === secondSheep.gender) {
        setMessage('Sheep of the same gender cannot breed :(');
        return false;
    }

    if (totalSheep === 25) {
        setMessage('There is no more space in your field. Be sustainable :)');
        return false;
    }

    return true;
};

export { isBreedingPossible };

import { isBreedingPossible } from '../isBreedingPossible';

describe('isBreedingPossible', () => {
    const setMessageMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should allow breeding', () => {
        const sheep = {
            'fce8e0b7-ac7e-42c7-ba5d-9a17176bfd07': {
                name: 'Philip',
                gender: 'male',
                isBranded: false,
                box: 3,
            },
            '30d62936-b4a7-46c5-a823-7c7f8ba9b30c': {
                name: 'Ida',
                gender: 'female',
                isBranded: false,
                box: 4,
            },
        };

        const res = isBreedingPossible(setMessageMock)(
            ['fce8e0b7-ac7e-42c7-ba5d-9a17176bfd07', '30d62936-b4a7-46c5-a823-7c7f8ba9b30c'],
            sheep,
            2
        );
        expect(res).toBe(true);
    });

    it('should not allow breeding when other than 2 sheep have selected', () => {
        const sheep = {
            'fce8e0b7-ac7e-42c7-ba5d-9a17176bfd07': {
                name: 'Philip',
                gender: 'male',
                isBranded: false,
                box: 3,
            },
            '30d62936-b4a7-46c5-a823-7c7f8ba9b30c': {
                name: 'Ida',
                gender: 'female',
                isBranded: false,
                box: 4,
            },
            '159d4e98-be55-4957-8299-92efc4a28add': {
                name: 'Kristen',
                gender: 'female',
                isBranded: false,
                box: 5,
            },
        };

        const res = isBreedingPossible(setMessageMock)(
            [
                'fce8e0b7-ac7e-42c7-ba5d-9a17176bfd07',
                '30d62936-b4a7-46c5-a823-7c7f8ba9b30c',
                '159d4e98-be55-4957-8299-92efc4a28add',
            ],
            sheep,
            3
        );
        expect(res).toBe(false);
        expect(setMessageMock).toHaveBeenCalledWith(
            'You need to select only two sheep in order to be able to breed.'
        );
    });

    it('should not allow breeding when at least one sheep is branded', () => {
        const sheep = {
            'fce8e0b7-ac7e-42c7-ba5d-9a17176bfd07': {
                name: 'Philip',
                gender: 'male',
                isBranded: false,
                box: 3,
            },
            '30d62936-b4a7-46c5-a823-7c7f8ba9b30c': {
                name: 'Ida',
                gender: 'female',
                isBranded: true,
                box: 4,
            },
            '159d4e98-be55-4957-8299-92efc4a28add': {
                name: 'Kristen',
                gender: 'female',
                isBranded: false,
                box: 5,
            },
        };

        const res = isBreedingPossible(setMessageMock)(
            ['fce8e0b7-ac7e-42c7-ba5d-9a17176bfd07', '30d62936-b4a7-46c5-a823-7c7f8ba9b30c'],
            sheep,
            3
        );
        expect(res).toBe(false);
        expect(setMessageMock).toHaveBeenCalledWith(
            'Remember, branded sheep are not able to breed!'
        );
    });

    it('should not allow breeding when sheep have the same gender', () => {
        const sheep = {
            'fce8e0b7-ac7e-42c7-ba5d-9a17176bfd07': {
                name: 'Philip',
                gender: 'male',
                isBranded: false,
                box: 3,
            },
            '30d62936-b4a7-46c5-a823-7c7f8ba9b30c': {
                name: 'Ida',
                gender: 'female',
                isBranded: false,
                box: 4,
            },
            '159d4e98-be55-4957-8299-92efc4a28add': {
                name: 'Kristen',
                gender: 'female',
                isBranded: false,
                box: 5,
            },
        };

        const res = isBreedingPossible(setMessageMock)(
            ['30d62936-b4a7-46c5-a823-7c7f8ba9b30c', '159d4e98-be55-4957-8299-92efc4a28add'],
            sheep,
            3
        );
        expect(res).toBe(false);
        expect(setMessageMock).toHaveBeenCalledWith('Sheep of the same gender cannot breed :(');
    });

    it('should not allow breeding when there is no more space', () => {
        const sheep = {
            'fce8e0b7-ac7e-42c7-ba5d-9a17176bfd07': {
                name: 'Philip',
                gender: 'male',
                isBranded: false,
                box: 3,
            },
            '30d62936-b4a7-46c5-a823-7c7f8ba9b30c': {
                name: 'Ida',
                gender: 'female',
                isBranded: false,
                box: 4,
            },
            '159d4e98-be55-4957-8299-92efc4a28add': {
                name: 'Kristen',
                gender: 'female',
                isBranded: false,
                box: 5,
            },
        };

        const res = isBreedingPossible(setMessageMock)(
            ['30d62936-b4a7-46c5-a823-7c7f8ba9b30c', 'fce8e0b7-ac7e-42c7-ba5d-9a17176bfd07'],
            sheep,
            25
        );
        expect(res).toBe(false);
        expect(setMessageMock).toHaveBeenCalledWith(
            'There is no more space in your field. Be sustainable :)'
        );
    });
});

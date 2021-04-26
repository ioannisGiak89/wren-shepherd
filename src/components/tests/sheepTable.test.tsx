import React from 'react';
import renderer from 'react-test-renderer';
import { SheepTable } from '../sheepTable';
import { testData } from './testData';

describe('sheepTable', () => {
    it('should display sheep data', () => {
        const sheepTable = renderer
            .create(<SheepTable sheep={testData} handleSelect={jest.fn()} />)
            .toJSON();
        expect(sheepTable).toMatchSnapshot();
    });
});

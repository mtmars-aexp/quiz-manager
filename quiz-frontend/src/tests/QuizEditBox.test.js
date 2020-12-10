import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

describe('CHANGEME', () => {
    it('CHANGEME', () => {
        expect(true).toBeTruthy();
    });
});
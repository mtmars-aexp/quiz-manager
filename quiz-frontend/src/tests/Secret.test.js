import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Secret from '../components/Secret';

Enzyme.configure({adapter: new Adapter()});

describe('The secret page', () => {
    it('is incredibly secretive.', () => {
        const wrapper = shallow(<Secret/>)
        expect(wrapper.text().includes("Secret page!")).toBe(true);
    });
});
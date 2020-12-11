import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Error from '../components/error';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

describe('The error page', () => {
    it('should contain a link to the homepage.', () => {
        //Setup wrapper
        const wrapper = shallow(<Error/>)

        expect(wrapper.find('[href="/"]')).toHaveLength(1);
    });
});
import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Login from '../components/Login';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

describe('The login page', () => {
    it('should render two input boxes', () => {
        //Setup wrapper
        const wrapper = shallow(<Login/>)

        //Assert
        expect(wrapper.find("input")).toHaveLength(2);
    });
    it('should call handleUsernameChange when username input is changed', () => {
        //Setup wrapper
        const wrapper = mount(<Login/>)

        //Change
        wrapper.find("input").first().simulate('change', { target: { value: 'hexdrone' } })

        //Assert
        expect(wrapper.state('username')).toBe("hexdrone");
    });
    it('should call handlePasswordChange when password input is changed', () => {
        //Setup wrapper
        const wrapper = mount(<Login/>)

        //Change
        wrapper.find("input").last().simulate('change', { target: { value: '5890' } })

        //Assert
        expect(wrapper.state('password')).toBe("5890");
    });
    it('should call handleFormSubmit when the form is submitted', () => {
        //Setup prop function spy
        const handleLoginSpy = jest.fn();

        //Setup wrapper
        const wrapper = mount(<Login handleLogin={handleLoginSpy}/>)

        //Setup other spy
        const instance = wrapper.instance();
        const handleFormSubmitSpy = jest.spyOn(instance, 'handleFormSubmit')
        wrapper.instance().forceUpdate();

        //Click
        wrapper.find("form").first().simulate('submit')

        //Assert
        expect(handleFormSubmitSpy).toBeCalled();
        expect(handleLoginSpy).toBeCalled();
    })
});
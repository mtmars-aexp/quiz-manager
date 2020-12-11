import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Navbar from '../components/Navbar'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

class LocalStorageMock{
    constructor(){
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }
    
      setItem(key, value) {
        this.store[key] = value.toString();
    }
}

describe("The navbar", () => {
    it("Should have 3 links", () => {
        const wrapper = shallow(<Navbar/>)
        expect(wrapper.find("a")).toHaveLength(3);
    });
    it("Should render the user name when logged in", () => {
        global.localStorage = new LocalStorageMock;
        localStorage.setItem("username", "10121F")
        const wrapper = shallow(<Navbar/>)
        expect(wrapper.text().includes('Welcome, 10121F')).toBe(true);
    });
    it("Should call handleLogout when the logout button is clicked", () => {
        const handleLogoutSpy = jest.fn();
        const wrapper = shallow(<Navbar handleLogout={handleLogoutSpy}/>)
        wrapper.find("a").last().simulate("click");
        expect(handleLogoutSpy).toBeCalled();
    });
});
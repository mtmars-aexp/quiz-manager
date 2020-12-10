import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import QuizSelector from '../components/QuizSelector';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

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

Enzyme.configure({adapter: new Adapter()});

describe('The quiz selector box', () => {
    it('renders the quiz name and description', () => {
        //Setup wrapper
        const wrapper = shallow(<QuizSelector name={"Test quiz!"} description={"Test quiz description!"}/>)
        expect(wrapper.text().includes('Test quiz!')).toBe(true);
        expect(wrapper.text().includes('Test quiz description!')).toBe(true);
    });

    it('renders the edit button if the user is privilege level 3.', () => {

        //Setup localStorage mock.
        global.localStorage = new LocalStorageMock
        localStorage.setItem("privilege", "3")

        //Setup wrapper
        const wrapper = shallow(<QuizSelector name={"Test quiz!"} description={"Test quiz description!"}/>)

        //Assert
        expect(wrapper.find('.quiz-edit')).toHaveLength(1);
    });

    it('does not render the edit button if user is below privilege level 3.', () =>{
        //Setup localStorage mock.
        global.localStorage = new LocalStorageMock
        localStorage.setItem("privilege", "1")

        //Setup wrapper
        const wrapper = shallow(<QuizSelector name={"Test quiz!"} description={"Test quiz description!"}/>)

        //Assert
        expect(wrapper.find('.quiz-edit')).toHaveLength(0);
    });
});
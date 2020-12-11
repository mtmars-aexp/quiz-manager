import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import QuizEditPage from '../components/QuizEditPage';
import QuizEditBox from '../components/QuizEditBox';

Enzyme.configure({adapter: new Adapter()});

describe('The quiz edit page', () => {
    it('should render the quiz name and description in two input boxes.', () => {
        //Setup state

        const state = {
            name: "Test quiz",
            description: "This is a fake quiz that isnt real!"
        }

        //Setup wrapper and apply state
        const wrapper = shallow(<QuizEditPage/>)
        wrapper.setState(state);

        //Assert
        expect(wrapper.find("input")).toHaveLength(2);
        expect(wrapper.find('input').first().props().value).toBe("Test quiz");
        expect(wrapper.find('input').last().props().value).toBe("This is a fake quiz that isnt real!");
    });
    it('should render an equal number of "QuizEditBox"es based on the amount of questions in its state.', () => {

        //Setup state
        const state = {
            name: "Test quiz",
            description: "This is a fake quiz that isnt real!",
            questions: [
                {
                    question_id: 1,
                    text: "Question one!"
                },
                {
                    question_id: 2,
                    text: "Question two!"
                }
            ]
        }

        //Setup wrapper and apply state
        const wrapper = shallow(<QuizEditPage/>)
        wrapper.setState(state);

        expect(wrapper.find(QuizEditBox)).toHaveLength(2);
    });
    it('should add a new question and save it in the state when the "new quiz" button is clicked.', () =>{
        //Setup state
        const state = {
            name: "Test quiz",
            description: "This is a fake quiz that isnt real!",
            questions: [
                {
                    question_id: 1,
                    text: "Question one!"
                },
                {
                    question_id: 2,
                    text: "Question two!"
                }
            ],
            highest_known_question_id: 2,
        }

        //Setup wrapper and apply state
        const wrapper = mount(<QuizEditPage/>)
        wrapper.setState(state);

        wrapper.find("button").last().simulate("click")
        expect(wrapper.state('questions').length).toBe(3);
    });
    it('should trigger the handleSubmit function when the "save changes" button is clicked.', () => {
        //Setup wrapper and apply state
        const wrapper = mount(<QuizEditPage/>)

        //Setup spy.
        const instance = wrapper.instance();
        const handleSubmitSpy = jest.spyOn(instance, 'handleSubmit')
        wrapper.instance().forceUpdate();

        //Simulate
        wrapper.find("button").first().simulate("click")

        //Assert
        expect(handleSubmitSpy).toHaveBeenCalled();
    });
});
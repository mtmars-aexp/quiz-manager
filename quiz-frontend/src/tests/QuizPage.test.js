import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import QuizAnswerBox from '../components/QuizAnswerBox';
import QuizPage from '../components/QuizPage';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

describe('The quiz page page', () => {
    it('should display the correct number of questions.', () => {

        //Setup test data
        const quiz_information = {
            name: "Test quiz!",
            description: "This is a test quiz!",
            questions: [
                {
                    text: "Question one.",
                    question_id: 1
                },
                {
                    text: "Question two.",
                    question_id: 2
                },
            ]
        }

        //Setup wrapper and state
        const wrapper = shallow(<QuizPage match={{params: {id: 1}, isExact: true, path: "", url: ""}}/>);
        wrapper.setState({quiz_information: quiz_information})

        //Assert
        expect(wrapper.find(QuizAnswerBox)).toHaveLength(2);
    });
    it('should call countScore when the count score button is clicked.', () => {

        //Setup wrapper
        const wrapper = shallow(<QuizPage match={{params: {id: 1}, isExact: true, path: "", url: ""}}/>);
        wrapper.setState({'selected_answers': {"1": "1", "2": "1", "3": "1"}});

        //Setup spy
        const instance = wrapper.instance();
        const countScoreSpy = jest.spyOn(instance, 'countScore')
        wrapper.instance().forceUpdate();

        //Assert
        wrapper.find('button').first().simulate('click')
        expect(countScoreSpy).toHaveBeenCalled();
        expect(wrapper.state('score')).toBe(3);
    });
});
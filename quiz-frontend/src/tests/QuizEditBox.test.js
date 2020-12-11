import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import QuizEditBox from '../components/QuizEditBox';

Enzyme.configure({adapter: new Adapter()});

describe('The quiz edit box', () => {
    it('to render a number of radio buttons depending on amount of answers in state.', () => {

        const state = {
            answers: [
                {
                    answer_id: 1,
                    text: "Hello",
                    question_id: 1
                },
                {
                    answer_id: 2,
                    text: "hewwo",
                    question_id: 1
                }
            ]
        }

        const wrapper = shallow(<QuizEditBox/>)
        wrapper.setState(state)
        expect(wrapper.find("input")).toHaveLength(3) // 2 + 1 for the question name input box.
    });
    it('calls handleAnswerBoxChange when an answer box is changed.', () => {

        //Setup state
        const state = {
            answers: [
                {
                    answer_id: 1,
                    text: "Hello",
                    question_id: 1
                },
                {
                    answer_id: 2,
                    text: "hewwo",
                    question_id: 1
                }
            ]
        }

        //Setup spy
        const handleAnswerChangeSpy = jest.fn();

        //Setup wrapper
        const wrapper = mount(<QuizEditBox handleAnswerChange={handleAnswerChangeSpy}/>)
        wrapper.setState(state)

        //Setup other spy
        const instance = wrapper.instance();
        const handleAnswerBoxChangeSpy = jest.spyOn(instance, 'handleAnswerBoxChange')
        wrapper.instance().forceUpdate();

        //Simulate
        wrapper.find('input').last().simulate('change', {name: 1, value: "new value"})

        //Assert
        expect(handleAnswerBoxChangeSpy).toBeCalled();
        expect(handleAnswerChangeSpy).toBeCalled();
    });
    it('calls handleQuestionChange when a question text box is changed.', () => {

        //Setup state
        const state = {
            answers: [
                {
                    answer_id: 1,
                    text: "Hello",
                    question_id: 1
                },
                {
                    answer_id: 2,
                    text: "hewwo",
                    question_id: 1
                }
            ]
        }

        //Setup spy
        const handleQuestionChangePropSpy = jest.fn();

        //Setup wrapper
        const wrapper = mount(<QuizEditBox handleQuestionChange={handleQuestionChangePropSpy}/>)
        wrapper.setState(state)

        //Setup other spy
        const instance = wrapper.instance();
        const handleQuestionChangeSpy = jest.spyOn(instance, 'handleQuestionChange')
        wrapper.instance().forceUpdate();

        //Simulate
        wrapper.find('input').first().simulate('change', {value: 'new value'})

        //Assert
        expect(handleQuestionChangePropSpy).toBeCalled();
        expect(handleQuestionChangeSpy).toBeCalled();
    });
    it('calls handleQuestionDelete when the delete button is clicked.', () => {

        //Setup state
        const state = {
            answers: [
                {
                    answer_id: 1,
                    text: "Hello",
                    question_id: 1
                },
                {
                    answer_id: 2,
                    text: "hewwo",
                    question_id: 1
                }
            ]
        }

        //Setup spy
        const handleQuestionDeletePropSpy = jest.fn();

        //Setup wrapper
        const wrapper = mount(<QuizEditBox handleQuestionDelete={handleQuestionDeletePropSpy}/>)
        wrapper.setState(state)

        //Setup other spy
        const instance = wrapper.instance();
        const handleQuestionDeleteSpy = jest.spyOn(instance, 'handleQuestionDelete')
        wrapper.instance().forceUpdate();

        //Simulate
        wrapper.find('a').first().simulate('click')

        //Assert
        expect(handleQuestionDeletePropSpy).toBeCalled();
        expect(handleQuestionDeleteSpy).toBeCalled();
    });
    it('calls handleCorrectAnswerChange when a new answer is selected from the dropdown box.', () => {

        //Setup state
        const state = {
            answers: [
                {
                    answer_id: 1,
                    text: "Hello",
                    question_id: 1
                },
                {
                    answer_id: 2,
                    text: "hewwo",
                    question_id: 1
                }
            ]
        }

        //Setup spy
        const handleCorrectAnswerChangePropSpy = jest.fn();

        //Setup wrapper
        const wrapper = mount(<QuizEditBox handleCorrectAnswerChange={handleCorrectAnswerChangePropSpy}/>)
        wrapper.setState(state)

        //Setup other spy
        const instance = wrapper.instance();
        const handleCorrectAnswerChangeSpy = jest.spyOn(instance, 'handleCorrectAnswerChange')
        wrapper.instance().forceUpdate();

        //Simulate
        wrapper.find('select').first().simulate('change', {value: 'New value!'})

        //Assert
        expect(handleCorrectAnswerChangePropSpy).toBeCalled();
        expect(handleCorrectAnswerChangeSpy).toBeCalled();
    });
});
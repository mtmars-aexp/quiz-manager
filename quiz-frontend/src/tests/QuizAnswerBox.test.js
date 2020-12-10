import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import QuizAnswerBox from '../components/QuizAnswerBox';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

describe('The question answer box', () => {
    it('should turn green if the answer is correct and the quiz has been submitted.', () => {
        const wrapper = shallow(<QuizAnswerBox finished={true}/>)
        wrapper.setState({'selected_answer_correct': '1'})
        expect(wrapper.find('.quiz-box').hasClass('correct')).toBe(true);
    });
    it('should turn red if the answer is incorrect and the quiz has been submitted.', () => {
        const wrapper = shallow(<QuizAnswerBox finished={true}/>)
        wrapper.setState({'selected_answer_correct': '0'})
        expect(wrapper.find('.quiz-box').hasClass('incorrect')).toBe(true);
    });
    it('should render an amount of radio buttons equal to the amount of answers it has.', () => {
        const wrapper = shallow(<QuizAnswerBox/>)
        const answers = [{answer_id: 1, text: "beep!"}, {answer_id: 2, text: "boop!"}]
        wrapper.setState({answers: answers})
        expect(wrapper.find('input')).toHaveLength(2);
    });
    it('should render answer text next to its radio buttons', () => {
        const wrapper = shallow(<QuizAnswerBox/>)
        const answers = [{answer_id: 1, text: "beep!"}, {answer_id: 2, text: "boop!"}, {answer_id: 3, text: "This is an answer to a question!"}]
        wrapper.setState({answers: answers})
        expect(wrapper.text().includes("beep!")).toBe(true);
        expect(wrapper.text().includes("boop!")).toBe(true);
        expect(wrapper.text().includes("This is an answer to a question!")).toBe(true);
    });
});
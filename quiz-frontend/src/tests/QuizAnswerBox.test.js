import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import QuizAnswerBox from '../components/QuizAnswerBox';
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
    it('should call updateQuizAnswer from props when a radio button is clicked', () => {
        const updateQuizAnswerMock = jest.fn();
        const wrapper = mount(<QuizAnswerBox updateQuizAnswer={updateQuizAnswerMock}/>)
        const answers = [{answer_id: 1, text: "beep!"}, {answer_id: 2, text: "boop!"}]
        wrapper.setState({answers: answers})
        wrapper.find("input").first().simulate('change');
        expect(updateQuizAnswerMock).toHaveBeenCalledTimes(1);
    });
    it('should call toggleAnswerVisibility when the "Reveal Answer" button is clicked', () => {

        //Setup localStorage mock.
        global.localStorage = new LocalStorageMock;
        localStorage.setItem("privilege", "2")

        //Mount component and setup state.
        const wrapper = mount(<QuizAnswerBox question_id={1}/>, { attachTo: document.body }) // Must attach to document body to be able to getElementById in function.
        const answers = [{answer_id: 1, text: "beep!"}, {answer_id: 2, text: "boop!"}]
        wrapper.setState({answers: answers})

        //Setup spy.
        const instance = wrapper.instance();
        const toggleVisibilitySpy = jest.spyOn(instance, 'toggleAnswerVisibility')
        wrapper.instance().forceUpdate();

        //Assert.
        wrapper.find('button').first().simulate('click')
        expect(toggleVisibilitySpy).toHaveBeenCalled();
    });
});
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Home from '../components/Home';
import QuizSelector from '../components/QuizSelector';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

describe('The home page', () => {
    it('should render 2 quiz selectors based on state data.', () => {
        const wrapper = shallow(<Home />);
        const mock_quiz_1 = {name: "Mock quiz!", description: "This quiz is not real! Wow!"}
        const mock_quiz_2 = {name: "Another mock quiz!", description: "This quiz isn't real either! Isn't that strange?"}
        wrapper.setState({quiz_data: [mock_quiz_1, mock_quiz_2]});
        expect(wrapper.containsMatchingElement(<QuizSelector />)).toEqual(true);
        expect(wrapper.find(QuizSelector)).toHaveLength(2);
    });
    it('should display the correct number of available tests.', () => {
        const wrapper = shallow(<Home />);
        const mock_quiz_1 = {name: "Mock quiz!", description: "This quiz is not real! Wow!"}
        const mock_quiz_2 = {name: "Another mock quiz!", description: "This quiz isn't real either! Isn't that strange?"}
        wrapper.setState({quiz_data: [mock_quiz_1, mock_quiz_2]});
        expect(wrapper.text().includes('2 quizzes available')).toBe(true);
    });
});
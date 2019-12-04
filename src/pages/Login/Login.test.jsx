import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Login from './index';
import Input from '../../components/Input';

describe('Login component', () => {
  const history = {
    push: jest.fn(),
    replace: jest.fn(),
  };

  it('renders without crashing', () => {
    shallow(<Login history={history} />);
  });

  it('should call handleInputChange', async () => {
    const event = { target: { value: 'abc' } };
    const wrapper = mount(<Login history={history} />);
    const input = wrapper.find('input[type="text"]');
    input.simulate('change', event);
    expect(wrapper.find(Input).prop('value')).toEqual('abc');
  });

  it('should call handleOnSubmit', () => {
    const wrapper = mount(<Login history={history} />);
    const button = wrapper.find('button');
    button.simulate('submit');
    expect(history.push).toHaveBeenCalled();
  });

  it('shoudl call handleDifficultyChange', async () => {
    const wrapper = mount(<Login history={history} />);
    const changeDifficulty = wrapper.find('#medium-button');
    changeDifficulty.simulate('click');
    await act(async () => {
      wrapper.update();
    });

    expect(wrapper.find('#medium-button').hasClass('seleted'));
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '../pages';

function setup() {
  const wrapper = shallow(<HomePage></HomePage>);
  return { wrapper };
}

describe('HomePage Test Suite', () => {
  it('HomePage should render', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

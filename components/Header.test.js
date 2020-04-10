import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

function setup() {
  const wrapper = shallow(<Header></Header>);
  return { wrapper };
}

describe('Header Test Suite', () => {
  it('Header component should render', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

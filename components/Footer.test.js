import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

function setup() {
  const props = {
    page: 1,
  };
  const wrapper = shallow(<Footer></Footer>);
  return { wrapper, props };
}

describe('Footer Test Suite', () => {
  it('Should have a more link', () => {
    const { wrapper } = setup();
    expect(wrapper.find('a').exists()).toBe(true);
  });
  it('Footer component should render', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('Footer component should have back button when page is more than 1', () => {
    const wrapper = shallow(<Footer page={2}></Footer>);
    expect(wrapper.find('a').exists()).toBe(true);
  });
});

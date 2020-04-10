import React from 'react';
import { shallow } from 'enzyme';

// Components
import List from './List';

function setup() {
  const props = {
    detail: {
      author: 'xyz',
      title: 'Lorem ipsum',
      points: '333',
      num_comments: '777',
      created_at: '2020-04-08T16:56:27.000Z',
      url: 'www.google.com/blog/?page=2&&id=99',
    },
    index: 1,
    key: 'dhjshfghsf',
    upVoteClickHandler: () => {},
    hiddenClickHandler: () => {},
  };
  const wrapper = shallow(<List></List>);
  return { wrapper, props };
}

describe('List Test Suite', () => {
  it('Should have a link', () => {
    const { wrapper } = setup();
    expect(wrapper.find('section').exists()).toBe(true);
  });

  it('Should have a button', () => {
    const { wrapper } = setup();
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('List component should render', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

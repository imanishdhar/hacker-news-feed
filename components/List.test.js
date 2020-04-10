import React from 'react';
import { shallow, render, mount } from 'enzyme';

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
    upVoteClickHandler: () => {
      mockButtonClicked();
    },
    hiddenClickHandler: () => {
      mockButtonClicked();
    },
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
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('Upvote button clicked', () => {
    const item = {
      author: 'xyz',
      title: 'Lorem ipsum',
      points: '333',
      num_comments: '777',
      created_at: '2020-04-08T16:56:27.000Z',
      url: 'https://www.google.com',
    };
    const props = {
      index: 1,
      key: 'dhjshfghsf',
    };
    const mockButtonClicked = jest.fn();
    const wrapper = mount(
      <List
        detail={item}
        key={props.key}
        index={props.index}
        upVoteClickHandler={mockButtonClicked}
      ></List>
    );
    const button = wrapper.find('button').at(0);
    button.simulate('click');
    expect(mockButtonClicked).toHaveBeenCalled();
  });
  it('hidden button clicked', () => {
    const item = {
      author: 'xyz',
      title: 'Lorem ipsum',
      points: '333',
      num_comments: '777',
      created_at: '2020-04-08T16:56:27.000Z',
      url: 'https://www.google.com',
    };
    const props = {
      index: 1,
      key: 'dhjshfghsf',
    };
    const mockButtonClicked = jest.fn();
    const wrapper = mount(
      <List
        detail={item}
        key={props.key}
        index={props.index}
        hiddenClickHandler={mockButtonClicked}
      ></List>
    );
    const button = wrapper.find('button').at(1);
    button.simulate('click');
    expect(mockButtonClicked).toHaveBeenCalled();
  });
});

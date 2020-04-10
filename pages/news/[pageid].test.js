import React from 'react';
import { shallow, render } from 'enzyme';

// Components
import News from './[pageid]';
import Header from '../../components/Header';

function setup() {
  const props = {
    page: 2,
    items: [
      {
        created_at: '2016-09-14T08:31:15.000Z',
        title: 'Pardon Snowden',
        url: 'https://www.pardonsnowden.org/',
        author: 'erlend_sh',
        points: 2553,
        num_comments: 781,
      },
      {
        created_at: '2016-09-14T08:31:15.000Z',
        title: 'Pardon Snowden',
        url: 'https://www.pardonsnowden.org/',
        author: 'erlend_sh',
        points: 2553,
        num_comments: 781,
      },
      {
        created_at: '2016-09-14T08:31:15.000Z',
        title: 'Pardon Snowden',
        url: 'https://www.pardonsnowden.org/',
        author: 'erlend_sh',
        points: 2553,
        num_comments: 781,
      },
      {
        created_at: '2016-09-14T08:31:15.000Z',
        title: 'Pardon Snowden',
        url: 'https://www.pardonsnowden.org/',
        author: 'erlend_sh',
        points: 2553,
        num_comments: 781,
      },
    ],
  };
  const wrapper = render(<News></News>);
  return { wrapper, props };
}

describe('News Test Suite', () => {
  it('News component should render', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('Should have a header', () => {
    const { wrapper } = setup();
    expect(wrapper.find('header')).toHaveLength(1);
  });
  it('Should have a footer', () => {
    const { wrapper } = setup();
    expect(wrapper.find('footer')).toHaveLength(1);
  });
  it('Should have a order list ', () => {
    const { wrapper } = setup();
    expect(wrapper.find('ol')).toHaveLength(1);
  });
});

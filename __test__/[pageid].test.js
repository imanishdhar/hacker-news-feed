import React from 'react';
import { shallow, render } from 'enzyme';

import News from '../pages/news/[pageid]';

describe('News Test Suite', () => {
  let compWrapper;
  beforeEach(async () => {
    process.env = Object.assign(process.env, {
      APP_BASE_URI: 'https://hn.algolia.com/api/v1/search',
    });
    const props = await News.getInitialProps({
      query: { pageid: '1' },
    });
    compWrapper = shallow(<News {...props} />);
  });

  it('News component should render', () => {
    expect(compWrapper).toMatchSnapshot();
  });

  it('Should have a order list ', () => {
    expect(compWrapper.find('ol')).toHaveLength(1);
  });
  it('Should set state in componentDidMount ', () => {
    expect(compWrapper.state('page')).toEqual(1);
  });
  it('Should update state in componentDidUpdate ', () => {
    compWrapper.setProps({ page: 2 });
    expect(compWrapper.state('page')).toEqual(2);
  });
  it('hiddenClickHandler ', () => {
    const instance = compWrapper.instance();
    instance.hiddenClickHandler(1);
    expect(compWrapper.state('items').length).toEqual(19);
  });
  it('upVoteClickHandler ', () => {
    const instance = compWrapper.instance();
    instance.upVoteClickHandler(0);
    expect(compWrapper.state('page')).toEqual(1);
  });
});

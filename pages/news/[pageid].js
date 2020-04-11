import { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';

import {
  isStorageAvaiable,
  setLocalStorageItem,
  getLocalStorageItem,
} from '../../utils/browserStorage';

import { getStartIndex } from '../../utils/commonUtil';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import List from '../../components/List';

class News extends Component {
  constructor(props) {
    super(props);
    const { items, page } = props;
    this.state = {
      items,
      page,
    };
    this.hiddenClickHandler = this.hiddenClickHandler.bind(this);
    this.upVoteClickHandler = this.upVoteClickHandler.bind(this);
  }
  static async getInitialProps({ query: { pageid = '1' } }) {
    if (
      typeof window !== 'undefined' &&
      isStorageAvaiable() &&
      getLocalStorageItem(pageid) !== null
    ) {
      const pageNum = parseInt(pageid, 10);
      const storedItems = getLocalStorageItem(pageid);

      return {
        items: storedItems,
        page: pageNum,
      };
    }

    const apiBaseURI = process.env.APP_BASE_URI;
    const queryParam = pageid === '1' ? '?tags=front_page' : `?page=${pageid}`;
    const response = await fetch(`${apiBaseURI}${queryParam}`);
    const data = await response.json();
    const pageNum = parseInt(pageid, 10);
    return {
      items: data.hits,
      page: pageNum,
    };
  }

  componentDidMount() {
    const { items, page } = this.props;
    if (getLocalStorageItem(page) === null) {
      setLocalStorageItem(page, items);
    } else {
      const storedItems = getLocalStorageItem(page);
      this.setState({ items: storedItems, page });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { items, page } = this.props;
    if (getLocalStorageItem(page) === null) {
      setLocalStorageItem(page, items);
    }
    if (prevProps.page !== this.props.page) {
      this.setState({ items, page });
    }
  }

  hiddenClickHandler(index) {
    const { items, page } = this.state;
    items.splice(index, 1);
    setLocalStorageItem(page, items);
    this.setState({ items, page });
  }

  upVoteClickHandler(index) {
    const { items, page } = this.state;
    items[index].points += 1;
    setLocalStorageItem(page, items);
    this.setState({ items, page });
  }

  render() {
    const { page, items } = this.state;
    return (
      <div>
        <Head>
          <meta key="first" charset="utf-8" />
          <meta key="second" http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            key="third"
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
          />
          <meta key="fourth" name="description" content="Description" />
          <meta key="fifth" name="keywords" content="Keywords" />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-touch-icon.png"
          ></link>
          <title>Hacker News Feed Example</title>
        </Head>
        <Header />
        <ol start={getStartIndex(page)}>
          {items &&
            items.map((item, index) => (
              <List
                detail={item}
                key={`${index}-${item.title}`}
                index={index}
                upVoteClickHandler={this.upVoteClickHandler}
                hiddenClickHandler={this.hiddenClickHandler}
              />
            ))}
        </ol>

        <Footer page={page} />
        <style jsx>{`
          html,
          body {
            padding: 0;
            margin: 8px;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            background-color: #ffccbb;
          }

          * {
            box-sizing: border-box;
          }

          ol {
            padding: 130px 20px 50px;
          }

          @media only screen and (min-width: 600px) {
            ol {
              padding: 90px 50px 40px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default News;

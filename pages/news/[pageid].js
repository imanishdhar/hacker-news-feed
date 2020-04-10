import { Component } from "react";
import Router from "next/router";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faEyeSlash,
  faComments,
  faUserNinja,
  faHourglassHalf,
  faBlog,
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";

import {
  isStorageAvaiable,
  setLocalStorageItem,
  getLocalStorageItem,
} from "../../utils/browserStorage";

import {
  getStartIndex,
  getDomainName,
  getDifferenceInHrs,
} from "../../utils/commonUtil";

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
  static async getInitialProps({ query: { pageid = 1 } }) {
    if (
      typeof window !== "undefined" &&
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
    const queryParam = pageid === "1" ? "?tags=front_page" : `?page=${pageid}`;
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
    const { items, page } = this.props;
    items.splice(index, 1);
    setLocalStorageItem(page, items);
    this.setState({ items, page });
  }

  upVoteClickHandler(index) {
    const { items, page } = this.props;
    items[index].points += 1;
    setLocalStorageItem(page, items);
    this.setState({ items, page });
  }

  render() {
    const { page, items } = this.state;
    return (
      <div>
        <div className="fixed-header">
          <section className="flex-container">
            <section>
              <h3 className="header-title">Hacker News</h3>
            </section>
            <section>
              <span className="header-option">{` news |`}</span>
              <span className="header-option">{` past |`}</span>
              <span className="header-option">{` comments |`}</span>
              <span className="header-option">{` ask |`}</span>
              <span className="header-option">{` show |`}</span>
              <span className="header-option">{` jobs |`}</span>
              <span className="header-option">{` submit`}</span>
            </section>
          </section>
        </div>
        <ol start={getStartIndex(page)}>
          {items &&
            items.map(
              (
                { title, url, points, author, created_at, num_comments },
                index
              ) => (
                <li key={index}>
                  <section className="flex-container">
                    <section className="right-section">
                      <div className="icon-container-lg">
                        <FontAwesomeIcon icon={faUserNinja} title="author" />
                      </div>
                      <section>{`@${author}`}</section>
                    </section>

                    <section>
                      <section>
                        <span className="title">{title}</span>
                      </section>
                      <section>
                        <section className="inline-block">
                          <button
                            className="icon-container"
                            onClick={() => this.upVoteClickHandler(index)}
                          >
                            <FontAwesomeIcon
                              icon={faThumbsUp}
                              title="Thumbs up"
                            ></FontAwesomeIcon>
                          </button>
                          <span>{`${points} Points`}</span>
                        </section>
                        <section className="inline-block">
                          <button
                            className="icon-container"
                            onClick={() => this.hiddenClickHandler(index)}
                          >
                            <FontAwesomeIcon icon={faEyeSlash} />
                          </button>
                          <span>{` Hide `}</span>
                        </section>
                        <section className="inline-block">
                          <div className="icon-container">
                            <FontAwesomeIcon
                              icon={faHourglassHalf}
                              title="hours"
                            ></FontAwesomeIcon>
                          </div>
                          <span>{`${getDifferenceInHrs(
                            created_at
                          )} Hours Ago`}</span>
                        </section>

                        <section className="inline-block">
                          <div className="icon-container">
                            <FontAwesomeIcon
                              icon={faComments}
                              title="comments"
                            ></FontAwesomeIcon>
                          </div>
                          <span>{`${num_comments} Comments`}</span>
                        </section>
                      </section>
                      <section>
                        {url && (
                          <>
                            <Link href={url}>
                              <a>
                                <FontAwesomeIcon icon={faBlog} />
                              </a>
                            </Link>
                            <Link href={url}>
                              <a>{` (${getDomainName(url)}) `}</a>
                            </Link>
                          </>
                        )}
                      </section>
                    </section>
                  </section>
                </li>
              )
            )}
        </ol>

        <div className="fixed-footer">
          {page > 1 && (
            <Link href="/news/[pageid]" as={`/news/${page - 1}`}>
              <a className="gap">
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
              </a>
            </Link>
          )}

          <Link href="/news/[pageid]" as={`/news/${page + 1}`}>
            <a className="gap">
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </a>
          </Link>
        </div>
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

          button {
            cursor: pointer;
          }

          ol {
            padding: 90px 50px 40px;
          }

          li {
            font-family: "Verdana";
            font-size: 13px;
            color: #828282;
            margin: 5px 0;
            border: 1px solid;
            border-radius: 10px;
          }

          a {
            text-decoration: none;
            color: blue;
          }

          a:hover {
            opacity: 0.6;
          }

          section {
            margin: 5px;
          }

          .gap {
            margin: 8px;
            font-size: 24px;
            color: #000000;
          }

          .title {
            color: #000000;
            font-size: 14px;
          }

          .icon-container {
            display: inline-block;
            font-size: 15px;
            margin: 0 4px;
          }

          .right-section {
            display: inline-block;
            text-align: center;
            min-width: 120px;
          }

          .inline-block {
            display: inline-block;
          }

          .icon-container-lg {
            display: inline-block;
            background: #de7e2b;
            color: #ffffff;
            font-size: 25px;
            padding: 20px;
            border-radius: 50%;
          }
          .flex-container {
            display: flex;
            align-items: center;
          }
          .fixed-header,
          .fixed-footer {
            width: 100%;
            left: 0;
            position: fixed;
            background: #ff6600;
            padding: 10px 0;
            color: #fff;
          }
          .fixed-header {
            top: 0;
          }
          .fixed-footer {
            bottom: 0;
            text-align: center;
          }
          .header-option {
            font-family: "Verdana";
            color: #000000;
            font-size: 14px;
          }
          .header-title {
            font-family: "Verdana";
            color: #000000;
            display: inline-block;
            padding: 0 10px;
          }
          @media only screen and (max-width: 600px) {
            ol {
              padding: 130px 20px 50px;
            }

            .flex-container {
              display: block;
            }
            .right-section {
              display: block;
            }
            .icon-container {
              font-size: 11px;
            }
            .inline-block {
              display: block;
            }
          }
        `}</style>
      </div>
    );
  }
}
/*const News = ({ data }) => {
  const router = useRouter();
  const { pageid } = router.query;
  const [count, setCount] = useState(1);
  console.log("MDD----->", data);

  const generateListItems = (dataObj) => {
    return (
      dataObj &&
      dataObj.map((obj) => (
        <li>
          <span>{obj.title}</span>
          <span>{obj.author}</span>
          <span>{obj.num_comments}</span>
        </li>
      ))
    );
  };
  const getNextSpecificPage = (pageNum) => {
    const { data, error } = useSWR(
      `https://hn.algolia.com/api/v1/search_by_date?page=${pageNum}`,
      fetch
    );
    if (error) return <div>failed to load</div>;
    if (!(data && data.hits)) return <div>loading...</div>;
    return <ul>{generateListItems(data.hits)}</ul>;
  };

  const handleNextClickHandler = () => {
    setCount(count + 1);
    const path = `/news/${count + 1}`;
    router.push(path);
  };

  const handleBackClickHandler = () => {
    setCount(count - 1);
    const path = `/news/${count - 1}`;
    router.push(path);
  };

  const listItems = generateListItems(data.hits);
  return (
    <div>
      {count > 0 && (
        <button type="button" onClick={handleBackClickHandler}>
          Previous
        </button>
      )}
      <p>
        You clicked {count} {pageid} times
      </p>
      <button onClick={() => setCount(count + 1)}>Click me</button>

      {count === 1 && <ul>{listItems}</ul>}
      {count > 1 && <ul>{getNextSpecificPage(count)}</ul>}
      <button type="button" onClick={handleNextClickHandler}>
        Next
      </button>
      <Link href="/news/[pageid]" as={`/news/${count}`}>
        Next
      </Link>
      <button
          onClick={() => Router.push(`/news/${this.props.page - 1}`)}
          disabled={this.props.page <= 1}
        >
          PREV
        </button>
        <button onClick={() => Router.push(`/news/${this.props.page + 1}`)}>
          NEXT
        </button>
      <style jsx global>{`
        li {
          padding: 0;
          margin: 8px;
          border: 1px solid;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://hn.algolia.com/api/v1/search_by_date?${new URLSearchParams({
      page: 1,
    })}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}*/

export default News;

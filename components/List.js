import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faEyeSlash,
  faComments,
  faUserNinja,
  faHourglassHalf,
  faBlog,
} from '@fortawesome/free-solid-svg-icons';

import { getDomainName, getDifferenceInHrs } from '../utils/commonUtil';

const List = ({ detail, index, upVoteClickHandler, hiddenClickHandler }) => (
  <li key={`${index}-${detail.created_at}`}>
    <section className="flex-container">
      <section className="right-section">
        <div className="icon-container-lg">
          <FontAwesomeIcon icon={faUserNinja} title="author" />
        </div>
        <section>{`@${detail.author}`}</section>
      </section>

      <section>
        <section>
          <span className="title">{detail.title}</span>
        </section>
        <section>
          <section className="inline-block-control">
            <button
              className="icon-container"
              onClick={() => upVoteClickHandler(index)}
            >
              <FontAwesomeIcon
                icon={faThumbsUp}
                title="Thumbs up"
              ></FontAwesomeIcon>
            </button>
            <span>{`${detail.points} Points`}</span>
          </section>
          <section className="inline-block-control">
            <button
              className="icon-container"
              onClick={() => hiddenClickHandler(index)}
            >
              <FontAwesomeIcon icon={faEyeSlash} />
            </button>
            <span>{` Hide `}</span>
          </section>
          <section className="inline-block-control">
            <div className="icon-container">
              <FontAwesomeIcon
                icon={faHourglassHalf}
                title="hours"
              ></FontAwesomeIcon>
            </div>
            <span>{`${getDifferenceInHrs(detail.created_at)} Hours Ago`}</span>
          </section>

          <section className="inline-block-control">
            <div className="icon-container">
              <FontAwesomeIcon
                icon={faComments}
                title="comments"
              ></FontAwesomeIcon>
            </div>
            <span>{`${detail.num_comments} Comments`}</span>
          </section>
        </section>
        <section>
          {detail.url && (
            <>
              <Link href={detail.url}>
                <a>
                  <FontAwesomeIcon icon={faBlog} />
                </a>
              </Link>
              <Link href={detail.url}>
                <a>{` (${getDomainName(detail.url)}) `}</a>
              </Link>
            </>
          )}
        </section>
      </section>
    </section>

    <style jsx>{`
      button {
        cursor: pointer;
      }

      li {
        font-family: 'Verdana';
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

      .title {
        color: #000000;
        font-size: 14px;
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
        display: block;
        align-items: center;
      }

      .inline-block-control {
        display: block;
      }

      .right-section {
        display: block;
        text-align: center;
        min-width: 120px;
      }

      .icon-container {
        display: inline-block;
        font-size: 11px;
        margin: 0 4px;
      }

      @media only screen and (min-width: 600px) {
        .flex-container {
          display: flex;
        }
        .right-section {
          display: inline-block;
        }
        .icon-container {
          font-size: 15px;
        }
        .inline-block-control {
          display: inline-block;
        }
      }
    `}</style>
  </li>
);

export default List;

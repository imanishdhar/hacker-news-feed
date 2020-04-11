import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons';

const Footer = ({ page }) => (
  <footer className="fixed-footer">
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

    <style jsx>{`
      a {
        text-decoration: none;
      }

      a:hover {
        opacity: 0.6;
      }

      .gap {
        margin: 0 8px;
        font-size: 24px;
        height: 24px;
        width: 24px;
        color: #000000;
        display: inline-block;
      }

      .fixed-footer {
        width: 100%;
        height: 28px;
        display: block;
        left: 0;
        position: fixed;
        background: #ff6600;
        padding: 10px 0;
        color: #fff;
      }

      .fixed-footer {
        bottom: 0;
        text-align: center;
      }
    `}</style>
  </footer>
);

export default Footer;

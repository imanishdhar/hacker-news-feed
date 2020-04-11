import Link from 'next/link';
// import Head from 'next/head';
const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Hacker News Feed Example</h1>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/news/[pageid]" as="/news/1">
            <a>News Page</a>
          </Link>
        </li>
      </ul>
      <style jsx global>{`
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
      `}</style>
    </div>
  );
};
export default HomePage;

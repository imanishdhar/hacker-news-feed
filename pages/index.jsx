import Link from 'next/link';
import Head from 'next/head';
const HomePage = () => {
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
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
        <title>Hacker News Feed Example</title>
      </Head>
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

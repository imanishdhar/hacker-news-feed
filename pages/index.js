import Link from 'next/link';
const HomePage = () => {
  return (
    <div>
      <p>Welcome to Next.js!</p>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/news/[pageid]" as="/news/1">
            News Page
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

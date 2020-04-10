import Link from "next/link";

const Header = () => (
  <header className="fixed-header">
    <section className="flex-container">
      <section>
        <h3 className="header-title">Hacker News</h3>
      </section>
      <section>
        <Link href="#">
          <a className="header-option">news</a>
        </Link>
        <Link href="#">
          <a className="header-option">past</a>
        </Link>
        <Link href="#">
          <a className="header-option">comments</a>
        </Link>
        <Link href="#">
          <a className="header-option">ask</a>
        </Link>
        <Link href="#">
          <a className="header-option">show</a>
        </Link>
        <Link href="#">
          <a className="header-option">jobs</a>
        </Link>
        <Link href="#">
          <a className="header-option">submit</a>
        </Link>
      </section>
    </section>

    <style jsx>{`
      a:hover {
        opacity: 0.6;
      }

      section {
        margin: 5px;
      }

      .flex-container {
        display: block;
        align-items: center;
      }
      .fixed-header {
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

      .header-option {
        font-family: "Verdana";
        color: #000000;
        font-size: 14px;
        margin-right: 10px;
        padding: 0 5px;
        text-align: center;
      }

      .header-title {
        font-family: "Verdana";
        color: #000000;
        display: inline-block;
        padding: 0 10px;
      }

      @media only screen and (min-width: 600px) {
        .flex-container {
          display: flex;
        }
      }
    `}</style>
  </header>
);

export default Header;

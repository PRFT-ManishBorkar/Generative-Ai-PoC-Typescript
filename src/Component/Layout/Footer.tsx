import logo from "../../assets/logo.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__footerwrapper">
          <div className="footer__logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="footer__copyright">
            <p>&copy; 2023 Perficient Inc, All Rights Reserved</p>
          </div>
          <div />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

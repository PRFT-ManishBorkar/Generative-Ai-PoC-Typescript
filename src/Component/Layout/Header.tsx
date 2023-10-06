import logo from "../../assets/logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__headerwrapper">
          <div className="header__logo">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

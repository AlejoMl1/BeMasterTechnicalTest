import { Link } from "react-router-dom";

const NavBar = () => {


  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          BeMaster Technical Test
        </Link>

      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";

import Logo_Flevo from '../assets/Logo_Flevo.png';


import MainNav from "./main-nav";
import AuthNav from "./auth-nav";

const NavBar = () => {
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div>
          <img className="mb-3 app-logo" src={Logo_Flevo} alt="Flevo logo" width="110" />
          </div>
          <MainNav />
          <AuthNav />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

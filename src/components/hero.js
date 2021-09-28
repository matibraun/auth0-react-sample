import React from "react";
import Logo_Flevo from '../assets/Logo_Flevo.png';
import {Link} from "react-router-dom";




const Hero = () => (
  <div className="text-center hero">
    <img className="mb-3 app-logo" src={Logo_Flevo} alt="Flevo logo" width="2000" />
    <h1 className="mb-4">Vamooo Flevo!!!</h1>
    <p className="lead">
      Queres estudiar programacion?
      <br/>
      Flevo te tira guitaaa, lokuraaaaaa
      
      <br/>
      {" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://beflevo.com/"
      >
        Esaaaa
      </a>
      <br/>
      <br/>
      <br/>

      <Link to="/application-intro">

      <button>

          Aplicar!

      </button>

      </Link>

    </p>



  </div>
);

export default Hero;

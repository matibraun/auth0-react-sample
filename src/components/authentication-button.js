import React from "react";

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import SignupButton from "./signup-button";

import { useAuth0 } from "@auth0/auth0-react";
import PostAndLoadSignupPersonButton from "./post-and-load-signup-person-button";
import GetAndLoadLoginPersonButton from "./get-and-load-login-person-button";

import { useContext } from "react";
import { PersonContext } from ".";

const AuthenticationButton = () => {

  const { person } = useContext(PersonContext)


  const { isAuthenticated } = useAuth0();

  return isAuthenticated ?
  <div>
    <LogoutButton />
    <PostAndLoadSignupPersonButton />
    <GetAndLoadLoginPersonButton />
    {person.email}
  </div>
  :
  <div>
    <SignupButton />
    <LoginButton />
  </div>;
};

export default AuthenticationButton;

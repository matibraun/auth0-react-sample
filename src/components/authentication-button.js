import React from "react";

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import SignupButton from "./signup-button";
import GetOrPostPersonButton from "./get-or-post-person-button";

import { useAuth0 } from "@auth0/auth0-react";

import { useContext } from "react";
import { PersonContext } from ".";

const AuthenticationButton = () => {

  const { person } = useContext(PersonContext)


  const { isAuthenticated } = useAuth0();

  return isAuthenticated ?
  <div>
    <LogoutButton />
    <GetOrPostPersonButton />
    {person.email}
  </div>
  :
  <div>
    <SignupButton />
    <LoginButton />
  </div>;
};

export default AuthenticationButton;

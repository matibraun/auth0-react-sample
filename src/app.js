import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { NavBar, Footer, Loading, PersonContext } from "./components";
import { Home, Profile, ExternalApi, AboutUs, ApplicationIntro, Step0, Step1, Step2, Step3, Step4, ApplicationReview, ApplicationSuccess, CodingDojo, TestAuth0, TestAddress } from "./views";
import ProtectedRoute from "./auth/protected-route";

import "./app.css";

const App = () => {

  const [person, setPerson] = useState({})

  const { isLoading } = useAuth0();

  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <PersonContext.Provider value={{person, setPerson}}>

        {location.pathname === '/coding-dojo' ? null : <NavBar />}

        <div className="container flex-grow-1">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about-us" component={AboutUs} />
            <ProtectedRoute path="/application-intro" component={ApplicationIntro} />
            <ProtectedRoute path="/step0" component={Step0} />
            <ProtectedRoute path="/step1" component={Step1} />
            <ProtectedRoute path="/step2" component={Step2} />
            <ProtectedRoute path="/step3" component={Step3} />
            <ProtectedRoute path="/step4" component={Step4} />
            <ProtectedRoute path="/application-review" component={ApplicationReview} />
            <ProtectedRoute path="/application-success" component={ApplicationSuccess} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/external-api" component={ExternalApi} />
            <Route path="/coding-dojo" component={CodingDojo} />
            <Route path="/test-auth0" component={TestAuth0} />

          </Switch>
        </div>
        <Footer />
      </PersonContext.Provider>
    </div>
  );
};

export default App;

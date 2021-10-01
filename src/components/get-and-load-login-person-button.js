import React from "react";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";

import { PersonContext } from ".";



const GetAndLoadLoginPersonButton = () => {
  
  const { user } = useAuth0();
  const { email } = user;

  const personsURL = "http://127.0.0.1:8000/app_flevo/persons/";
  const personFilteredByEmailURL = personsURL + "?email=" + user.email


  const { setPerson } = useContext(PersonContext)



  const handleClickGetAndLoadPerson = () => {

    console.log(email)


    axios
        .get(personFilteredByEmailURL)
        .then((response) => {
            console.log(response)
            setPerson(response.data[0]);
            alert('La persona se ha cargado exitosamente')

        })

        
    
  }
  
  return (

      <button
      className="btn btn-primary btn-block"
      onClick={handleClickGetAndLoadPerson}
      >
      Get and Load Login Person
      </button>

  );
};

export default GetAndLoadLoginPersonButton;

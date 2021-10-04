import React from "react";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";

import { useContext } from "react";
import { PersonContext } from ".";



const PostAndLoadSignupPersonButton = () => {
  
  const { user } = useAuth0();

  const personsURL = "http://127.0.0.1:8000/app_flevo/persons/";

  const { person, setPerson } = useContext(PersonContext)



  const handleClickPostAndLoadPerson = () => {

    console.log(user.email)

    axios
        .post(personsURL, {
            email: user.email,
            password: 'Hola1234!',
        })
        .then((response) => {
            console.log(response.data);
            setPerson(response.data);
            console.log(person)
            alert('La persona ha sido creada exitosamente')
        })

    
  }
  
  return (
      
      <button
      className="btn btn-primary btn-block"
      onClick={handleClickPostAndLoadPerson}
      >
      Post and Load Signup Person
      </button>

  );
};

export default PostAndLoadSignupPersonButton;

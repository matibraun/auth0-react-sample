import React from "react";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";

import { PersonContext } from ".";


const GetOrPostPersonButton = () => {
  
    const { user } = useAuth0();
  
    const personsURL = "http://127.0.0.1:8000/app_flevo/persons/";
    const personFilteredByEmailURL = personsURL + "?email=" + user.email

    const { person, setPerson } = useContext(PersonContext)

  

    const handleClickGetOrPostPerson = () => {
        
        axios
        .get(personFilteredByEmailURL)
        .then((response) => {
            console.log(response)
            console.log(response.data.length)
            return response
        })
        .then((response) => {
            if (response.data.length === 0) {
                console.log('vacio')
                

                axios
                .post(personsURL, {
                    email: user.email,
                    password: 'Hola1234!',
                })
                .then((response) => {
                    console.log(response.data);
                    setPerson(response.data);
                    console.log(person)
                    alert('La persona ha sido creada y cargada exitosamente')
                })
        
            } else {
                console.log('lleno')
                setPerson(response.data[0]);
                alert('La persona se ha cargado exitosamente')
            }
        })
    }
    
    return (
        
        <button
        className="btn btn-primary btn-block"
        onClick={handleClickGetOrPostPerson}
        >
        Get or Post/Get Person
        </button>
  
    );
  };
  
  export default GetOrPostPersonButton;
  
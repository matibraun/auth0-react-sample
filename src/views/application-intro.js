import axios from "axios";
import { useHistory } from 'react-router-dom';


import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";

import { PersonContext } from "../components";






const ApplicationIntro = () => {



    const { user } = useAuth0();
    const { email, nickname } = user;

    const history = useHistory()
    
  
    const personsURL = "http://127.0.0.1:8000/app_flevo/persons/";

    const { person, setPerson } = useContext(PersonContext)


    function handleClickComenzar(event) {
        event.preventDefault();
        console.log(email)
    
        axios
            .post(personsURL, {
                email: email,
                password: 'Hola1234!',
            })
            .then((response) => {
                console.log(response.data);
                setPerson(response.data);
                alert('La persona ha sido creada exitosamente')



                history.push("/step1")
            })
    };
    

    return (
        <div className="applicationIntro">
            <br/>
            <h2>{JSON.stringify(person, null, 2)}</h2>
            APPLICATION INTRO

            <br/>
            <br/>

            HOLA 
            <br/>
            {nickname}
            <br/>
            Gracias por pensar en flevo!
            Estamos aquí para ayudarte a que esto suceda!!
            Hoy en día estudiar en XXX y algun fact copado
            A continuación te haremos algunas preguntas que no te llevarán más de xx minutos.
            <br/>
            COMENCEMOS!
            <br/>


            <button
            type='submit'
            onClick={handleClickComenzar}>

                Comenzar

            </button>


        </div>
    )
}

export default ApplicationIntro
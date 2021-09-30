import { useHistory } from 'react-router-dom';

import { useContext } from "react";

import { PersonContext } from "../components";






const ApplicationIntro = () => {

    const history = useHistory()

    const { person } = useContext(PersonContext)


    function handleClickComenzar(event) {
        event.preventDefault();
        history.push("/step1")
    };
    

    return (
        <div className="applicationIntro">
            <br/>
            APPLICATION INTRO

            <br/>
            <br/>

            HOLA 
            <br/>
            {person.email}
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
            <br/>
            <h2>{JSON.stringify(person, null, 2)}</h2>


        </div>
    )
}

export default ApplicationIntro
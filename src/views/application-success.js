import { useHistory } from 'react-router-dom';

import { useContext } from "react";

import { PersonContext } from "../components";






const ApplicationSuccess = () => {

    const history = useHistory()

    const { person } = useContext(PersonContext)


    function handleClickComenzar(event) {
        event.preventDefault();
        history.push("/")
    };
    

    return (
        <div className="applicationIntro">
            <br/>
            SUCCESS, TU APLICACION HA SIDO EXITOSA!!!

            <br/>
            <br/>

            
            <br/>
            {person.email}
            <br/>
            Gracias por aplicar!
            Nos pondremos en contacto a traves de tu mail para contarte como sigue el proceso
            <br/>
            CHAUCHELLLI!!!!
            <br/>


            <button
            type='submit'
            onClick={handleClickComenzar}>

                Terminar

            </button>
            <br/>


        </div>
    )
}

export default ApplicationSuccess
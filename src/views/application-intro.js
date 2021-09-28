import {Link} from "react-router-dom";


const ApplicationIntro = () => {

    return (
        <div className="applicationIntro">
            <br/>
            
            APPLICATION INTRO

            <br/>
            <br/>

            HOLA PEPE
            Gracias por pensar en flevo!
            Estamos aquí para ayudarte a que esto suceda!!
            Hoy en día estudiar en XXX y algun fact copado
            A continuación te haremos algunas preguntas que no te llevarán más de xx minutos.
            <br/>
            COMENCEMOS!
            <br/>

            <Link to="/step1">

                <button>

                    Comenzar

                </button>

            </Link>

        </div>
    )
}

export default ApplicationIntro
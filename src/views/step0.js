
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";



// primer form

const Step0 = () => {

    const { user } = useAuth0();
  

    const personsURL = "http://127.0.0.1:8000/app_flevo/persons/";
    const personFilteredByEmailURL = personsURL + "?email=" + user.email
    const personWithIdURL = "http://127.0.0.1:8000/app_flevo/persons/82/"; 


    const [person, setPerson] = useState("");

    useEffect(() => {

        axios
            .get(personFilteredByEmailURL)
            .then((response) => {
                setPerson(response.data[0])
                console.log(response)
                console.log(person.email)
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClickPatch = () => {
        axios
            .patch(personWithIdURL, {first_name: 'pepessss'})

    }

    return (
        <div>
            <div className="col-md text-center text-md-left">
                    <h2>
                        {person.email}
                    </h2>
            </div>

            <button onClick={handleClickPatch}>
                hacer patch
            </button>


            <div className="row">
                <pre className="col-12 text-light bg-dark p-4">
                {JSON.stringify(person, null, 2)}
                </pre>
            </div>

        </div>
    )
}

export default Step0
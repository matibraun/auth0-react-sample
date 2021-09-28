
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";



// primer form

const Step0 = () => {

    const { user } = useAuth0();
  

    const genericEmailURL = "http://127.0.0.1:8000/app_flevo/email/";
    const specificEmailURL = genericEmailURL + "?email=" + user.email

    const [email, setEmail] = useState("");
    const [person, setPerson] = useState("");

    useEffect(() => {

        axios
            .get(specificEmailURL)
            .then((response) => {
                setEmail(response.data[0].email);
                setPerson(response.data[0])
                console.log(response)
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div>
            <div className="col-md text-center text-md-left">
                    <h2>
                        {email}


                    </h2>
            </div>
            <div className="row">
                <pre className="col-12 text-light bg-dark p-4">
                {JSON.stringify(person, null, 2)}
                </pre>
            </div>

        </div>
    )
}

export default Step0
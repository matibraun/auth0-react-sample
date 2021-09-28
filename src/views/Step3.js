
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";


// primer formulario

const Step3 = () => {

    const { user } = useAuth0();


    const personsURL = "http://127.0.0.1:8000/app_flevo/persons/"
    const educationLevelsURL = "http://127.0.0.1:8000/app_flevo/education_levels/"


    const history = useHistory()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [educationLevels, setEducationLevels] = useState([]);

    const [chosenEducationLevel, setChosenEducationLevel] = useState(null)

    const [studiesFinishingDate, setStudiesFinishingDate] = useState("");

    const [linkedinProfile, setLinkedinProfile] = useState("");

    const getEducationLevels = axios.get(educationLevelsURL);


    useEffect(() => {
        axios
        .all([getEducationLevels])
        .then(
            axios.spread((...responses) => {
                const responseEducationLevels = responses[0];

                console.log(responseEducationLevels);

                setEducationLevels(responseEducationLevels.data);
            })
        )
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    function handleChangeEmail(event) {
        // event.preventDefault();
        setEmail(event.target.value);
    }

    function handleChangePassword(event) {
        // event.preventDefault();
        setPassword(event.target.value);
    }

    function handleChangeChosenEducationLevel(event) {
        // event.preventDefault();
        setChosenEducationLevel(event.target.value);
    }

    function handleChangeStudiesFinishingDate(event) {
        // event.preventDefault();
        setStudiesFinishingDate(event.target.value);
    }

    function handleChangeLinkedinProfile(event) {
        // event.preventDefault();
        setLinkedinProfile(event.target.value);
    }




    function handleClickNext(event) {
        event.preventDefault();
        console.log(email, password, chosenEducationLevel, studiesFinishingDate, linkedinProfile)

        axios
            .post(personsURL, {
                email: email,
                password: password,
                education_level: chosenEducationLevel,
                studies_finishing_date: studiesFinishingDate,
                linkedin_profile: linkedinProfile,
            })

            .then((response) => {
                console.log(response.data);
                alert('La info se ha cargado exitosamente')
                history.push("/step4")
            })
    }



    return (
        <div>

            <div className="col-md text-center text-md-left">
                <h2>{user.name}</h2>
                <p className="lead text-muted">{email}</p>
            </div>

            <form>

            <label>
                    Email:
                    <input
                    type="text"
                    name="email"
                    onChange={handleChangeEmail}
                    />
                </label><br/>

                <label>
                    Password:
                    <input
                    type="text"
                    name="password"
                    onChange={handleChangePassword}
                    />
                </label><br/>


                <label>

                    Education Level:
                    <select name='option' onChange={handleChangeChosenEducationLevel}>

                        <option value=''></option>

                        {
                        educationLevels.map((educationLevel) => 
                        <option value={educationLevel.id} key={educationLevel.id}>{educationLevel.name}</option>)
                        }

                    </select>

                </label><br/>
                <br/>


                <label>
                    Studies Finishing Date:
                    <input
                    type="date"
                    name="studies_finishing_date"
                    onChange={handleChangeStudiesFinishingDate}
                    />
                </label><br/>

                <label>
                    Linkedin Profile:
                    <input
                    type="text"
                    name="linkedin_profile"
                    onChange={handleChangeLinkedinProfile}
                    />
                </label><br/>


                {email}<br/>
                {password}<br/>



                <button
                type='submit'
                onClick={handleClickNext}>
                    Next
                </button><br/>

            </form>
        </div>
    )
}

export default Step3
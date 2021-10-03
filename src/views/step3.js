
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

import { useContext } from "react";

import { PersonContext } from "../components";


// primer formulario

const Step3 = () => {

    const { person } = useContext(PersonContext)


    const personsURL = "http://127.0.0.1:8000/app_flevo/persons/"

    const currentPersonURL = personsURL + person.id + "/";

    const educationLevelsURL = "http://127.0.0.1:8000/app_flevo/education_levels/"


    const history = useHistory()


    const [educationLevels, setEducationLevels] = useState([]);
    const [chosenEducationLevel, setChosenEducationLevel] = useState(null)

    const [studiesFinishingDate, setStudiesFinishingDate] = useState("");
    const [linkedinProfile, setLinkedinProfile] = useState("");



    // const getEducationLevels = axios.get(educationLevelsURL);


    useEffect(() => {
        axios
        .all([axios.get(educationLevelsURL)])
        .then(
            axios.spread((...responses) => {
                const responseEducationLevels = responses[0];

                console.log(responseEducationLevels);

                setEducationLevels(responseEducationLevels.data);
            })
        )
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



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

        axios
            .patch(currentPersonURL, {
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
                <h2>{person.id}{person.email}</h2>
            </div>

            <form>

                <label>

                    Education Level:
                    
                    
                    <select name='option' defaultValue={educationLevels[person.education_level]} onChange={handleChangeChosenEducationLevel}>

                        <option value=''></option>

                        {
                        educationLevels.map((educationLevel) => 
                        <option value={educationLevel.id} key={educationLevel.id}>{educationLevel.name}</option>)
                        }

                    </select>

                </label><br/>


                <label>
                    Studies Finishing Date:
                    <input
                    type="date"
                    name="studies_finishing_date"
                    defaultValue={person.studies_finishing_date}
                    onChange={handleChangeStudiesFinishingDate}
                    />
                </label><br/>

                <label>
                    Linkedin Profile:
                    <input
                    type="text"
                    name="linkedin_profile"
                    defaultValue={person.linkedin_profile}
                    onChange={handleChangeLinkedinProfile}
                    />
                </label><br/>


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
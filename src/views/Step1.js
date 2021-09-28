
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";



// primer formulario

const Step1 = () => {

    const { user } = useAuth0();
  

    const personsURL = "http://127.0.0.1:8000/app_flevo/persons/";
    const schoolsURL = "http://127.0.0.1:8000/app_flevo/schools/";
    const programsURL = "http://127.0.0.1:8000/app_flevo/programs/";
    const applicationsURL = "http://127.0.0.1:8000/app_flevo/applications/";

    const history = useHistory()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [identityDocumentNumber, setIdentityDocumentNumber] = useState("");

    const [schools, setSchools] = useState([])
    const [programs, setPrograms] = useState([])

    const [chosenSchool, setChosenSchool] = useState(null)
    const [chosenProgram, setChosenProgram] = useState(null)

    const [programStartingDate, setProgramStartingDate] = useState(null)
    const [percentageRequested, setPercentageRequested] = useState(null)



    // useEffect(() => {

    //     axios
    //         .get(schoolsURL)
    //         .then((response) => {
    //             setSchools(response.data);
    //         })
            

    //     axios
    //         .get(programsURL)
    //         .then((response) => {
    //             setPrograms(response.data);
    //         })

    // }, []);


    const getSchools = axios.get(schoolsURL);
    const getPrograms = axios.get(programsURL);

    useEffect(() => {
        axios
        .all([getSchools, getPrograms])
        .then(
            axios.spread((...responses) => {
                const responseSchools = responses[0];
                const responsePrograms = responses[1];

                console.log(responseSchools, responsePrograms);

                setSchools(responseSchools.data);
                setPrograms(responsePrograms.data);
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

    function handleChangeFirstName(event) {
        // event.preventDefault();
        setFirstName(event.target.value);
    }

    function handleChangeMiddleName(event) {
        // event.preventDefault();
        setMiddleName(event.target.value);
    }

    function handleChangeLastName(event) {
        // event.preventDefault();
        setLastName(event.target.value);
    }

    function handleChangeIdentityDocumentNumber(event) {
        // event.preventDefault();
        setIdentityDocumentNumber(event.target.value);
    }

    function handleChangeChosenSchool(event) {
        setChosenSchool(event.target.value);
    }


    function handleChangeChosenProgram(event) {
        setChosenProgram(event.target.value);
    }

    function handleChangeProgramStartingDate(event) {
        setProgramStartingDate(event.target.value);
    }

    function handleChangePercentageRequested(event) {
        setPercentageRequested(event.target.value);
    }



    function handleClickNext(event) {
        event.preventDefault();
        console.log(email, password, firstName, middleName, lastName, identityDocumentNumber)

        axios
            .post(personsURL, {
                email: email,
                password: password,
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                identity_document_number: identityDocumentNumber,
            })
            .then((response) => {
                console.log(response.data);
                return response
            })
            .then((response) => {
                console.log(response.data.id)

                axios
                .post(applicationsURL, {
                    applicant: Number(response.data.id),
                    program: Number(chosenProgram),
                    program_starting_date: programStartingDate,
                    percentage_requested: percentageRequested,
                    application_status: 1,
                })
                .then((response) => {
                    console.log(response)

                    alert('La aplicacion ha sido creada exitosamente')
                    
                    history.push("/step2")

                })
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
                    default={user.email}
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
                    First Name:
                    <input
                    type="text"
                    name="name"
                    onChange={handleChangeFirstName}
                    />
                </label><br/>

                <label>
                    Middle Name:
                    <input
                    type="text"
                    name="middle_name"
                    onChange={handleChangeMiddleName}
                    />
                </label><br/>

                <label>
                    Last Name:
                    <input
                    type="text"
                    name="last_name"
                    onChange={handleChangeLastName}
                    />
                </label><br/>

                <label>
                    Identity Document Number:
                    <input
                    type="text"
                    name="identity_document_number"
                    onChange={handleChangeIdentityDocumentNumber}
                    />
                </label><br/>

                <label>

                    School:
                    <select name='option' onChange={handleChangeChosenSchool}>

                        <option value=''></option>

                        {
                        schools.map((school) => 
                        <option value={school.id} key={school.id}>{school.name}</option>)
                        }

                    </select>

                </label><br/>


                <label>

                    Program:

                    <select name='option' onChange={handleChangeChosenProgram}>
                        
                        <option value=''></option>

                        {
                        programs.map((program) => 
                            program.school === Number(chosenSchool) && <option value={program.id} key={program.id}>{program.name}</option>)
                        }

                    </select>

                </label><br/>



                <label>
                    Program Starting Date:
                    <input
                    type="date"
                    name="program_starting_date"
                    onChange={handleChangeProgramStartingDate}
                    />
                </label><br/>

                <label>
                    Percentage Requested:
                    <input
                    type="text" pattern="[0-9]*"
                    defaultValue='100'
                    name="percentage_requested"
                    onChange={handleChangePercentageRequested}
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

export default Step1
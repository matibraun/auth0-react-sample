
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

import { useContext } from "react";

import { PersonContext } from "../components";




// primer form

const Step1 = () => {

    const { person } = useContext(PersonContext)
    

    const personsURL = "http://127.0.0.1:8000/app_flevo/persons/";

    const currentPersonURL = personsURL + person.id + "/";

    const schoolsURL = "http://127.0.0.1:8000/app_flevo/schools/";
    const programsURL = "http://127.0.0.1:8000/app_flevo/programs/";
    const applicationsURL = "http://127.0.0.1:8000/app_flevo/applications/";

    const history = useHistory()

    const [firstName, setFirstName] = useState(person.first_name);
    const [middleName, setMiddleName] = useState(person.middle_name);
    const [lastName, setLastName] = useState(person.last_name);
    const [identityDocumentNumber, setIdentityDocumentNumber] = useState(person.identity_document_number);

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


    // const getSchools = axios.get(schoolsURL);
    // const getPrograms = axios.get(programsURL);

    useEffect(() => {
            
        axios
        .all([axios.get(schoolsURL), axios.get(programsURL)])
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
        console.log('aca')
        console.log(currentPersonURL)
        console.log(firstName)

        axios
            .patch(currentPersonURL, {
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                identity_document_number: identityDocumentNumber,
            })
            .then((response) => {
                console.log(response.data);
            })
            .then(() => {

                axios
                .post(applicationsURL, {
                    applicant: Number(person.id),
                    program: Number(chosenProgram),
                    program_starting_date: programStartingDate,
                    percentage_requested: percentageRequested,
                    application_status: 1,
                })
                .then((response) => {

                    alert('La aplicacion ha sido creada exitosamente')
                    
                    // history.push("/step2")

                })
            })
    }



    return (
        <div>

            <div className="col-md text-center text-md-left">
                <h2>{person.id}{person.email}</h2>
            </div>


            <form>

                <label>
                    First Name:
                    <input
                    type="text"
                    name="name"
                    defaultValue={person.first_name}
                    onChange={handleChangeFirstName}
                    />
                </label><br/>

                <label>
                    Middle Name:
                    <input
                    type="text"
                    name="middle_name"
                    defaultValue={person.middle_name}
                    onChange={handleChangeMiddleName}
                    />
                </label><br/>

                <label>
                    Last Name:
                    <input
                    type="text"
                    name="last_name"
                    defaultValue={person.last_name}
                    onChange={handleChangeLastName}
                    />
                </label><br/>

                <label>
                    Identity Document Number:
                    <input
                    type="text"
                    name="identity_document_number"
                    defaultValue={person.identity_document_number}
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
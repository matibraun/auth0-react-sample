
import React, { useEffect, useState } from "react";
import Logo_Flevo from '../assets/Logo_Flevo.png';

import axios from "axios";
// import { useHistory } from 'react-router-dom';


const IframeForm = (props) => {

    const personsURL = "http://127.0.0.1:8000/app_flevo/persons/";

    const applicationsURL = "http://127.0.0.1:8000/app_flevo/applications/";

    const schoolsURL = "http://127.0.0.1:8000/app_flevo/schools/";

    const currentSchoolURL =  schoolsURL + props.schoolId + "/";;

    const programsURL = "http://127.0.0.1:8000/app_flevo/programs/";

    const currentPrograms = programsURL + "?schoolId=" + props.schoolId


    const emailInput = React.useRef();
    const firstNameInput = React.useRef();
    const lastNameInput = React.useRef();
    const chosenProgramInput = React.useRef();
    const programStartingDateInput = React.useRef();
    const percentageRequestedInput = React.useRef();


    const [email, setEmail] = useState();

    const personFilteredByEmailURL = personsURL + "?email=" + email


    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const [school, setSchool] = useState()

    const [programs, setPrograms] = useState([])
    const [chosenProgram, setChosenProgram] = useState([])

    const [programStartingDate, setProgramStartingDate] = useState()
    const [percentageRequested, setPercentageRequested] = useState(100)




    useEffect(() => {
        axios
        .all([axios.get(currentSchoolURL), axios.get(currentPrograms)])
        .then(
            axios.spread((...responses) => {
                const responseSchool = responses[0];
                const responsePrograms = responses[1];

                console.log(responseSchool);
                console.log(responseSchool.data);

                // console.log(responsePrograms);
                // console.log(responsePrograms.data)

                setSchool(responseSchool.data);
                setPrograms(responsePrograms.data);

                console.log(school)
                console.log(programs)

            })
        )
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }

    function handleChangeFirstName(event) {
        setFirstName(event.target.value);
    }

    function handleChangeLastName(event) {
        setLastName(event.target.value);
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



    function clearStateAndInputFields() {
        setEmail(null);
        setFirstName(null);
        setLastName(null);
        setChosenProgram(null);
        setProgramStartingDate(null);
        setPercentageRequested(null);
        emailInput.current.value = "";
        firstNameInput.current.value = "";
        lastNameInput.current.value = "";
        chosenProgramInput.current.value = "";
        programStartingDateInput.current.value = "";
        percentageRequestedInput.current.value = 100;
    }




    
    function handleClickSendPreApplication(event) {
        event.preventDefault();
        console.log('aca')
        console.log(personsURL)
        console.log(firstName)


        axios
        .get(personFilteredByEmailURL)
        .then((response) => {
            console.log(response)
            console.log(response.data.length)
            return response
        })
        .then((response) => {
            if (response.data.length === 0) {
                console.log('se creara una nueva person y application')

                axios
                .post(personsURL, {
                    email: email,
                    password: 'Hola1234!',
                    first_name: firstName,
                    middle_name: null,
                    last_name: lastName,
                })
                .then((response) => {
                    console.log(response.data.id);
                    axios
                    .post(applicationsURL, {
                        applicant: response.data.id,
                        program: Number(chosenProgram),
                        program_starting_date: programStartingDate,
                        percentage_requested: percentageRequested,
                        application_status: 1,
                    })
                    .then( (response) => {
                        console.log(response)
                        console.log(programs)
                        console.log(Number(chosenProgram))
                        
                        var chosenProgramName = ''

                        programs.map((program) => program.id === response.data.program ? chosenProgramName = program.name : null)

                        alert('El usuario ' + email + ' ha sido creado, y se ha cargado una aplicacion a su nombre con id ' + response.data.id + ' para el curso ' + chosenProgramName)
                        console.log('estamos acaaaa')
                        
                        clearStateAndInputFields()
    
                    })
                })
            
            } else {

                const currentPersonURL = personsURL + response.data[0].id + "/";

                axios
                .patch(currentPersonURL, {
                    first_name: firstName,
                    middle_name: null,
                    last_name: lastName,
                })
                .then((response) => {
                    console.log(response.data.id);
                    axios
                    .post(applicationsURL, {
                        applicant: response.data.id,
                        program: Number(chosenProgram),
                        program_starting_date: programStartingDate,
                        percentage_requested: percentageRequested,
                        application_status: 1,
                    })
                    .then( () => {
    
                        var chosenProgramName = ''
                        programs.map((program) => program.id === response.data.program ? chosenProgramName = program.name : null)

                        alert('El usuario ' + email + ' ya existe. Se ha cargado una aplicacion a su nombre con id ' + response.data.id + ' para el curso ' + chosenProgramName)
                        console.log('estamos acaaaa')
                        
                        clearStateAndInputFields()           
    
                    })
                })

            }
        })

    }



    return (
        <div>

            <div className="text-center hero">
            <img className="mb-3 app-logo" src={Logo_Flevo} alt="Flevo logo" width="2000" />
            {school === undefined ? null : <h1 className="mb-4">{school.name}</h1>}
            </div>


            <form>

                <label>
                    Email:
                    <input
                    type="email"
                    name="email"
                    ref={emailInput}
                    onChange={handleChangeEmail}
                    />
                </label><br/>

                <label>
                    First Name:
                    <input
                    type="text"
                    name="first_name"
                    ref={firstNameInput}
                    onChange={handleChangeFirstName}
                    />
                </label><br/>

                <label>
                    Last Name:
                    <input
                    type="text"
                    name="last_name"
                    ref={lastNameInput}
                    onChange={handleChangeLastName}
                    />
                </label><br/>



                <label>

                    Program:

                    <select name='option' ref={chosenProgramInput} onChange={handleChangeChosenProgram}>
                        
                        <option value=''></option>

                        {
                        programs.map((program) => 
                            <option value={program.id} key={program.id}>{program.name}</option>)
                        }

                    </select>

                </label><br/>


                <label>
                    Program Starting Date:
                    <input
                    type="date"
                    name="program_starting_date"
                    ref={programStartingDateInput}
                    onChange={handleChangeProgramStartingDate}
                    />
                </label><br/>

                <label>
                    Percentage Requested:
                    <input
                    type="text" pattern="[0-9]*"
                    name="percentage_requested"
                    defaultValue='100'
                    ref={percentageRequestedInput}
                    onChange={handleChangePercentageRequested}
                    />
                </label><br/>



                <button
                type='submit'
                onClick={handleClickSendPreApplication}>
                    Send Pre Application
                </button><br/>

            </form>
        </div>
    )
}

export default IframeForm
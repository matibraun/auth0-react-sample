
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';


const IFrameForm = (props) => {

    const [email, setEmail] = useState();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const [school, setSchool] = useState()

    const [program, setProgram] = useState([])

    const [programStartingDate, setProgramStartingDate] = useState(null)
    const [percentageRequested, setPercentageRequested] = useState(100)


    useEffect(() => {
        setSchool(props.school)                    
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

    function handleChangeProgram(event) {
        setProgram(event.target.value);
    }

    function handleChangeProgramStartingDate(event) {
        setProgramStartingDate(event.target.value);
    }

    function handleChangePercentageRequested(event) {
        setPercentageRequested(event.target.value);
    }



    function handleClickNext(event) {
    }



    return (
        <div>

            <div className="text-center hero">
                {school}
            </div>

            <form>

                <label>
                    Email:
                    <input
                    type="email"
                    name="email"
                    onChange={handleChangeEmail}
                    />
                </label><br/>

                <label>
                    First Name:
                    <input
                    type="text"
                    name="first_name"
                    onChange={handleChangeFirstName}
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

                    Program:

                    <select name='option' onChange={handleChangeProgram}>
                        
                        <option value=''></option>
                        <option value='Programa1'>Program1</option>
                        <option value='Programa2'>Program2</option>
                        <option value='Programa3'>Program3</option>

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

                {email}<br/>
                {firstName}<br/>
                {lastName}<br/>
                {program}<br/>
                {programStartingDate}<br/>
                {percentageRequested}<br/>


                <button
                type='submit'
                onClick={handleClickNext}>
                    Next
                </button><br/>

            </form>
        </div>
    )
}

export default IFrameForm
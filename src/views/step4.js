
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

import { useContext } from "react";

import { PersonContext } from "../components";


// primer formulario

const Step4 = () => {

    const { person } = useContext(PersonContext)


    const personsURL = "http://127.0.0.1:8000/app_flevo/persons/"

    const currentPersonURL = personsURL + person.id + "/";


    const occupationsURL = "http://127.0.0.1:8000/app_flevo/occupations/"
    const contractTypesURL = "http://127.0.0.1:8000/app_flevo/contract_types/"
    const workloadsURL = "http://127.0.0.1:8000/app_flevo/workloads/"
    const sectorsURL = "http://127.0.0.1:8000/app_flevo/sectors/"
    const accountTypesURL = "http://127.0.0.1:8000/app_flevo/account_types/"
    

    const history = useHistory()


    const [occupations, setOccupations] = useState([]);
    const [chosenOccupation, setChosenOccupation] = useState(null)

    const [contractTypes, setContractTypes] = useState([]);
    const [chosenContractType, setChosenContractType] = useState(null)

    const [workloads, setWorkloads] = useState([]);
    const [chosenWorkload, setChosenWorkload] = useState(null)

    const [company, setCompany] = useState(person.company);

    const [sectors, setSectors] = useState([]);
    const [chosenSector, setChosenSector] = useState(null)

    const [position, setPosition] = useState(person.position);
    const [workingStartingDate, setWorkingStartingDate] = useState(person.working_starting_date);
    const [averageNetMonthlySalaryLastThreeMonths, setAverageNetMonthlySalaryLastThreeMonths] = useState(person.average_net_monthly_salary_last_three_months);
    // ver si false o ""
    const [hasAccount, setHasAccount] = useState(person.has_account);
    const [bank, setBank] = useState(person.bank);

    const [accountTypes, setAccountTypes] = useState([]);
    const [chosenAccountType, setChosenAccountType] = useState(null)




    // const getOccupations = axios.get(occupationsURL);
    // const getContractTypes = axios.get(contractTypesURL);
    // const getWorkloads = axios.get(workloadsURL);
    // const getSectors = axios.get(sectorsURL);
    // const getAccountTypes = axios.get(accountTypesURL);


    useEffect(() => {
        axios
        .all([axios.get(occupationsURL), axios.get(contractTypesURL), axios.get(workloadsURL), axios.get(sectorsURL), axios.get(accountTypesURL)])
        .then(
            axios.spread((...responses) => {
                const responseOccupations = responses[0];
                const responseContractTypes = responses[1];
                const responseWorkloads = responses[2];
                const responseSectors = responses[3];
                const responseAccountTypes = responses[4];

                console.log(responseOccupations, responseContractTypes, responseWorkloads, responseSectors, responseAccountTypes);

                setOccupations(responseOccupations.data);
                setContractTypes(responseContractTypes.data);
                setWorkloads(responseWorkloads.data);
                setSectors(responseSectors.data);
                setAccountTypes(responseAccountTypes.data);
            })
        )
    }, []); // eslint-disable-line react-hooks/exhaustive-deps




    function handleChangeChosenOccupation(event) {
        // event.preventDefault();
        setChosenOccupation(event.target.value);
    }

    function handleChangeChosenContractType(event) {
        // event.preventDefault();
        setChosenContractType(event.target.value);
    }

    function handleChangeChosenWorkload(event) {
        // event.preventDefault();
        setChosenWorkload(event.target.value);
    }

    function handleChangeCompany(event) {
        // event.preventDefault();
        setCompany(event.target.value);
    }

    function handleChangeChosenSector(event) {
        // event.preventDefault();
        setChosenSector(event.target.value);
    }

    function handleChangePosition(event) {
        // event.preventDefault();
        setPosition(event.target.value);
    }

    function handleChangeWorkingStartingDate(event) {
        // event.preventDefault();
        setWorkingStartingDate(event.target.value);
    }

    function handleChangeAverageNetMonthlySalaryLastThreeMonths(event) {
        // event.preventDefault();
        setAverageNetMonthlySalaryLastThreeMonths(event.target.value);
    }

    function handleChangeHasAccount(event) {
        // event.preventDefault();
        setHasAccount(event.target.checked);
    }

    function handleChangeBank(event) {
        // event.preventDefault();
        setBank(event.target.value);
    }

    function handleChangeChosenAccountType(event) {
        // event.preventDefault();
        setChosenAccountType(event.target.value);
    }




    function handleClickNext(event) {
        event.preventDefault();

        axios
            .patch(currentPersonURL, {
                occupation: chosenOccupation,
                contract_type: chosenContractType,
                workload: chosenWorkload,
                company: company, 
                sector: chosenSector,
                position: position,
                working_starting_date: workingStartingDate,
                average_net_monthly_salary_last_three_months: averageNetMonthlySalaryLastThreeMonths,
                has_account: hasAccount,
                bank: bank,
                account_type: chosenAccountType,
            })

            .then((response) => {
                console.log(response.data);
                alert('La info se ha cargado exitosamente')
                history.push("/application-review")
                console.log(person.has_account)
            })
    }



    return (
        <div>

            <div className="col-md text-center text-md-left">
                <h2>{person.id}{person.email}</h2>
            </div>

            <form>

                <label>

                    Occupation:
                    <select name='option' onChange={handleChangeChosenOccupation}>

                        <option value=''></option>

                        {
                        occupations.map((occupation) => 
                        <option value={occupation.id} key={occupation.id}>{occupation.name}</option>)
                        }

                    </select>

                </label><br/>

                <label>

                    Contract Type:
                    <select name='option' onChange={handleChangeChosenContractType}>

                        <option value=''></option>

                        {
                        contractTypes.map((contractType) => 
                        <option value={contractType.id} key={contractType.id}>{contractType.name}</option>)
                        }

                    </select>

                </label><br/>


                <label>

                    Workload:
                    <select name='option' onChange={handleChangeChosenWorkload}>

                        <option value=''></option>

                        {
                        workloads.map((workload) => 
                        <option value={workload.id} key={workload.id}>{workload.name}</option>)
                        }

                    </select>

                </label><br/>

                <label>
                    Company:
                    <input
                    type="text"
                    name="company"
                    defaultValue={person.company}
                    onChange={handleChangeCompany}
                    />
                </label><br/>

                <label>

                    Sector:
                    <select name='option' onChange={handleChangeChosenSector}>

                        <option value=''></option>

                        {
                        sectors.map((sector) => 
                        <option value={sector.id} key={sector.id}>{sector.name}</option>)
                        }

                    </select>

                </label><br/>

                <label>
                    Position:
                    <input
                    type="text"
                    name="position"
                    defaultValue={person.position}
                    onChange={handleChangePosition}
                    />
                </label><br/>



                <label>
                    Working Starting Date:
                    <input
                    type="date"
                    name="working_starting_date"
                    defaultValue={person.working_starting_date}
                    onChange={handleChangeWorkingStartingDate}
                    />
                </label><br/>

                <label>
                    Average Net Monthly Salary Last Three Months:
                    <input
                    type="text" pattern="[0-9]*"
                    name="average_net_monthly_salary_last_three_months"
                    defaultValue={person.average_net_monthly_salary_last_three_months}
                    onChange={handleChangeAverageNetMonthlySalaryLastThreeMonths}
                    />
                </label><br/>

                <label>
                    Do You Have a Bank Account:
                    <input
                    type="checkbox"
                    name="has_account"
                    defaultChecked={person.has_account}
                    onChange={handleChangeHasAccount}
                    />
                </label><br/>

                {
                hasAccount
                ? 
                <div>
                    <label>
                        Bank:
                        <input
                        type="text"
                        name="bank"
                        defaultValue={person.bank}
                        onChange={handleChangeBank}
                        />
                    </label><br/>

                    <label>

                        Account Type:
                        <select name='option' onChange={handleChangeChosenAccountType}>

                            <option value=''></option>

                            {
                            accountTypes.map((accountType) => 
                            <option value={accountType.id} key={accountType.id}>{accountType.name}</option>)
                            }

                        </select>

                    </label><br/>

                </div>

                : null
                    
                }



                <button
                type='submit'
                onClick={handleClickNext}>
                    Next
                </button><br/>

            </form>
        </div>
    )
}

export default Step4
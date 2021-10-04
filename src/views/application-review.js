
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

import { useContext } from "react";

import { PersonContext } from "../components";




// primer form

const ApplicationReview = () => {

    const { person } = useContext(PersonContext)
    

    const personsURL = "http://127.0.0.1:8000/app_flevo/persons/";

    const currentPersonURL = personsURL + person.id + "/";

    const schoolsURL = "http://127.0.0.1:8000/app_flevo/schools/";
    const programsURL = "http://127.0.0.1:8000/app_flevo/programs/";
    const applicationsURL = "http://127.0.0.1:8000/app_flevo/applications/";

    const gendersURL = "http://127.0.0.1:8000/app_flevo/genders/"
    const civilStatesURL = "http://127.0.0.1:8000/app_flevo/civil_states/"
    const housingSituationsURL = "http://127.0.0.1:8000/app_flevo/housing_situations/"
    const districtsURL = "http://127.0.0.1:8000/app_flevo/districts/"
    const citiesURL = "http://127.0.0.1:8000/app_flevo/cities/"
    const provincesURL = "http://127.0.0.1:8000/app_flevo/provinces/"
    const countriesURL = "http://127.0.0.1:8000/app_flevo/countries/"

    const educationLevelsURL = "http://127.0.0.1:8000/app_flevo/education_levels/"

    const occupationsURL = "http://127.0.0.1:8000/app_flevo/occupations/"
    const contractTypesURL = "http://127.0.0.1:8000/app_flevo/contract_types/"
    const workloadsURL = "http://127.0.0.1:8000/app_flevo/workloads/"
    const sectorsURL = "http://127.0.0.1:8000/app_flevo/sectors/"
    const accountTypesURL = "http://127.0.0.1:8000/app_flevo/account_types/"



    const history = useHistory()

    const [firstName, setFirstName] = useState(person.first_name);
    const [middleName, setMiddleName] = useState(person.middle_name);
    const [lastName, setLastName] = useState(person.last_name);
    const [identityDocumentNumber, setIdentityDocumentNumber] = useState(person.identity_document_number);

    const [schools, setSchools] = useState([])
    const [chosenSchool, setChosenSchool] = useState(null)

    const [programs, setPrograms] = useState([])
    const [chosenProgram, setChosenProgram] = useState(null)

    const [programStartingDate, setProgramStartingDate] = useState(null)
    const [percentageRequested, setPercentageRequested] = useState(null)

    const [genders, setGenders] = useState([]);
    const [chosenGender, setChosenGender] = useState(person.gender)

    const [dateOfBirth, setDateOfBirth] = useState(person.date_of_birth);
    const [taxNumber, setTaxNumber] = useState(person.tax_number);
    
    const [civilStates, setCivilStates] = useState([]);
    const [chosenCivilState, setChosenCivilState] = useState(person.civil_state)

    const [housingSituations, setHousingSituations] = useState([]);
    const [chosenHousingSituation, setChosenHousingSituation] = useState(person.housing_situation)

    const [phoneNumber, setPhoneNumber] = useState(person.phone_number);
    const [street, setStreet] = useState(person.street);
    const [houseNumber, setHouseNumber] = useState(person.house_number);
    const [floorApartment, setFloorApartment] = useState(person.floor_apartment);
    const [zipCode, setZipCode] = useState(person.zip_code);


    const [districts, setDistricts] = useState([])
    const [chosenDistrict, setChosenDistrict] = useState(person.district)

    const [cities, setCities] = useState([])
    const [chosenCity, setChosenCity] = useState(person.city)

    const [provinces, setProvinces] = useState([])
    const [chosenProvince, setChosenProvince] = useState(person.province)
    
    const [countries, setCountries] = useState([])
    const [chosenCountry, setChosenCountry] = useState(person.country)


    const [educationLevels, setEducationLevels] = useState([]);
    const [chosenEducationLevel, setChosenEducationLevel] = useState(person.education_level)

    const [studiesFinishingDate, setStudiesFinishingDate] = useState(person.studies_finishing_date);
    const [linkedinProfile, setLinkedinProfile] = useState(person.linkedin_profile);

    const [occupations, setOccupations] = useState([]);
    const [chosenOccupation, setChosenOccupation] = useState(person.occupation)

    const [contractTypes, setContractTypes] = useState([]);
    const [chosenContractType, setChosenContractType] = useState(person.contract_type)

    const [workloads, setWorkloads] = useState([]);
    const [chosenWorkload, setChosenWorkload] = useState(person.workload)

    const [company, setCompany] = useState(person.company);

    const [sectors, setSectors] = useState([]);
    const [chosenSector, setChosenSector] = useState(person.sector)

    const [position, setPosition] = useState(person.position);
    const [workingStartingDate, setWorkingStartingDate] = useState(person.working_starting_date);
    const [averageNetMonthlySalaryLastThreeMonths, setAverageNetMonthlySalaryLastThreeMonths] = useState(person.average_net_monthly_salary_last_three_months);
    // ver si false o ""
    const [hasAccount, setHasAccount] = useState(person.has_account);
    const [bank, setBank] = useState(person.bank);

    const [accountTypes, setAccountTypes] = useState([]);
    const [chosenAccountType, setChosenAccountType] = useState(person.account_type)



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
        .all([axios.get(schoolsURL), axios.get(programsURL), axios.get(gendersURL), axios.get(civilStatesURL), axios.get(housingSituationsURL), axios.get(districtsURL), axios.get(citiesURL), axios.get(provincesURL), axios.get(countriesURL), axios.get(educationLevelsURL),  axios.get(occupationsURL), axios.get(contractTypesURL), axios.get(workloadsURL), axios.get(sectorsURL), axios.get(accountTypesURL)    ])
        .then(
            axios.spread((...responses) => {
                const responseSchools = responses[0];
                const responsePrograms = responses[1];
                const responseGenders = responses[2];
                const responseCivilStates = responses[3];
                const responseHousingSituations = responses[4];
                const responseDistricts = responses[5];
                const responseCities = responses[6];
                const responseProvinces = responses[7];
                const responseCountries = responses[8];
                const responseEducationLevels = responses[9];
                const responseOccupations = responses[10];
                const responseContractTypes = responses[11];
                const responseWorkloads = responses[12];
                const responseSectors = responses[13];
                const responseAccountTypes = responses[14];



                console.log(responseSchools, responsePrograms, responseCivilStates, responseHousingSituations, responseDistricts, responseCities, responseProvinces, responseCountries, responseEducationLevels, responseOccupations, responseContractTypes, responseWorkloads, responseSectors, responseAccountTypes  );

                setSchools(responseSchools.data);
                setPrograms(responsePrograms.data);
                setGenders(responseGenders.data);
                setCivilStates(responseCivilStates.data);
                setHousingSituations(responseHousingSituations.data);
                setDistricts(responseDistricts.data);
                setCities(responseCities.data);
                setProvinces(responseProvinces.data);
                setCountries(responseCountries.data);
                setEducationLevels(responseEducationLevels.data);
                setOccupations(responseOccupations.data);
                setContractTypes(responseContractTypes.data);
                setWorkloads(responseWorkloads.data);
                setSectors(responseSectors.data);
                setAccountTypes(responseAccountTypes.data);
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

    function handleChangeChosenGender(event) {
        // event.preventDefault();
        setChosenGender(event.target.value);
    }

    function handleChangeDateOfBirth(event) {
        // event.preventDefault();
        setDateOfBirth(event.target.value);
    }

    function handleChangeTaxNumber(event) {
        // event.preventDefault();
        setTaxNumber(event.target.value);
    }

    function handleChangeChosenCivilState(event) {
        // event.preventDefault();
        setChosenCivilState(event.target.value);
    }

    function handleChangeChosenHousingSituation(event) {
        setChosenHousingSituation(event.target.value);
    }

    function handleChangePhoneNumber(event) {
        setPhoneNumber(event.target.value);
    }

    function handleChangeStreet(event) {
        setStreet(event.target.value);
    }

    function handleChangeHouseNumber(event) {
        setHouseNumber(event.target.value);
    }

    function handleChangeFloorApartment(event) {
        setFloorApartment(event.target.value);
    }

    function handleChangeZipCode(event) {
        setZipCode(event.target.value);
    }

    function handleChangeChosenDistrict(event) {
        setChosenDistrict(event.target.value);
    }

    function handleChangeChosenCity(event) {
        setChosenCity(event.target.value);
    }

    function handleChangeChosenProvince(event) {
        setChosenProvince(event.target.value);
    }

    function handleChangeChosenCountry(event) {
        setChosenCountry(event.target.value);
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
// ojo que aca va con target.checked
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
        console.log('aca')
        console.log(currentPersonURL)
        console.log(firstName)

        axios
            .patch(currentPersonURL, {
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                identity_document_number: identityDocumentNumber,
                date_of_birth: dateOfBirth,
                gender: chosenGender,
                tax_number: taxNumber, 
                civil_state: chosenCivilState,
                housing_situation: chosenHousingSituation,
                phone_number: phoneNumber,
                street: street,
                house_number: houseNumber,
                floor_apartment: floorApartment,
                zip_code: zipCode,
                district: chosenDistrict,
                city: chosenCity,
                province: chosenProvince,
                country: chosenCountry,
                education_level: chosenEducationLevel,
                studies_finishing_date: studiesFinishingDate,
                linkedin_profile: linkedinProfile,
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
                    
                    history.push("/application-success")

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

                <label>

                    Gender:
                    <select name='option'  value={chosenGender === null ? "" : chosenGender} onChange={handleChangeChosenGender}>

                        <option value=''></option>

                        {
                        genders.map((gender) => 
                        <option value={gender.id} key={gender.id}>{gender.name}</option>)
                        }

                    </select>

                </label><br/>


                <label>
                    Date of Birth:
                    <input
                    type="date"
                    name="date_of_birth"
                    defaultValue={person.date_of_birth}
                    onChange={handleChangeDateOfBirth}
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
                    Tax Number:
                    <input
                    type="text"
                    name="tax_number"
                    defaultValue={person.tax_number}
                    onChange={handleChangeTaxNumber}
                    />
                </label><br/>


                <label>

                    Civil State:
                    <select
                    name='option'
                    value={chosenCivilState === null ? "" : chosenCivilState} 
                    onChange={handleChangeChosenCivilState}>

                        <option value=''></option>

                        {
                        civilStates.map((civilState) => 
                        <option value={civilState.id} key={civilState.id}>{civilState.name}</option>)
                        }

                    </select>

                </label><br/>

                <label>

                    Housing Situation:
                    <select name='option' value={chosenHousingSituation === null ? "" : chosenHousingSituation} onChange={handleChangeChosenHousingSituation}>

                        <option value=''></option>

                        {
                        housingSituations.map((housingSituation) => 
                        <option value={housingSituation.id} key={housingSituation.id}>{housingSituation.name}</option>)
                        }

                    </select>

                </label><br/>




                <label>
                    Phone Number:
                    <input
                    type="text"
                    name="phone_number"
                    defaultValue={person.phone_number}
                    onChange={handleChangePhoneNumber}
                    />
                </label><br/>


                <label>
                    Street:
                    <input
                    type="text"
                    name="street"
                    defaultValue={person.street}
                    onChange={handleChangeStreet}
                    />
                </label><br/>

                <label>
                    Number:
                    <input
                    type="text"
                    name="house_number"
                    defaultValue={person.house_number}
                    onChange={handleChangeHouseNumber}
                    />
                </label><br/>

                <label>
                    Floor / Apartment:
                    <input
                    type="text"
                    name="floor_apartment"
                    defaultValue={person.floor_apartment}
                    onChange={handleChangeFloorApartment}
                    />
                </label><br/>

                <label>
                    Zip Code:
                    <input
                    type="text"
                    name="zip_code"
                    defaultValue={person.zip_code}
                    onChange={handleChangeZipCode}
                    />
                </label><br/>






                <label>

                    District:
                    <select name='option' value={chosenDistrict === null ? "" : chosenDistrict} onChange={handleChangeChosenDistrict}>

                        <option value=''></option>

                        {
                        districts.map((district) => 
                        <option value={district.id} key={district.id}>{district.name}</option>)
                        }

                    </select>

                </label><br/>


                <label>

                    City:
                    <select name='option' value={chosenCity === null ? "" : chosenCity} onChange={handleChangeChosenCity}>

                        <option value=''></option>

                        {
                        cities.map((city) => 
                        <option value={city.id} key={city.id}>{city.name}</option>)
                        }

                    </select>

                </label><br/>

                <label>

                    Province:
                    <select name='option' value={chosenProvince === null ? "" : chosenProvince} onChange={handleChangeChosenProvince}>

                        <option value=''></option>

                        {
                        provinces.map((province) => 
                        <option value={province.id} key={province.id}>{province.name}</option>)
                        }

                    </select>

                </label><br/>


                <label>
                    Country:
                    <select name='option' value={chosenCountry === null ? "" : chosenCountry} onChange={handleChangeChosenCountry}>

                        <option value=''></option>

                        {
                        countries.map((country) => 
                        <option value={country.id} key={country.id}>{country.name}</option>)
                        }

                    </select>

                </label><br/>


                <label>

                    Education Level:

                    <select name='option' value={chosenEducationLevel === null ? "" : chosenEducationLevel} onChange={handleChangeChosenEducationLevel}>

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

                <label>

                    Occupation:
                    <select name='option' value={chosenOccupation === null ? "" : chosenOccupation} onChange={handleChangeChosenOccupation}>

                        <option value=''></option>

                        {
                        occupations.map((occupation) => 
                        <option value={occupation.id} key={occupation.id}>{occupation.name}</option>)
                        }

                    </select>

                </label><br/>

                <label>

                    Contract Type:
                    <select name='option' value={chosenContractType === null ? "" : chosenContractType} onChange={handleChangeChosenContractType}>

                        <option value=''></option>

                        {
                        contractTypes.map((contractType) => 
                        <option value={contractType.id} key={contractType.id}>{contractType.name}</option>)
                        }

                    </select>

                </label><br/>


                <label>

                    Workload:
                    <select name='option' value={chosenWorkload === null ? "" : chosenWorkload} onChange={handleChangeChosenWorkload}>

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
                    <select name='option' value={chosenSector === null ? "" : chosenSector} onChange={handleChangeChosenSector}>

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
                        <select name='option' value={chosenAccountType === null ? "" : chosenAccountType} onChange={handleChangeChosenAccountType}>

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

export default ApplicationReview
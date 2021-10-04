
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

import { useContext } from "react";

import { PersonContext } from "../components";


// primer formulario

const Step2 = () => {

    const { person } = useContext(PersonContext)

    const personsURL = "http://127.0.0.1:8000/app_flevo/persons/"

    const currentPersonURL = personsURL + person.id + "/";


    const gendersURL = "http://127.0.0.1:8000/app_flevo/genders/"
    const civilStatesURL = "http://127.0.0.1:8000/app_flevo/civil_states/"
    const housingSituationsURL = "http://127.0.0.1:8000/app_flevo/housing_situations/"
    const districtsURL = "http://127.0.0.1:8000/app_flevo/districts/"
    const citiesURL = "http://127.0.0.1:8000/app_flevo/cities/"
    const provincesURL = "http://127.0.0.1:8000/app_flevo/provinces/"
    const countriesURL = "http://127.0.0.1:8000/app_flevo/countries/"


    const history = useHistory()

    const [genders, setGenders] = useState([]);
    const [chosenGender, setChosenGender] = useState(person.gender)

    const [dateOfBirth, setDateOfBirth] = useState(person.date_of_birth);
    const [identityDocumentNumber, setIdentityDocumentNumber] = useState(person.identity_document_number);
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


    // const getGenders = axios.get(gendersURL);
    // const getCivilStates = axios.get(civilStatesURL);
    // const getHousingSituations = axios.get(housingSituationsURL);
    // const getDistricts = axios.get(districtsURL);
    // const getCities = axios.get(citiesURL);
    // const getProvinces = axios.get(provincesURL);
    // const getCountries = axios.get(countriesURL);


    useEffect(() => {
        axios
        .all([axios.get(gendersURL), axios.get(civilStatesURL), axios.get(housingSituationsURL), axios.get(districtsURL), axios.get(citiesURL), axios.get(provincesURL), axios.get(countriesURL)])
        .then(
            axios.spread((...responses) => {
                const responseGenders = responses[0];
                const responseCivilStates = responses[1];
                const responseHousingSituations = responses[2];
                const responseDistricts = responses[3];
                const responseCities = responses[4];
                const responseProvinces = responses[5];
                const responseCountries = responses[6];

                console.log(responseCivilStates, responseHousingSituations, responseDistricts, responseCities, responseProvinces, responseCountries);

                setGenders(responseGenders.data);
                setCivilStates(responseCivilStates.data);
                setHousingSituations(responseHousingSituations.data);
                setDistricts(responseDistricts.data);
                setCities(responseCities.data);
                setProvinces(responseProvinces.data);
                setCountries(responseCountries.data);
            })
        )
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    function handleChangeChosenGender(event) {
        // event.preventDefault();
        setChosenGender(event.target.value);
    }

    function handleChangeDateOfBirth(event) {
        // event.preventDefault();
        setDateOfBirth(event.target.value);
    }

    function handleChangeIdentityDocumentNumber(event) {
        // event.preventDefault();
        setIdentityDocumentNumber(event.target.value);
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



    function handleClickNext(event) {
        event.preventDefault();
        console.log(currentPersonURL)

        axios
            .patch(currentPersonURL, {
                date_of_birth: dateOfBirth,
                gender: chosenGender,
                identity_document_number: identityDocumentNumber,
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
            })

            .then((response) => {
                console.log(response.data);
                alert('La info se ha cargado exitosamente')
                history.push("/step3")
            })
    }



    return (
        <div>

            <div className="col-md text-center text-md-left">
                <h2>{person.id}{person.email}</h2>
            </div>


            <form>

                <label>

                    Gender:
                    <select name='option'  value={chosenGender == null ? "" : chosenGender} onChange={handleChangeChosenGender}>

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
                    value={chosenCivilState == null ? "" : chosenCivilState} 
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
                    <select name='option' value={chosenHousingSituation == null ? "" : chosenHousingSituation} onChange={handleChangeChosenHousingSituation}>

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
                    <select name='option' value={chosenDistrict == null ? "" : chosenDistrict} onChange={handleChangeChosenDistrict}>

                        <option value=''></option>

                        {
                        districts.map((district) => 
                        <option value={district.id} key={district.id}>{district.name}</option>)
                        }

                    </select>

                </label><br/>


                <label>

                    City:
                    <select name='option' value={chosenCity == null ? "" : chosenCity} onChange={handleChangeChosenCity}>

                        <option value=''></option>

                        {
                        cities.map((city) => 
                        <option value={city.id} key={city.id}>{city.name}</option>)
                        }

                    </select>

                </label><br/>

                <label>

                    Province:
                    <select name='option' value={chosenProvince == null ? "" : chosenProvince} onChange={handleChangeChosenProvince}>

                        <option value=''></option>

                        {
                        provinces.map((province) => 
                        <option value={province.id} key={province.id}>{province.name}</option>)
                        }

                    </select>

                </label><br/>


                <label>

                    Country:
                    <select name='option' value={chosenCountry == null ? "" : chosenCountry} onChange={handleChangeChosenCountry}>

                        <option value=''></option>

                        {
                        countries.map((country) => 
                        <option value={country.id} key={country.id}>{country.name}</option>)
                        }

                    </select>

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

export default Step2
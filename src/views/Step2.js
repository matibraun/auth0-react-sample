
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";


// primer formulario

const Step2 = () => {

    const { user } = useAuth0();


    const personsURL = "http://127.0.0.1:8000/app_flevo/persons/"
    const gendersURL = "http://127.0.0.1:8000/app_flevo/genders/"
    const civilStatesURL = "http://127.0.0.1:8000/app_flevo/civil_states/"
    const housingSituationsURL = "http://127.0.0.1:8000/app_flevo/housing_situations/"
    const districtsURL = "http://127.0.0.1:8000/app_flevo/districts/"
    const citiesURL = "http://127.0.0.1:8000/app_flevo/cities/"
    const provincesURL = "http://127.0.0.1:8000/app_flevo/provinces/"
    const countriesURL = "http://127.0.0.1:8000/app_flevo/countries/"


    const history = useHistory()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [genders, setGenders] = useState([]);

    const [chosenGender, setChosenGender] = useState(null)


    const [dateOfBirth, setDateOfBirth] = useState("");
    const [identityDocumentNumber, setIdentityDocumentNumber] = useState("");
    const [taxNumber, setTaxNumber] = useState("");
    
    const [civilStates, setCivilStates] = useState([]);

    const [chosenCivilState, setChosenCivilState] = useState(null)

    const [housingSituations, setHousingSituations] = useState([]);

    const [chosenHousingSituation, setChosenHousingSituation] = useState(null)

    const [phoneNumber, setPhoneNumber] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [floorApartment, setFloorApartment] = useState("");
    const [zipCode, setZipCode] = useState("");


    const [districts, setDistricts] = useState([])
    const [cities, setCities] = useState([])
    const [provinces, setProvinces] = useState([])
    const [countries, setCountries] = useState([])

    const [chosenDistrict, setChosenDistrict] = useState(null)
    const [chosenCity, setChosenCity] = useState(null)
    const [chosenProvince, setChosenProvince] = useState(null)
    const [chosenCountry, setChosenCountry] = useState(null)


    const getGenders = axios.get(gendersURL);
    const getCivilStates = axios.get(civilStatesURL);
    const getHousingSituations = axios.get(housingSituationsURL);
    const getDistricts = axios.get(districtsURL);
    const getCities = axios.get(citiesURL);
    const getProvinces = axios.get(provincesURL);
    const getCountries = axios.get(countriesURL);


    useEffect(() => {
        axios
        .all([getGenders, getCivilStates, getHousingSituations, getDistricts, getCities, getProvinces, getCountries])
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



    function handleChangeEmail(event) {
        // event.preventDefault();
        setEmail(event.target.value);
    }

    function handleChangePassword(event) {
        // event.preventDefault();
        setPassword(event.target.value);
    }

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
        console.log(email, password, chosenGender, dateOfBirth,  identityDocumentNumber, taxNumber, chosenCivilState, chosenHousingSituation, phoneNumber, street, houseNumber, floorApartment, zipCode, chosenDistrict, chosenCity, chosenProvince, chosenCountry)

        axios
            .post(personsURL, {
                email: email,
                password: password,
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

                    Gender:
                    <select name='option' onChange={handleChangeChosenGender}>

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
                    onChange={handleChangeDateOfBirth}
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
                    Tax Number:
                    <input
                    type="text"
                    name="tax_number"
                    onChange={handleChangeTaxNumber}
                    />
                </label><br/>


                <label>

                    Civil State:
                    <select name='option' onChange={handleChangeChosenCivilState}>

                        <option value=''></option>

                        {
                        civilStates.map((civilState) => 
                        <option value={civilState.id} key={civilState.id}>{civilState.name}</option>)
                        }

                    </select>

                </label><br/>

                <label>

                    Housing Situation:
                    <select name='option' onChange={handleChangeChosenHousingSituation}>

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
                    onChange={handleChangePhoneNumber}
                    />
                </label><br/>


                <label>
                    Street:
                    <input
                    type="text"
                    name="street"
                    onChange={handleChangeStreet}
                    />
                </label><br/>

                <label>
                    Number:
                    <input
                    type="text"
                    name="house_number"
                    onChange={handleChangeHouseNumber}
                    />
                </label><br/>

                <label>
                    Floor / Apartment:
                    <input
                    type="text"
                    name="floor_apartment"
                    onChange={handleChangeFloorApartment}
                    />
                </label><br/>

                <label>
                    Zip Code:
                    <input
                    type="text"
                    name="zip_code"
                    onChange={handleChangeZipCode}
                    />
                </label><br/>






                <label>

                    District:
                    <select name='option' onChange={handleChangeChosenDistrict}>

                        <option value=''></option>

                        {
                        districts.map((district) => 
                        <option value={district.id} key={district.id}>{district.name}</option>)
                        }

                    </select>

                </label><br/>


                <label>

                    City:
                    <select name='option' onChange={handleChangeChosenCity}>

                        <option value=''></option>

                        {
                        cities.map((city) => 
                        <option value={city.id} key={city.id}>{city.name}</option>)
                        }

                    </select>

                </label><br/>

                <label>

                    Province:
                    <select name='option' onChange={handleChangeChosenProvince}>

                        <option value=''></option>

                        {
                        provinces.map((province) => 
                        <option value={province.id} key={province.id}>{province.name}</option>)
                        }

                    </select>

                </label><br/>


                <label>

                    Country:
                    <select name='option' onChange={handleChangeChosenCountry}>

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
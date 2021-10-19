import React, { useState } from "react";
import axios from "axios";


const TestAuth0 = () => {



    const [email, setEmail] = useState('')

    function handleChangeEmail(event) {
        // event.preventDefault();
        setEmail(event.target.value);

    }


    function handleClickCreateUser(event) {
        event.preventDefault();
        
        const auth0URL = "https://login.auth0.com/api/v2/users";

        axios
        .post(auth0URL, {
            email: email,
            phone_number: "+199999999999999",
            user_metadata: {},
            blocked: false,
            email_verified: false,
            phone_verified: false,
            app_metadata: {},
            given_name: "John",
            family_name: "Doe",
            name: "John Doe",
            nickname: "Johnny",
            picture: "https://secure.gravatar.com/avatar/15626c5e0c749cb912f9d1ad48dba440?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png",
            user_id: "abc",
            connection: "con_i8kmO898Am7QGMmk",
            password: "secret",
            verify_email: false,
            username: "johndoe"
        })
        .then((response) => {
            console.log(response.data);
        })

    
    }


    return (
        <form>
        <label>
            email:
            <input
            type="email"
            name="email"
            onChange={handleChangeEmail}
            />
        </label><br/>

        {email}<br/>

        <button
        type='submit'
        onClick={handleClickCreateUser}>
            Create User
        </button><br/>

    </form>


    )
};

export default TestAuth0;

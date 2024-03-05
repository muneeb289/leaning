import React, { useState, useEffect } from 'react'
import axios from "axios"
import '../App.css';
import { Link } from 'react-router-dom';





function Signup() {
    const [inputData, setInputData] = useState({ User_Email: "", User_Password: "" });
    const handleInputChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };
    // console.log(inputData)


    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputData.User_Email === "" || inputData.User_Password === "") {
            return alert("please provide a valid input");
        };
        axios.post("/api/signup", inputData)
            .then(res => console.log(res))
            .catch(err => alert(`User not registerd Error: ${err}`));
        // .catch(err =>  console.log());
    };


    return (
        <div >
            <div><h2>Signup</h2></div>

            <div>
                <label htmlFor='User_Email'>
                    User Email
                </label>
                <input type='User_Email' name='User_Email' onChange={handleInputChange} >
                </input>

            </div>
            <div>
                <label htmlFor='User_Password'>
                    User Password
                </label>
                <input type='User_Password' name='User_Password' onChange={handleInputChange}>
                </input>
            </div>
            <div>
                <button type='submit' onClick={handleSubmit}>Submit</button>
            </div>
            <div>
                <br/>
                <br/>
                <br/>
                Already do you have account?<br/> <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Signup;

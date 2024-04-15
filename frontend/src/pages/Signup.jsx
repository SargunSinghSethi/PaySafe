import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import Heading from '../components/Heading';

function Signup() {
    const navigate = useNavigate();
    return (
        <div className='m-10'>
            <div>
            <Heading>Sign Up</Heading>
            <p>Enter your information to create an account</p>
            </div>
            <div>
            <form >
                <label htmlFor="firstname">First Name</label>
                <input type="text" name="firstname" id="firstname" />
                <label htmlFor="lastname">Last Name</label>
                <input type="text" name="lastname" id="lastname" />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <button onClick={()=>{
                    navigate("/dashboard")
                }}type="submit">Sign Up</button>
            </form>
            </div>
            <div>
                <p>Already have an account? Login</p>
            </div>
        </div>
    )
}
export default Signup;
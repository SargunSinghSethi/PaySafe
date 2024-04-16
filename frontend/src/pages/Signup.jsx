import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import axios from "axios";

export const Signup = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className='bg-slate-300 h-screen flex items-center justify-center'>
            <div className='bg-white rounded-lg	w-80 text-center p-2 h-max px-4'>
                <Heading label={"Sign Up"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox 
                label={"First Name"} 
                placeholder={"John"}
                onChange={e => {
                    setFirstName(e.target.value)
                }}/>
                <InputBox 
                label={"Last Name"} 
                placeholder={"Doe"}
                onChange={e => {
                    setLastName(e.target.value)
                }}/>
                <InputBox 
                label={"Email"} 
                placeholder={"johndoe@gmail.com"}
                onChange={e => {
                    setUsername(e.target.value)
                }}/>
                <InputBox 
                label={"Password"} 
                placeholder={"123456"}
                onChange={e => {
                    setPassword(e.target.value)
                }}/>
                <div className='pt-4'>
                    <Button 
                    label={"Sign Up"}
                    onClick={async ()=>{
                        const response = await axios.post("https://localhost:3000/api/v1/user/signup",{
                            username,
                            firstname,
                            lastname,
                            password
                        });
                        localStorage.setItem("token",response.data.token);
                        navigate("/dashboard");
                    }}/>
                </div>
            </div>
        </div>
    )
}
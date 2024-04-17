import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
export const Signin = ()=> {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign In"}/>
            <SubHeading label={"Enter your credentials to access your account"}/>
            <InputBox 
            label={"Email"}
            type={"email"}
            placeholder={"johndoe@gmail.com"}
            onChange={e=> {
                setUsername(e.target.value);
            }}/>
            <InputBox 
            label={"Password"}
            type={"password"}
            placeholder={"123456"}
            onChange={e=> {
                setUsername(e.target.value);
            }}/>
            <div className="pt-4">
                <Button 
                label={"Sign In"}
                onClick={async ()=> {
                    const response = await axios.post("https://localhost:3000/api/v1/user/signin",{
                        username,
                        password
                    });
                    localStorage.setItem("token",response.data.token);
                    navigate("/dashboard");
                }}/>
            </div>
            <BottomWarning label={"Don't have an account?"} buttonText={"SignUp"} to={"/signup"}/>
        </div>
    </div>
}
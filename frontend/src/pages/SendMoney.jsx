import { useSearchParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    return <div className="flex justify-center items-center h-screen bg-blue-100">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1.5 p-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer transition ease-in-out delay-100 hover:-translate-x-1 hover:scale-100" onClick={()=>navigate("/dashboard")}>
                        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-center">Send Money</h1>
            </div>
            <div className="px-6 py-4 pt-2 space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="rounded-full w-12 h-12 bg-green-500 flex items-center justify-center">
                        <span className="text-white text-2xl">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="amount"
                            className="text-sm font-medium"
                        >Amount (in Rs)</label>
                        <input
                            type="number"
                            id="amount"
                            placeholder="Enter amount"
                            className="flex h-10 w-full rounded-md border border-input text-sm px-3 py-2"
                            onChange={e => {
                                setAmount(e.target.value);
                            }} />
                    </div>
                    <button onClick={()=>{
                        axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to : {
                                userId
                            },
                            amount,
                        },{
                            headers : {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                        .then(response=> {
                            console.log(response.data.message);
                        })
                    }} className="rounded-md text-sm font-medium  h-10 p-2 w-full transition delay-10 ease-in-out bg-green-500 text-white hover:-transition-y-1 hover:scale-110 hover:border-green-500   duration-300">
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    </div>
}

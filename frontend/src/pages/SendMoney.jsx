import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    return <div className="flex justify-center items-center h-screen bg-blue-100">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1.5 p-6">
                <h1 className="text-3xl font-bold text-center">Send Money</h1>
            </div>
            <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="rounded-full w-12 h-12 bg-green-500 flex items-center justify-center">
                        {/* <span className="text-white text-2xl">{name[0].toUpperCase()}</span> */}
                        <span className="text-white text-2xl">A</span>
                    </div>
                    {/* <h3>{name}</h3> */}
                    <h3 className="text-2xl font-semibold">Friend's Name</h3>
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
                            onClick={e => {
                                setAmount(e.target.value);
                            }} />
                    </div>
                    <button onClick={()=>{
                        axios.post("https://localhost:3000/api/v1/account/transfer",{
                            to : id,
                            amount,
                        },{
                            headers : {
                                Authorization: "Bearer" + localStorage.getItem("token")
                            }
                        })
                    }} className="rounded-md text-sm font-medium  h-10 p-2 w-full transition delay-10 ease-in-out bg-green-500 text-white hover:-transition-y-1 hover:scale-110 hover:border-green-500   duration-300">
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    </div>
}
// hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300
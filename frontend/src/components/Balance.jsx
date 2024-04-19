import axios from "axios";
import { useEffect, useState } from "react"

export const Balance = ()=> {
    const [balance,setBalance] = useState(0);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers : {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setBalance(parseFloat(response.data.balance.toFixed(2)));
        },[])
    })
    return <div className="flex text-lg">
        <div className="font-bold ">
            Your Balance
        </div>
        <div className="font-semibold ml-4">
            Rs {balance}
        </div>
    </div>
}
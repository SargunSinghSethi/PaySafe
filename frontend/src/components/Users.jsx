import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Button from "./Button"
export const  Users = ()=> {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter,{
            headers : {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setUsers(response.data.users);
        })
    },[filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input 
            className="w-full px-2 py-1 border rounded border-slate-200"
            type="text"
            placeholder="Search users..."
            onChange={e=> {
                setFilter(e.target.value)
            }}/>
        </div>
        <div className="space-y-4">
            {users.map(user=> <User user={user} key={user.firstname[0]}/>)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();
    return <div className="flex justify-between h-full">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-blue-200 flex justify-center">
                <div className="flex flex-col h-full text-xl justify-center">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="text-lg flex flex-col justify-center h-full ml-6">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>
        <div className="flex flex-col justfiy-center h-full">
            <Button 
            label={"Send Money"}
            onClick={e=> {
                console.log(user._id);
                navigate("/send?id="+ user._id + "&name=" + user.firstname);
            }}/>
        </div>
    </div>
}
import { useState } from "react"

export const Appbar = () => {
    const [name,setName] = useState("User");
    return <div className="flex justify-between h-14 bg-blue-400 text-white">
        <div className="flex flex-col justify-center ml-4 h-full text-3xl font-bold">
            PaySafe App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center mr-4 h-full">
                Hello, {name}
            </div>
            <div className="rounded-full bg-blue-100 text-black h-12 w-12 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
                {name[0]}
            </div>
            </div>
        </div>

    </div>
}
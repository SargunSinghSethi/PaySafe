import { Link } from "react-router-dom"
export default function BottomWarning({label,buttonText,to}) {
    return <div className="flex justify-center text-sm py-2">
        <div>
            {label}
        </div>
        <Link className="underline cursor-pointer pl-1" to={to}>
        {buttonText}
        </Link>
    </div>
}
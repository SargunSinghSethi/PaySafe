export default function Button({label,onClick}) {
    return <div className="bg-blue-500 h-10 p-2 rounded text-white">
        <button type="button" onClick={onClick} >{label}</button>
    </div>
}
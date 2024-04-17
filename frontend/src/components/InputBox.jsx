export default function InputBox({label,type,placeholder,onChange}) {
    return (
        <div>
            <div className="text-left text-sm py-2 font-medium">
                {label}
            </div>
            <input type={type} placeholder={placeholder} onChange={onChange} className="w-full border rounded border-slate-200"/>
        </div>
    );
}
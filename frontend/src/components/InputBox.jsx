export default function InputBox({label,placeholder,onChange}) {
    return (
        <div>
            <div className="text-left text-sm py-2 font-medium">
                {label}
            </div>
            <input placeholder={placeholder} onChange={onChange} className="w-full border rounded border-slate-200"/>
        </div>
    );
}
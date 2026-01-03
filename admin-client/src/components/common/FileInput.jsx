

function FileInput({ label, name, onChange }) {
    return (
        <>
            <div className="space-y-1">
                <label className="text-sm font-medium">{label}</label>
                <input
                    type="file"
                    name={name}
                    accept="image/*"
                    onChange={onChange}
                />
            </div>
        </>
    )
}

export default FileInput
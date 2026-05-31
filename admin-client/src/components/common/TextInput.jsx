

function TextInput({ label, ...props }) {
    return (
        <>
            <div className="space-y-1">
                <label className="text-sm font-medium text-text-primary">{label}</label>
                <input
                    {...props}
                    className="w-full border border-border bg-canvas text-text-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
        </>
    )
}

export default TextInput
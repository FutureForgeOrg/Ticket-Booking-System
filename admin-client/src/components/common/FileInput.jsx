import { useState, useMemo, useEffect } from "react";

function FileInput({ label, name, onChange, value }) {
  // local file user selected
  const [file, setFile] = useState(null);

  // create preview
  const preview = useMemo(() => {
    if (file) return URL.createObjectURL(file);      // local preview
    if (value) return value;                         // backend image
    return null;
  }, [file, value]);

  // cleanup object URL when file changes
  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(preview);
    };
  }, [file, preview]);

  function handleFileChange(e) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    onChange(e); // still send to parent
  }

  const fileName = file?.name || (value ? value.split("/").pop() : "");

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={handleFileChange}
      />

      {fileName && (
        <p className="text-xs text-gray-500 truncate">
          Selected: {fileName}
        </p>
      )}

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-2 h-32 w-32 object-cover rounded-md border"
        />
      )}
    </div>
  );
}

export default FileInput;

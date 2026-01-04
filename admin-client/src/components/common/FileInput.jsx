import { X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

function FileInput({ label, name, onChange, value }) {
  // local file user selected
  const [file, setFile] = useState(null);

  // create preview
  const preview = useMemo(() => {
    if (file) return URL.createObjectURL(file); // local preview
    if (value) return value; // backend image
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

  function onClear() {
    setFile(null);
  }

  const fileName = file?.name || (value ? value.split("/").pop() : "");

  return (
    <div className="space-y-3">
      <div className="flex items-start w-full">
        <label className="text-sm font-medium text-gray-800">{label}</label>
      </div>
      {!preview ? (
        // Upload UI (shown BEFORE choosing a file)
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-amber-300 bg-amber-50/40 px-4 py-6 transition hover:border-amber-400 hover:bg-amber-50">
          <input
            id={name}
            type="file"
            name={name}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor={name}
            className="cursor-pointer rounded-md bg-amber-400 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-500"
          >
            Choose an image
          </label>

          <p className="mt-2 text-xs text-gray-500">JPG, PNG, SVG — Max 5MB</p>
        </div>
      ) : (
        // Preview UI (shown AFTER choosing a file)
        <>
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Preview"
              className="h-36 w-36 rounded-lg border object-cover shadow-sm"
            />

            <button
              type="button"
              onClick={onClear}
              className="absolute top-1 right-1 rounded-md bg-red-400 text-xs font-medium text-white shadow hover:bg-red-500"
            >
              <X />
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-700">{fileName}</div>
        </>
      )}
    </div>
  );
}

export default FileInput;

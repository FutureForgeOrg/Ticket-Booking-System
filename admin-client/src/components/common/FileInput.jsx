import { useEffect, useMemo, useState } from "react";

function FileInput({ label, name, onChange, value }) {
  const [file, setFile] = useState(null);

  const preview = useMemo(() => {
    if (file) return URL.createObjectURL(file); // new local file preview
    if (value) return value; // existing backend image
    return null;
  }, [file, value]);

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(preview);
    };
  }, [file, preview]);

  function handleFileChange(e) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    onChange(name, selected); // pass file to parent cleanly
  }

  const fileName = file?.name || (value ? value.split("/").pop() : "");

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-800">{label}</label>

      {preview ? (
        <div className="flex items-center gap-4">
          <img
            src={preview}
            alt="Preview"
            className="h-24 w-24 rounded-lg border object-cover shadow-sm"
          />

          <div className="space-y-2">
            <div className="text-sm text-gray-700">{fileName}</div>

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
              className="inline-block cursor-pointer rounded-md bg-amber-400 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500"
            >
              Upload new
            </label>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-amber-300 bg-amber-50/40 px-4 py-6 hover:border-amber-400 hover:bg-amber-50">
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
            className="cursor-pointer rounded-md bg-amber-400 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500"
          >
            Choose an image
          </label>
          <p className="mt-2 text-xs text-gray-500">JPG, PNG, SVG — Max 5MB</p>
        </div>
      )}
    </div>
  );
}

export default FileInput;

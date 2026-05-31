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
      <label className="text-sm font-medium text-text-primary">{label}</label>

      {preview ? (
        <div className="flex items-center gap-4">
          <img
            src={preview}
            alt="Preview"
            className="h-24 w-24 rounded-lg border border-border object-cover shadow-sm"
          />

          <div className="space-y-2">
            <div className="text-sm text-text-secondary">{fileName}</div>

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
              className="inline-block cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
            >
              Upload new
            </label>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface px-4 py-6 hover:border-primary hover:bg-canvas">
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
            className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
          >
            Choose an image
          </label>
          <p className="mt-2 text-xs text-text-muted">JPG, PNG, SVG — Max 5MB</p>
        </div>
      )}
    </div>
  );
}

export default FileInput;

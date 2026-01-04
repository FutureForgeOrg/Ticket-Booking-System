import { useState } from "react";
import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { useCityStore } from "../../store/cityStore";

interface SelectProps {
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function Select({
  value,
  options,
  placeholder = "Select",
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const { city: selectedCity } = useCityStore();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          "flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm",
          "hover:border-primary focus:outline-none focus-visible:shadow-focus min-w-[100px] sm:min-w-[120px]"
        )}
      >
        <div className="flex w-full items-center justify-between">
          <span className="text-text-primary">{value || placeholder}</span>

          <span className="text-text-muted text-xs">
            <ChevronDown size={18} />
          </span>
        </div>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-52 rounded-xl border border-border bg-canvas shadow-soft z-50">
          <div className="max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={clsx(
                  "cursor-pointer px-4 py-2 text-sm hover:bg-primary-soft hover:text-text-primary"
                )}
              >
                {selectedCity === opt ? (
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    <Check size={16} />
                  </div>
                ) : (
                  opt
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

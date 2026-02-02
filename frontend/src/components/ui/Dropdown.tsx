import { useEffect, useRef, useState } from "react";

type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  classname?: string;
};

export default function Dropdown({
  trigger,
  children,
  align = "right",
  classname,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen((p) => !p)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          className={`absolute z-50 mt-2 min-w-[180px]
            rounded-xl border border-border bg-surface shadow-soft
            ${align === "right" ? "right-0" : align === "center" ? "left-1/2 transform -translate-x-1/2" : "left-0"}
            ${classname ?? ""}
          `}
        >
          {children}
        </div>
      )}
    </div>
  );
}

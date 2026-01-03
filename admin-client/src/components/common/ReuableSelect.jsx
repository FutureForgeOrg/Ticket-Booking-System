import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReusableSelect({
  label,
  placeholder = "Select an option",
  options = [],
  value,
  onChange,
  disabled = false,
  className = "bg-white",
  name,
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium" htmlFor={name}>
          {label}
        </label>
      )}

      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger id={name} className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="z-50 bg-white">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

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
  className = "bg-surface border-border text-text-primary",
  name,
  emptyMessage = "No options available",
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium ml-3 text-text-primary" htmlFor={name}>
          {label}
        </label>
      )}

      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger id={name} className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="z-50 bg-surface border-border text-text-primary max-h-[380px] overflow-y-auto">
          {options.length === 0 && (
            <SelectItem value="no-options" disabled className="">
              {emptyMessage}
            </SelectItem>
          )}
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

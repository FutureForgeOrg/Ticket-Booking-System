interface NavLinkProps {
  label: string;
}

export function NavLink({ label }: NavLinkProps) {
  return (
    <button
      className="
        text-sm font-medium text-text-secondary
        hover:text-text-primary
        transition-colors
      "
    >
      {label}
    </button>
  );
}

interface NavLinkProps {
  label: string;
  onClick?: () => void;
}

export function NavLink({ onClick, label }: NavLinkProps) {
  return (
    <button
      className="
        text-sm font-medium text-text-secondary
        hover:text-text-primary
        transition-colors
      "
      onClick={onClick}
    >
      {label}
    </button>
  );
}

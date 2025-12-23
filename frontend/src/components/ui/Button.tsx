import { type ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "outline" | "success" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "md",
            className,
            children,
            ...props
        },
        ref
    ) => {
        const base =
            "inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus-visible:shadow-focus";

        const variants: Record<ButtonVariant, string> = {
            primary:
                "bg-primary text-black hover:bg-primary-hover",
            outline:
                "border border-primary text-primary hover:bg-primary-soft",
            success:
                "bg-secondary text-white hover:opacity-90",
            ghost:
                "text-text-secondary hover:text-text-primary",
        };

        const sizes: Record<ButtonSize, string> = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-5 py-2.5 text-sm",
            lg: "px-6 py-3 text-base",
        };

        return (
            <button
                ref={ref}
                className={clsx(
                    base,
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;

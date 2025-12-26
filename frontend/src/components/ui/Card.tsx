import { type HTMLAttributes } from "react";
import clsx from "clsx";

export default function Card({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={clsx(
                "bg-surface border border-border rounded-xl shadow-soft",
                className
            )}
            {...props}
        />
    );
}

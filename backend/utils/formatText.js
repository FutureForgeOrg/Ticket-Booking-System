export const capitalizeFirst = (value = "") => {
    if (typeof value !== "string") return value;

    const trimmed = value.trim();
    if (!trimmed) return "";

    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};
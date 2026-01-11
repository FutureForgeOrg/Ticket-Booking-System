import { Button } from "../ui/button";

function ConfirmButton({ onConfirm, children }) {
    const handleClick = () => {
        onConfirm();
    };

    return (
        <>
            <Button variant="destructive" size="sm" onClick={handleClick}>
                {children}
            </Button>
        </>
    )
}

export default ConfirmButton
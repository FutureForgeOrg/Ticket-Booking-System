import { Button } from "../ui/button";

function ConfirmButton({onConfirm,children}) {
    const handleClick = () => {
        if (confirm("Are you sure?")) onConfirm();
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
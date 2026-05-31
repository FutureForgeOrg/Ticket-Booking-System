import { useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

function ConfirmButtonAlert({
  onConfirm,
  children,
  title = "Delete item?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      await onConfirm?.(); // supports async delete
      setOpen(false);
    } catch (err) {
      // keep modal open if delete fails
      console.error(err);
      toast.error("Action failed: " + err.message);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        disabled={disabled || isLoading}
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop (click to close) */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => !isLoading && setOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-[92%] max-w-md rounded-xl bg-surface border border-border p-5 shadow-xl">
            <div className="space-y-2">
              <h2 className="text-start text-lg font-semibold text-text-primary">{title}</h2>
              <p className="text-start text-sm text-text-secondary">{description}</p>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={isLoading}
                className="rounded-md border border-border bg-canvas px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface disabled:opacity-60"
              >
                {cancelText}
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={isLoading}
                className="rounded-md bg-danger px-4 py-2 text-sm font-medium text-white hover:bg-danger/80 disabled:opacity-60"
              >
                {isLoading ? "Deleting..." : confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmButtonAlert;

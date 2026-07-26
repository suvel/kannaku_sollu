function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Remove",
  cancelLabel = "Cancel",
  onConfirm,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-container-margin"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-testid="confirm-dialog"
        className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg w-full max-w-sm p-card-padding"
      >
        <h2 className="font-headline-md text-headline-md mb-4">{title}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6">{message}</p>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            data-testid="confirm-dialog-cancel"
            className="flex-1 border border-outline-variant rounded-xl py-3 font-label-bold text-label-bold uppercase hover:bg-surface-container-low transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            data-testid="confirm-dialog-confirm"
            className="flex-1 bg-error text-on-error rounded-xl py-3 font-label-bold text-label-bold uppercase hover:opacity-90 active:scale-[0.98] transition-transform"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;

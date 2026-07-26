import { useState } from "react";

function AddMemberModal({ open, onClose, onAdd }) {
  const [name, setName] = useState("");

  if (!open) return null;

  const isValid = name.trim().length > 0;

  const reset = () => {
    setName("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onAdd({ name: name.trim() });
    reset();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-container-margin"
      onClick={handleClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg w-full max-w-sm p-card-padding"
      >
        <h2 className="font-headline-md text-headline-md mb-4">Add Member</h2>

        <div className="space-y-4">
          <div>
            <label className="font-label-bold text-label-bold uppercase text-on-surface-variant block mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Member name"
              autoFocus
              data-testid="member-name-input"
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md focus:outline-none focus:border-secondary"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 border border-outline-variant rounded-xl py-3 font-label-bold text-label-bold uppercase hover:bg-surface-container-low transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid}
            data-testid="add-member-submit"
            className="flex-1 bg-primary text-on-primary rounded-xl py-3 font-label-bold text-label-bold uppercase disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMemberModal;

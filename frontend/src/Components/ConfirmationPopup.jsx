import React from "react";

function ConfirmationPopup({
  confirmIsOpen,
  title,
  message,
  setConfirmIsOpen,
  onConfirm,
}) {
  if (!confirmIsOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={() => setConfirmIsOpen(false)}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-center text-white">
          {title}
        </h2>

        <p className="mt-3 text-center text-slate-300">
          {message}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            onClick={() => setConfirmIsOpen(false)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-200 hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="w-full rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
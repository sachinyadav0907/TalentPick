import React from "react";
import { FaRegFolderOpen } from "react-icons/fa";

const EmptyState = ({
  title = "Nothing Here",
  description = "There's nothing to display right now.",
  icon: Icon = FaRegFolderOpen,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-10 text-center shadow-2xl backdrop-blur-md">

        {/* Glow */}
        <div className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Icon */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-slate-700 bg-slate-800">
          <Icon className="text-5xl text-blue-400" />
        </div>

        {/* Title */}
        <h2 className="mt-8 text-3xl font-bold text-white">
          {title}
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-base leading-7 text-slate-400">
          {description}
        </p>

        {/* Button */}
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:scale-105"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
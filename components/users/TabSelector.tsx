import * as React from "react";

export const TabSelector = ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    className={`group inline-flex items-center justify-center py-2 border-b-2 cursor-pointer whitespace-nowrap w-full ${
      isActive
        ? "border-secondary text-white focus:outline-none focus:text-white focus:border-secondary"
        : "border-transparent text-gray-500 hover:text-white hover:border-none focus:text-white focus:border-white"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

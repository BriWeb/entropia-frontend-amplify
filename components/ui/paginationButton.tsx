import React from "react";

interface PaginationButtonProps {
  pageNumber: number;
  isActive: boolean;
  onClick: () => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  pageNumber,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive
          ? "z-10 bg-primary text-accent border-gray-500"
          : "bg-secondary text-primary border-gray-300 hover:bg-primary hover:text-secondary"
      }   relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
    >
      {pageNumber}
    </button>
  );
};

export default PaginationButton;

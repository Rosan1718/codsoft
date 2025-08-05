import React, { ReactNode } from 'react';

interface LinkProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};
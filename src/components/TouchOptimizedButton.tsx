import { useState, useEffect } from 'react';

interface TouchOptimizedButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const TouchOptimizedButton = ({ onClick, children, className = '', variant = 'primary' }: TouchOptimizedButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = "min-h-[44px] min-w-[44px] px-6 py-3 rounded-xl font-semibold transition-all duration-150 touch-manipulation";
  const variantClasses = variant === 'primary' 
    ? "bg-gradient-to-r from-green-600 to-green-500 text-white active:from-green-700 active:to-green-600" 
    : "border-2 border-green-600 text-green-600 bg-white active:bg-green-50";
  
  const pressedClasses = isPressed ? "scale-95" : "scale-100";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${pressedClasses} ${className}`}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TouchOptimizedButton;
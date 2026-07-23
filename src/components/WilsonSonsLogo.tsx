import React from 'react';

interface WilsonSonsLogoProps {
  variant?: 'full' | 'icon' | 'header';
  textColor?: 'white' | 'dark' | 'current';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function WilsonSonsLogo({
  variant = 'full',
  textColor = 'white',
  className = '',
  size = 'md'
}: WilsonSonsLogoProps) {
  const heightMap = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };

  const currentHeight = heightMap[size];

  // Text color styles
  const getTextColorClass = () => {
    if (textColor === 'white') return 'fill-white text-white';
    if (textColor === 'dark') return 'fill-gray-900 text-gray-900';
    return 'fill-current text-current';
  };

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${currentHeight} w-auto ${className}`}
      >
        {/* Upper piece */}
        <path
          d="M 42 7 H 63 V 35 H 42 C 35 35 28 28 28 21 V 21 C 28 12 34 7 42 7 Z"
          fill="#00A3E0"
        />
        {/* Lower piece */}
        <path
          d="M 28 63 H 7 V 35 H 28 C 35 35 42 42 42 49 V 49 C 42 58 36 63 28 63 Z"
          fill="#00A3E0"
        />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${currentHeight} w-auto shrink-0`}
      >
        {/* Upper piece */}
        <path
          d="M 42 7 H 63 V 35 H 42 C 35 35 28 28 28 21 V 21 C 28 12 34 7 42 7 Z"
          fill="#00A3E0"
        />
        {/* Lower piece */}
        <path
          d="M 28 63 H 7 V 35 H 28 C 35 35 42 42 42 49 V 49 C 42 58 36 63 28 63 Z"
          fill="#00A3E0"
        />
      </svg>
      <div className={`flex flex-col justify-center leading-none ${getTextColorClass()}`}>
        <span className="font-extrabold tracking-wider text-base sm:text-lg uppercase">
          WILSON SONS
        </span>
      </div>
    </div>
  );
}

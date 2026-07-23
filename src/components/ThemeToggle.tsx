import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-gray-300 hover:text-white" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}

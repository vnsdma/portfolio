import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark theme"
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className="theme-toggle__cell" data-active={!isDark}>
        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <span className="theme-toggle__cell" data-active={isDark}>
        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </button>
  );
};

import { WilsonSonsLogo } from './WilsonSonsLogo';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="h-20 bg-surface border-b border-border px-8 flex items-center justify-between sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <WilsonSonsLogo variant="icon" size="md" />
        </div>
        <div className="hidden sm:block h-8 w-px bg-border" />
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 transition-colors">
            WS Smart Jobbook Validator
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Validação automatizada de desenhos técnicos comparados ao Jobbook oficial Wilson Sons</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4" id="header-actions">
        <ThemeToggle />
      </div>
    </header>
  );
}


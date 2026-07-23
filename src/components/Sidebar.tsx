import { LayoutDashboard, FileUp, History, Info } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { WilsonSonsLogo } from './WilsonSonsLogo';

interface SidebarProps {
  currentView: 'upload' | 'dashboard' | 'about' | 'history';
  setCurrentView: Dispatch<SetStateAction<'upload' | 'dashboard' | 'about' | 'history'>>;
}

export function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-primary text-white flex flex-col fixed left-0 top-0 z-20 shadow-xl">
      <div className="p-6 border-b border-white/10 space-y-3">
        <WilsonSonsLogo variant="full" textColor="white" size="md" />
        <div className="pt-1">
          <h1 className="font-bold text-sm tracking-wider uppercase text-accent/90">
            WS Pipe<span className="text-white font-normal">Match</span>
          </h1>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        <button 
          onClick={() => setCurrentView('dashboard')}
          className={`w-full flex items-center cursor-pointer gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'dashboard' ? 'bg-secondary text-white' : 'text-blue-100 hover:bg-primary-light/10 hover:text-white'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </button>
        <button 
          onClick={() => setCurrentView('upload')}
          className={`w-full flex items-center cursor-pointer gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'upload' ? 'bg-secondary text-white' : 'text-blue-100 hover:bg-primary-light/10 hover:text-white'}`}
        >
          <FileUp className="w-5 h-5" />
          <span className="font-medium">Nova Análise</span>
        </button>
        <button 
          onClick={() => setCurrentView('history')}
          className={`w-full flex items-center cursor-pointer gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'history' ? 'bg-secondary text-white' : 'text-blue-100 hover:bg-primary-light/10 hover:text-white'}`}
        >
          <History className="w-5 h-5" />
          <span className="font-medium">Histórico</span>
        </button>
        <button 
          onClick={() => setCurrentView('about')}
          className={`w-full flex items-center cursor-pointer gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'about' ? 'bg-secondary text-white' : 'text-blue-100 hover:bg-primary-light/10 hover:text-white'}`}
        >
          <Info className="w-5 h-5" />
          <span className="font-medium">Sobre</span>
        </button>
      </nav>

      <div className="p-6 border-t border-primary-light/20 text-xs text-blue-200/70 space-y-1">
        <p>Desenvolvido por:</p>
        <p className="font-medium text-white/90">Alisson Silva</p>
        <p className="font-medium text-white/90">Aluno Kodie Academy</p>
      </div>
    </aside>
  );
}

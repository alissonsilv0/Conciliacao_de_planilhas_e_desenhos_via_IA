import { AlertTriangle } from 'lucide-react';

interface ErrorScreenProps {
  message: string;
  onRetry: () => void;
}

export function ErrorScreen({ message, onRetry }: ErrorScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="bg-surface p-10 rounded-2xl shadow-sm border border-border w-full max-w-md text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-red-50 text-danger rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">Falha na Validação</h3>
        <p className="text-gray-500 mb-8">{message}</p>
        
        <button 
          onClick={onRetry}
          className="px-6 py-2.5 rounded-lg font-medium bg-primary text-white hover:bg-secondary transition-colors cursor-pointer"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { HistoryRecord } from '../types';
import { FileText, ChevronRight, Calendar, Trash2 } from 'lucide-react';

interface HistoryScreenProps {
  history: HistoryRecord[];
  onViewRecord: (record: HistoryRecord) => void;
  onClearHistory: () => void;
}

export function HistoryScreen({ history, onViewRecord, onClearHistory }: HistoryScreenProps) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-3xl mx-auto w-full animate-in fade-in duration-500">
        <div className="bg-surface p-10 rounded-2xl shadow-sm border border-border w-full text-center">
          <div className="w-16 h-16 bg-primary/5 text-primary/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Nenhum histórico encontrado</h3>
          <p className="text-gray-500">As validações anteriores aparecerão aqui.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Histórico de Validações</h2>
          <p className="text-gray-500 mt-1">Consulte os resultados de desenhos técnicos já processados.</p>
        </div>
        <button
          onClick={onClearHistory}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-danger bg-danger/10 hover:bg-danger/20 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Limpar Histórico
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <ul className="divide-y divide-border">
          {history.map((record) => {
            const date = new Date(record.date);
            const totalItems = record.data.materiais_ok.length + record.data.materiais_faltantes_jobbook.length + record.data.divergencias_quantidade.length;
            const hasIssues = record.data.materiais_faltantes_jobbook.length > 0 || record.data.divergencias_quantidade.length > 0;

            return (
              <li 
                key={record.id}
                className="group hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onViewRecord(record)}
              >
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${hasIssues ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 line-clamp-1">{record.fileName}</h4>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {date.toLocaleDateString('pt-BR')} às {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span>•</span>
                        <span>{totalItems} itens analisados</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end mr-4 text-sm">
                      {hasIssues ? (
                        <span className="text-warning font-medium">Divergências Encontradas</span>
                      ) : (
                        <span className="text-success font-medium">Tudo Certo</span>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

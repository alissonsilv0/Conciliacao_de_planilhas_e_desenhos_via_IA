import { X } from 'lucide-react';
import { UnifiedItem, UnifiedCategory } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface DetailPanelProps {
  item: UnifiedItem | null;
  onClose: () => void;
}

const categoryBadgeConfig: Record<UnifiedCategory, { color: string, label: string }> = {
  'ok': { color: 'bg-green-100 text-green-800 border-green-200', label: '🟢 Material Conforme (OK)' },
  'divergencia': { color: 'bg-amber-100 text-amber-800 border-amber-200', label: '🟡 Divergência de Quantidade' },
  'faltante': { color: 'bg-red-100 text-red-800 border-red-200', label: '🔴 Faltante no Jobbook' },
};

export function DetailPanel({ item, onClose }: DetailPanelProps) {
  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={onClose}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-surface shadow-2xl z-50 border-l border-border flex flex-col"
          >
            <div className="p-6 border-b border-border flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-semibold text-gray-900">Detalhes do Item</h3>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1.5">Status</p>
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${categoryBadgeConfig[item.category].color}`}>
                  {categoryBadgeConfig[item.category].label}
                </span>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
                  {item.category === 'faltante' ? 'Posição' : 'Part Number'}
                </p>
                <p className="text-base font-semibold text-gray-900">{item.partNumberOrPos}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Descrição</p>
                <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100 leading-relaxed">
                  {item.descricao || '-'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-700 font-semibold uppercase tracking-wider mb-1">Qtd. Desenho (PDF)</p>
                  <p className="text-3xl font-bold text-gray-900">{item.quantidadeDesenho}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Qtd. Jobbook</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {item.category === 'faltante' ? '-' : item.quantidadeJobbook}
                  </p>
                </div>
              </div>

              {item.category === 'divergencia' && item.diferenca !== undefined && (
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <p className="text-xs text-amber-800 font-semibold uppercase tracking-wider mb-1">Diferença de Quantidade</p>
                  <p className="text-2xl font-bold text-amber-900">
                    {item.diferenca > 0 ? `+${item.diferenca}` : item.diferenca}
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Divergência entre a quantidade do desenho e do Jobbook.
                  </p>
                </div>
              )}

              {item.category === 'faltante' && (
                <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-xs text-red-800">
                  <p className="font-semibold text-sm mb-1">Item Faltante</p>
                  Este material está listado na posição do desenho, mas não foi encontrado no Jobbook oficial.
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


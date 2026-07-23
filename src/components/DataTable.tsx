import { useState } from 'react';
import { UnifiedItem, UnifiedCategory } from '../types';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface DataTableProps {
  items: UnifiedItem[];
  okCount: number;
  divCount: number;
  faltCount: number;
  onRowClick: (item: UnifiedItem) => void;
}

const categoryBadgeConfig: Record<UnifiedCategory, { color: string, label: string }> = {
  'ok': { color: 'bg-green-100 text-green-800 border-green-200', label: '🟢 OK' },
  'divergencia': { color: 'bg-amber-100 text-amber-800 border-amber-200', label: '🟡 Divergência Qtd' },
  'faltante': { color: 'bg-red-100 text-red-800 border-red-200', label: '🔴 Faltante Jobbook' },
};

export function DataTable({ items, okCount, divCount, faltCount, onRowClick }: DataTableProps) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<UnifiedCategory | 'all'>('all');
  const [sortField, setSortField] = useState<keyof UnifiedItem>('partNumberOrPos');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: keyof UnifiedItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.partNumberOrPos.toLowerCase().includes(search.toLowerCase()) || 
      item.descricao.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aVal = a[sortField] ?? '';
    const bVal = b[sortField] ?? '';
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const paginatedItems = sortedItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const SortIcon = ({ field }: { field: keyof UnifiedItem }) => {
    if (sortField !== field) return <span className="text-gray-300 ml-1">↕</span>;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1 inline" /> : <ChevronDown className="w-4 h-4 ml-1 inline" />;
  };

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-border overflow-hidden">
      {/* Category Tabs */}
      <div className="border-b border-border bg-gray-50/70 p-2 flex flex-wrap gap-1">
        <button
          onClick={() => { setActiveTab('all'); setPage(1); }}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'bg-surface text-gray-900 shadow-sm border border-border'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Todos <span className="ml-1 bg-gray-100 px-2 py-0.5 rounded-full text-xs font-semibold text-gray-700">{items.length}</span>
        </button>

        <button
          onClick={() => { setActiveTab('divergencia'); setPage(1); }}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'divergencia'
              ? 'bg-amber-50 text-amber-900 shadow-sm border border-amber-200'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Divergências de Qtd <span className="ml-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-semibold">{divCount}</span>
        </button>

        <button
          onClick={() => { setActiveTab('faltante'); setPage(1); }}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'faltante'
              ? 'bg-red-50 text-red-900 shadow-sm border border-red-200'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Faltantes no Jobbook <span className="ml-1 bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-semibold">{faltCount}</span>
        </button>

        <button
          onClick={() => { setActiveTab('ok'); setPage(1); }}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'ok'
              ? 'bg-green-50 text-green-900 shadow-sm border border-green-200'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Materiais OK <span className="ml-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-semibold">{okCount}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-border flex flex-wrap gap-4 justify-between items-center bg-surface">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por Part Number, Posição ou Descrição..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-border text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('category')}>
                Status <SortIcon field="category" />
              </th>
              <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('partNumberOrPos')}>
                Part Number / Posição <SortIcon field="partNumberOrPos" />
              </th>
              <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('descricao')}>
                Descrição <SortIcon field="descricao" />
              </th>
              <th className="px-6 py-4 text-center cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('quantidadeDesenho')}>
                Qtd. Desenho <SortIcon field="quantidadeDesenho" />
              </th>
              <th className="px-6 py-4 text-center cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('quantidadeJobbook')}>
                Qtd. Jobbook <SortIcon field="quantidadeJobbook" />
              </th>
              <th className="px-6 py-4 text-center cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('diferenca')}>
                Diferença <SortIcon field="diferenca" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedItems.map((item) => {
              const badge = categoryBadgeConfig[item.category];
              return (
                <tr 
                  key={item.id} 
                  onClick={() => onRowClick(item)}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.partNumberOrPos}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={item.descricao}>{item.descricao}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">{item.quantidadeDesenho}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                    {item.category === 'faltante' ? '-' : item.quantidadeJobbook}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold">
                    {item.diferenca !== undefined ? (
                      <span className={item.diferenca !== 0 ? "text-amber-600 bg-amber-50 px-2 py-0.5 rounded" : "text-gray-500"}>
                        {item.diferenca > 0 ? `+${item.diferenca}` : item.diferenca}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {paginatedItems.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  Nenhum item encontrado com os filtros selecionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-border flex justify-between items-center bg-gray-50/50">
          <span className="text-sm text-gray-500">
            Exibindo {((page - 1) * itemsPerPage) + 1} até {Math.min(page * itemsPerPage, sortedItems.length)} de {sortedItems.length} itens
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border border-border rounded text-sm disabled:opacity-50 hover:bg-gray-100 transition-colors bg-surface cursor-pointer"
            >
              Anterior
            </button>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border border-border rounded text-sm disabled:opacity-50 hover:bg-gray-100 transition-colors bg-surface cursor-pointer"
            >
              Próximo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


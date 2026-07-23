import { useState, useMemo, useRef } from 'react';
import { AnalysisResult, UnifiedItem } from '../types';
import { ComplianceRing } from './ComplianceRing';
import { DataTable } from './DataTable';
import { DetailPanel } from './DetailPanel';
import { Download, Printer, CheckCircle2, FileWarning, AlertTriangle, Layers } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';

interface DashboardProps {
  data: AnalysisResult;
}

export function Dashboard({ data }: DashboardProps) {
  const [selectedItem, setSelectedItem] = useState<UnifiedItem | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const okList = data.materiais_ok || [];
  const divList = data.divergencias_quantidade || [];
  const faltList = data.materiais_faltantes_jobbook || [];

  const okCount = okList.length;
  const divCount = divList.length;
  const faltCount = faltList.length;
  const totalCount = okCount + divCount + faltCount;
  const complianceIndex = totalCount > 0 ? Math.round((okCount / totalCount) * 100) : 100;

  const unifiedItems = useMemo<UnifiedItem[]>(() => {
    const okItems: UnifiedItem[] = okList.map((item, idx) => ({
      id: `ok-${idx}-${item.part_number}`,
      category: 'ok',
      categoryLabel: 'Materiais OK',
      partNumberOrPos: item.part_number,
      descricao: item.descricao,
      quantidadeDesenho: item.quantidade_desenho,
      quantidadeJobbook: item.quantidade_jobbook,
      statusText: item.status || 'Conforme',
      original: item,
    }));

    const divItems: UnifiedItem[] = divList.map((item, idx) => ({
      id: `div-${idx}-${item.part_number}`,
      category: 'divergencia',
      categoryLabel: 'Divergência Qtd',
      partNumberOrPos: item.part_number,
      descricao: item.descricao,
      quantidadeDesenho: item.quantidade_desenho,
      quantidadeJobbook: item.quantidade_jobbook,
      diferenca: item.diferenca,
      statusText: 'Divergência de Quantidade',
      original: item,
    }));

    const faltItems: UnifiedItem[] = faltList.map((item, idx) => ({
      id: `falt-${idx}-${item.posicao}`,
      category: 'faltante',
      categoryLabel: 'Faltante Jobbook',
      partNumberOrPos: item.posicao,
      descricao: item.descricao,
      quantidadeDesenho: item.quantidade_desenho,
      quantidadeJobbook: 0,
      statusText: 'Faltante no Jobbook',
      original: item,
    }));

    return [...divItems, ...faltItems, ...okItems];
  }, [okList, divList, faltList]);

  const handleExport = () => {
    const wb = XLSX.utils.book_new();

    // Materiais OK
    if (okList.length > 0) {
      const okData = okList.map(item => ({
        'Part Number': item.part_number,
        'Descrição': item.descricao,
        'Qtd. Desenho': item.quantidade_desenho,
        'Qtd. Jobbook': item.quantidade_jobbook,
        'Status': item.status || 'Conforme'
      }));
      const wsOk = XLSX.utils.json_to_sheet(okData);
      XLSX.utils.book_append_sheet(wb, wsOk, "Tudo Certo");
    }

    // Divergências
    if (divList.length > 0) {
      const divData = divList.map(item => ({
        'Part Number': item.part_number,
        'Descrição': item.descricao,
        'Qtd. Desenho': item.quantidade_desenho,
        'Qtd. Jobbook': item.quantidade_jobbook,
        'Diferença': item.diferenca
      }));
      const wsDiv = XLSX.utils.json_to_sheet(divData);
      XLSX.utils.book_append_sheet(wb, wsDiv, "Divergências");
    }

    // Faltantes
    if (faltList.length > 0) {
      const faltData = faltList.map(item => ({
        'Posição / Part Number': item.posicao,
        'Descrição': item.descricao,
        'Qtd. Desenho': item.quantidade_desenho
      }));
      const wsFalt = XLSX.utils.json_to_sheet(faltData);
      XLSX.utils.book_append_sheet(wb, wsFalt, "Faltantes");
    }

    // Exportar
    XLSX.writeFile(wb, "resultado_validacao_pipematch.xlsx");
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'WS_PipeMatch_Relatorio',
    onBeforePrint: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => setIsPrinting(false),
  });

  return (
    <div ref={printRef} id="report-content" className="max-w-7xl mx-auto w-full space-y-8 animate-in fade-in duration-500 pb-12 bg-bg p-4 md:p-0">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden" data-html2canvas-ignore="true">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resultado da Validação</h2>
          <p className="text-gray-500 mt-1">
            Comparação detalhada entre desenho técnico (PDF) e Jobbook oficial.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handlePrint()}
            disabled={isPrinting}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer className="w-4 h-4" />
            {isPrinting ? 'Preparando...' : 'Baixar PDF'}
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-colors shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Exportar Excel
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-secondary shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total de Itens</p>
            <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
          </div>
        </div>
        
        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-success shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Materiais OK</p>
            <p className="text-2xl font-bold text-green-700">{okCount}</p>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-warning shrink-0">
            <FileWarning className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Divergências de Qtd</p>
            <p className="text-2xl font-bold text-amber-600">{divCount}</p>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-danger shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Faltantes no Jobbook</p>
            <p className="text-2xl font-bold text-red-600">{faltCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Ring & Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface p-8 rounded-xl border border-border shadow-sm flex flex-col items-center justify-center min-h-[280px]">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 w-full text-center">Índice de Conformidade</h3>
            <ComplianceRing percentage={complianceIndex} />
          </div>
          
          <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Resumo Executivo</h3>
            <div className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2">
              <p>
                A validação identificou <span className="font-semibold">{totalCount}</span> itens no total.
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li><strong className="text-green-700">{okCount}</strong> materiais totalmente conformes.</li>
                <li><strong className="text-amber-600">{divCount}</strong> materiais com divergência de quantidade.</li>
                <li><strong className="text-red-600">{faltCount}</strong> materiais faltantes no Jobbook.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="lg:col-span-2">
          <DataTable 
            items={unifiedItems} 
            okCount={okCount}
            divCount={divCount}
            faltCount={faltCount}
            onRowClick={setSelectedItem} 
          />
        </div>
      </div>

      <DetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}


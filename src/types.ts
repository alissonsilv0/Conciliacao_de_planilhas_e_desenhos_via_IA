export interface MaterialOk {
  part_number: string;
  descricao: string;
  quantidade_desenho: number;
  quantidade_jobbook: number;
  status: string;
}

export interface MaterialFaltanteJobbook {
  posicao: string;
  descricao: string;
  quantidade_desenho: number;
}

export interface DivergenciaQuantidade {
  part_number: string;
  descricao: string;
  quantidade_desenho: number;
  quantidade_jobbook: number;
  diferenca: number;
}

export interface AnalysisResult {
  materiais_ok: MaterialOk[];
  materiais_faltantes_jobbook: MaterialFaltanteJobbook[];
  divergencias_quantidade: DivergenciaQuantidade[];
}

export interface HistoryRecord {
  id: string;
  date: string;
  fileName: string;
  data: AnalysisResult;
}

export type UnifiedCategory = 'ok' | 'divergencia' | 'faltante';

export interface UnifiedItem {
  id: string;
  category: UnifiedCategory;
  categoryLabel: string;
  partNumberOrPos: string;
  descricao: string;
  quantidadeDesenho: number;
  quantidadeJobbook?: number;
  diferenca?: number;
  statusText?: string;
  original: MaterialOk | MaterialFaltanteJobbook | DivergenciaQuantidade;
}


import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { UploadArea } from './components/UploadArea';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorScreen } from './components/ErrorScreen';
import { Dashboard } from './components/Dashboard';
import { AboutScreen } from './components/AboutScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { AnalysisResult, HistoryRecord } from './types';

type AppState = 'upload' | 'loading' | 'dashboard' | 'error' | 'about' | 'history';

export default function App() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [currentView, setCurrentView] = useState<'upload' | 'dashboard' | 'about' | 'history'>('upload');
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ws_smart_jobbook_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
  }, []);

  const saveToHistory = (record: HistoryRecord) => {
    const newHistory = [record, ...history];
    setHistory(newHistory);
    localStorage.setItem('ws_smart_jobbook_history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('ws_smart_jobbook_history');
  };

  const handleAnalyze = async (file: File) => {
    setAppState('loading');
    
    try {
      const webhookUrl = (import.meta as any).env.VITE_MAKE_WEBHOOK_URL;
      
      if (!webhookUrl) {
        throw new Error('Webhook URL not configured in environment variables.');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorDetails = '';
        try {
          errorDetails = await response.text();
        } catch (e) {
          // ignore
        }
        throw new Error(`Erro no servidor (Make.com) com status: ${response.status}. Por favor, verifique o histórico do seu cenário no Make.com para identificar o problema. ${errorDetails ? `Detalhes: ${errorDetails}` : ''}`);
      }

      const rawText = await response.text();
      
      let data: any;
      try {
        let cleaned = rawText.trim();
        if (cleaned.startsWith('```')) {
          cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
        }
        data = JSON.parse(cleaned);
        if (typeof data === 'string') {
          let inner = data.trim();
          if (inner.startsWith('```')) {
            inner = inner.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
          }
          data = JSON.parse(inner);
        }
      } catch (e) {
        console.error('Failed to parse webhook response:', rawText);
        throw new Error('A resposta do webhook não pôde ser convertida em JSON válido.');
      }
      
      // Validation of new JSON structure
      if (!data || (
        !Array.isArray(data.materiais_ok) &&
        !Array.isArray(data.materiais_faltantes_jobbook) &&
        !Array.isArray(data.divergencias_quantidade)
      )) {
        throw new Error('Formato de resposta do webhook inválido. Esperados arrays materiais_ok, materiais_faltantes_jobbook ou divergencias_quantidade.');
      }

      const formattedData: AnalysisResult = {
        materiais_ok: Array.isArray(data.materiais_ok) ? data.materiais_ok : [],
        materiais_faltantes_jobbook: Array.isArray(data.materiais_faltantes_jobbook) ? data.materiais_faltantes_jobbook : [],
        divergencias_quantidade: Array.isArray(data.divergencias_quantidade) ? data.divergencias_quantidade : [],
      };

      const newRecord: HistoryRecord = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        fileName: file.name,
        data: formattedData,
      };

      saveToHistory(newRecord);
      setAnalysisData(formattedData);
      setAppState('dashboard');
      setCurrentView('dashboard');
    } catch (error: any) {
      console.error('Validation error:', error);
      setErrorMessage(error.message || 'An unexpected error occurred during validation.');
      setAppState('error');
    }
  };

  const handleReset = () => {
    setAppState('upload');
    setCurrentView('upload');
    setAnalysisData(null);
    setErrorMessage('');
  };

  // When changing view from sidebar
  const handleViewChange = (view: 'upload' | 'dashboard' | 'about' | 'history') => {
    if (view === 'upload') {
      handleReset();
    } else if (view === 'about') {
      setAppState('about');
      setCurrentView('about');
    } else if (view === 'history') {
      setAppState('history');
      setCurrentView('history');
    } else {
      if (analysisData) {
        setAppState('dashboard');
        setCurrentView('dashboard');
      }
    }
  };

  const handleViewRecord = (record: HistoryRecord) => {
    setAnalysisData(record.data);
    setAppState('dashboard');
    setCurrentView('dashboard');
  };

  return (
    <Layout
      sidebar={<Sidebar currentView={currentView} setCurrentView={handleViewChange} />}
      header={<Header />}
    >
      {appState === 'upload' && <UploadArea onAnalyze={handleAnalyze} />}
      {appState === 'loading' && <LoadingScreen />}
      {appState === 'error' && <ErrorScreen message={errorMessage} onRetry={handleReset} />}
      {appState === 'dashboard' && analysisData && <Dashboard data={analysisData} />}
      {appState === 'about' && <AboutScreen />}
      {appState === 'history' && <HistoryScreen history={history} onViewRecord={handleViewRecord} onClearHistory={clearHistory} />}
    </Layout>
  );
}

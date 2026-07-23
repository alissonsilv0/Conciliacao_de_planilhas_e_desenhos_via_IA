import React, { useState, useRef } from 'react';
import { UploadCloud, FileType } from 'lucide-react';
import { WilsonSonsLogo } from './WilsonSonsLogo';

interface UploadAreaProps {
  onAnalyze: (file: File) => void;
}

export function UploadArea({ onAnalyze }: UploadAreaProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      } else {
        alert('Por favor, selecione um arquivo PDF válido.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyzeClick = () => {
    if (file) {
      onAnalyze(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-3xl mx-auto w-full">
      <div className="bg-surface p-10 rounded-2xl shadow-sm border border-border w-full text-center">
        <div className="flex justify-center mb-4">
          <WilsonSonsLogo variant="full" textColor="dark" size="lg" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">WS Smart Jobbook Validator</h3>
        <p className="text-gray-500 mb-8">Selecione o PDF do desenho técnico para iniciar a validação automatizada com o Jobbook oficial da Wilson Sons.</p>
        
        <div 
          className={`border-2 border-dashed rounded-xl p-12 transition-colors cursor-pointer flex flex-col items-center justify-center gap-4 ${
            isDragging ? 'border-accent bg-accent/5' : 'border-border hover:border-secondary/50 hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf"
            className="hidden"
          />
          
          {file ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-secondary rounded-full flex items-center justify-center mb-3">
                <FileType className="w-8 h-8" />
              </div>
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-3 group-hover:text-secondary group-hover:bg-blue-50 transition-colors">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="text-gray-700 font-medium">Arraste e solte seu PDF aqui</p>
              <p className="text-sm text-gray-500">ou clique para selecionar do computador</p>
            </>
          )}
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); handleAnalyzeClick(); }}
          disabled={!file}
          className={`mt-8 px-8 py-3 rounded-lg font-medium transition-all cursor-pointer ${
            file 
              ? 'bg-primary text-white hover:bg-secondary hover:shadow-md' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Analisar Desenho
        </button>
      </div>
    </div>
  );
}


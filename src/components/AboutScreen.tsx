import React from 'react';

export function AboutScreen() {
  return (
    <div className="max-w-4xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-surface rounded-2xl shadow-sm border border-border p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre o Projeto</h2>
        
        <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
          <p className="text-lg">
            Este sistema foi desenvolvido como solução para o Desafio Final 1 da Kodie Academy, focando em resolver um dos maiores e mais custosos gargalos da engenharia de suprimentos e manufatura: a conciliação manual de Listas de Materiais (BOM - Bill of Materials).
          </p>
          <p className="text-lg">
            A aplicação automatiza o cruzamento de dados não estruturados (Desenhos Técnicos em PDF) com bancos de dados estruturados (Jobbooks e ERPs), utilizando Inteligência Artificial generativa de última geração para garantir precisão, escalabilidade e redução drástica no tempo de conferência.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center gap-2">
            ⚠️ O Problema
          </h3>
          <p>
            Em projetos de engenharia complexos — como sistemas de resfriamento naval ou tubulações industriais —, a verificação das peças listadas nos desenhos técnicos contra o que de fato está registrado, demandado e despachado no sistema de controle (Jobbook) é um processo altamente manual, repetitivo e sujeito a falhas humanas.
          </p>
          <p>
            Divergências de quantidade, peças omitidas ou status de envios desatualizados podem causar atrasos significativos na montagem e perdas financeiras.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center gap-2">
            💡 A Solução
          </h3>
          <p>
            Desenvolvemos um pipeline de orquestração de dados 100% automatizado. Através de uma interface web simples, o usuário faz o upload de um desenho técnico. Nos bastidores, o sistema extrai o texto OCR do projeto, conecta-se remotamente ao Jobbook atualizado da operação, e utiliza um modelo de linguagem de grande escala (LLM) especializado em contexto longo para realizar a conciliação técnica instantânea.
          </p>
          <p>
            O resultado é devolvido em segundos, estruturado em JSON, apontando exatamente o que está correto, o que está faltando e onde estão as divergências matemáticas.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center gap-2">
            ⚙️ Arquitetura e Tecnologias (Tech Stack)
          </h3>
          <p>
            A infraestrutura foi desenhada visando alta disponibilidade e processamento assíncrono fluido, utilizando as seguintes tecnologias:
          </p>
          
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Componente</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tecnologia</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função no Ecossistema</th>
                </tr>
              </thead>
              <tbody className="bg-surface divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Front-End</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Interface Web App</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Ponto de interação do usuário para upload de PDFs e renderização de relatórios.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Orquestração</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Make (Integromat)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Automação de fluxo contendo Webhooks customizados, extração de texto, agregação de arrays e requisições de API.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Banco de Dados</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Google Sheets</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Armazenamento dinâmico do Jobbook (ex: WS 176), fornecendo os dados reais de inventário e status de despacho.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Inteligência Artificial</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Google AI Studio (Gemini 1.5 Pro)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Motor de inferência responsável pela leitura do PDF, cruzamento lógico com as matrizes do Jobbook e formatação estruturada de saída.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center gap-2">
            🚀 Principais Funcionalidades
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Leitura de Visão Computacional:</strong> Capacidade de interpretar tabelas de materiais diretamente de plantas baixas e desenhos de tubulação e instrumentação (P&ID).</li>
            <li><strong>Conciliação Inteligente:</strong> O sistema não apenas compara strings, mas entende as relações entre Part Numbers, Descrições Técnicas, Quantidades Demandadas e Quantidades Despachadas.</li>
            <li><strong>API Ready:</strong> Toda a comunicação é feita via Webhooks bidirecionais, entregando respostas em formato JSON estrito, o que permite fácil integração com qualquer dashboard, ERP ou aplicativo mobile do mercado.</li>
          </ul>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500 font-medium">
              Desenvolvido por: Alisson Silva | Aluno Kodie Academy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

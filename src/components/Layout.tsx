import { ReactNode } from 'react';

interface LayoutProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

export function Layout({ sidebar, header, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-bg flex">
      {sidebar}
      <div className="flex-1 ml-64 flex flex-col">
        {header}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

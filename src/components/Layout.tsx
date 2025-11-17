import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 
                  dark:from-gray-900 dark:to-gray-800 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-md border-b 
                       border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Data Format Transformer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            JSON → TOON → SLD: Optimize data formats for AI and reduce token usage
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 
                       dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 
                      dark:text-gray-400 text-sm">
          <p>
            Built with React + TypeScript + Vite • Open source portfolio project
          </p>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import { BudgetForm } from './components/BudgetForm';
import { ClientManager } from './components/ClientManager';
import { ProductManager } from './components/ProductManager';
import { Cake, Calculator, Users, List } from 'lucide-react';

type Tab = 'budget' | 'clients' | 'products';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('budget');

  return (
    <DataProvider>
      <div className="min-h-screen bg-brand-50 font-sans text-brand-900 flex flex-col">
        
        {/* Fixed Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30 border-b border-brand-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo Area */}
              <div className="flex items-center">
                <div className="bg-brand-100 p-2 rounded-full">
                  <Cake className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-brand-800 leading-tight">Doces & Sonhos</h1>
                  <p className="text-xs text-brand-400 font-medium">Gestor de Orçamentos</p>
                </div>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex space-x-1">
                <button
                  onClick={() => setActiveTab('budget')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'budget' 
                      ? 'bg-brand-100 text-brand-800' 
                      : 'text-brand-500 hover:text-brand-600 hover:bg-brand-50'
                  }`}
                >
                  Novo Orçamento
                </button>
                <button
                  onClick={() => setActiveTab('clients')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'clients' 
                      ? 'bg-brand-100 text-brand-800' 
                      : 'text-brand-500 hover:text-brand-600 hover:bg-brand-50'
                  }`}
                >
                  Clientes
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'products' 
                      ? 'bg-brand-100 text-brand-800' 
                      : 'text-brand-500 hover:text-brand-600 hover:bg-brand-50'
                  }`}
                >
                  Tabela de Preços
                </button>
              </nav>
            </div>
          </div>

          {/* Mobile Nav (Tabs) */}
          <div className="md:hidden border-t border-brand-200 grid grid-cols-3 bg-white">
            <button
              onClick={() => setActiveTab('budget')}
              className={`flex flex-col items-center justify-center py-3 text-xs font-medium ${
                activeTab === 'budget' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-brand-400'
              }`}
            >
              <Calculator className="h-5 w-5 mb-1" />
              Orçamento
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`flex flex-col items-center justify-center py-3 text-xs font-medium ${
                activeTab === 'clients' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-brand-400'
              }`}
            >
              <Users className="h-5 w-5 mb-1" />
              Clientes
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex flex-col items-center justify-center py-3 text-xs font-medium ${
                activeTab === 'products' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-brand-400'
              }`}
            >
              <List className="h-5 w-5 mb-1" />
              Produtos
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {activeTab === 'budget' && (
            <div className="animate-fade-in">
               <BudgetForm />
            </div>
          )}
          {activeTab === 'clients' && (
            <div className="animate-fade-in">
              <ClientManager />
            </div>
          )}
          {activeTab === 'products' && (
            <div className="animate-fade-in">
              <ProductManager />
            </div>
          )}
        </main>

      </div>
    </DataProvider>
  );
};

export default App;
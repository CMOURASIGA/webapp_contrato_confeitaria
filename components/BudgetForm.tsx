import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, FileText, Check, Search, UserPlus, Receipt } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { BudgetItem, Client, EventType } from '../types';

export const BudgetForm: React.FC = () => {
  const { clients, products } = useData();
  
  // Form States
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientSearch, setClientSearch] = useState('');
  const [showClientResults, setShowClientResults] = useState(false);
  
  // Event Data
  const [eventType, setEventType] = useState<EventType>('Aniversário');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventAddress, setEventAddress] = useState('');

  // Items
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [observations, setObservations] = useState('');
  const [paymentConditions, setPaymentConditions] = useState('50% no ato, 50% na entrega.');

  // Loading states
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Refs for click outside
  const clientSearchRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (clientSearchRef.current && !clientSearchRef.current.contains(event.target as Node)) {
        setShowClientResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate total
  const totalAmount = items.reduce((acc, item) => acc + item.total, 0);

  // Client Search Logic
  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.cpfCnpj.includes(clientSearch)
  );

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setClientSearch(client.name);
    setShowClientResults(false);
  };

  // Items Logic
  const addItem = () => {
    const newItem: BudgetItem = {
      id: Math.random().toString(36).substr(2, 9),
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof BudgetItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // If product changed, find price
        if (field === 'productId') {
          const product = products.find(p => p.id === value);
          if (product) {
            updatedItem.productName = product.name;
            updatedItem.unitPrice = product.price;
          }
        }

        // Recalculate total
        if (field === 'quantity' || field === 'unitPrice' || field === 'productId') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }

        return updatedItem;
      }
      return item;
    }));
  };

  // Fake API Call
  const handleGenerate = (type: 'Orçamento' | 'Contrato') => {
    if (!selectedClient) {
      alert('Por favor, selecione um cliente.');
      return;
    }
    if (items.length === 0) {
      alert('Adicione pelo menos um item ao orçamento.');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setSuccessMessage(`${type} gerado com sucesso! O arquivo foi enviado para seu email.`);
      setTimeout(() => setSuccessMessage(null), 5000);
    }, 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      
      {/* Success Toast */}
      {successMessage && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center">
            <Check className="w-5 h-5 mr-2" />
            {successMessage}
          </div>
        </div>
      )}

      {/* Section 1: Client */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-100">
        <h2 className="text-lg font-semibold text-brand-800 mb-4 flex items-center">
          <UserPlus className="w-5 h-5 mr-2 text-accent-600" />
          Dados do Cliente
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative" ref={clientSearchRef}>
            <label className="block text-sm font-medium text-brand-800 mb-1">Buscar Cliente Existente</label>
            <div className="relative">
              <input
                type="text"
                className="block w-full px-3 py-2 border border-brand-200 rounded-md shadow-sm focus:ring-accent-400 focus:border-accent-400 sm:text-sm pl-10"
                placeholder="Digite o nome ou CPF..."
                value={clientSearch}
                onChange={(e) => {
                  setClientSearch(e.target.value);
                  setShowClientResults(true);
                  if (!e.target.value) setSelectedClient(null);
                }}
                onFocus={() => setShowClientResults(true)}
              />
              <Search className="w-4 h-4 text-brand-400 absolute left-3 top-3" />
            </div>
            
            {showClientResults && clientSearch && !selectedClient && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {filteredClients.length > 0 ? filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-brand-50 text-gray-900"
                    onClick={() => handleSelectClient(client)}
                  >
                    <span className="block truncate font-medium text-brand-900">{client.name}</span>
                    <span className="block truncate text-xs text-brand-500">{client.cpfCnpj}</span>
                  </div>
                )) : (
                  <div className="cursor-default select-none relative py-2 pl-3 pr-9 text-gray-700">
                    Nenhum cliente encontrado.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected Client Display Fields */}
          <Input 
            label="Nome Completo" 
            value={selectedClient?.name || clientSearch} 
            onChange={(e) => {
                if(selectedClient) setSelectedClient({...selectedClient, name: e.target.value});
                setClientSearch(e.target.value);
            }}
            disabled={!selectedClient}
          />
          <Input 
            label="CPF / CNPJ" 
            value={selectedClient?.cpfCnpj || ''} 
            onChange={(e) => selectedClient && setSelectedClient({...selectedClient, cpfCnpj: e.target.value})}
            disabled={!selectedClient}
          />
          <Input 
            label="Telefone" 
            value={selectedClient?.phone || ''} 
            onChange={(e) => selectedClient && setSelectedClient({...selectedClient, phone: e.target.value})}
            disabled={!selectedClient}
          />
        </div>
        {!selectedClient && (
           <p className="text-xs text-brand-400 mt-2">Selecione um cliente da lista ou vá para a aba "Clientes" para cadastrar um novo.</p>
        )}
      </div>

      {/* Section 2: Event */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-100">
        <h2 className="text-lg font-semibold text-brand-800 mb-4 flex items-center">
          <Receipt className="w-5 h-5 mr-2 text-accent-600" />
          Dados do Evento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-800 mb-1">Tipo de Evento</label>
            <select 
              className="block w-full px-3 py-2 border border-brand-200 rounded-md shadow-sm focus:ring-accent-400 focus:border-accent-400 sm:text-sm"
              value={eventType}
              onChange={(e) => setEventType(e.target.value as EventType)}
            >
              <option value="Aniversário">Aniversário</option>
              <option value="Casamento">Casamento</option>
              <option value="Batizado">Batizado</option>
              <option value="Corporativo">Corporativo</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <Input 
            label="Data do Evento" 
            type="date" 
            value={eventDate} 
            onChange={(e) => setEventDate(e.target.value)} 
          />
          <Input 
            label="Horário" 
            type="time" 
            value={eventTime} 
            onChange={(e) => setEventTime(e.target.value)} 
          />
          <Input 
            label="Local do Evento" 
            placeholder="Ex: Salão de Festas X"
            value={eventAddress} 
            onChange={(e) => setEventAddress(e.target.value)} 
          />
        </div>
      </div>

      {/* Section 3: Items */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-brand-800">Itens do Pedido</h2>
          <Button variant="secondary" onClick={addItem} type="button">
            <Plus className="w-4 h-4 mr-1" /> Adicionar Item
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-100">
            <thead className="bg-brand-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wider min-w-[150px]">Produto</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wider w-24">Qtd</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wider w-32">Unit (R$)</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wider w-32">Total (R$)</th>
                <th scope="col" className="relative px-3 py-3"><span className="sr-only">Remover</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-brand-50">
                  <td className="px-3 py-2">
                    <select
                      className="block w-full text-sm border-brand-200 rounded-md focus:ring-accent-400 focus:border-accent-400"
                      value={item.productId}
                      onChange={(e) => updateItem(item.id, 'productId', e.target.value)}
                    >
                      <option value="">Selecione...</option>
                      {products.filter(p => p.active).map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.unit})</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min="1"
                      className="block w-full text-sm border-brand-200 rounded-md focus:ring-accent-400 focus:border-accent-400"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="block w-full text-sm border-brand-200 rounded-md focus:ring-accent-400 focus:border-accent-400"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                    />
                  </td>
                  <td className="px-3 py-2 text-sm text-brand-900 font-medium">
                    {formatCurrency(item.total)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center text-brand-400 text-sm">
                    Nenhum item adicionado. Clique em "Adicionar Item".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="bg-brand-50 px-6 py-3 rounded-lg border border-brand-200">
            <span className="text-brand-800 font-medium mr-2">Total do Orçamento:</span>
            <span className="text-2xl font-bold text-brand-700">{formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Section 4: Details */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-100">
        <h2 className="text-lg font-semibold text-brand-800 mb-4">Observações e Condições</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-800 mb-1">Observações Gerais</label>
            <textarea 
              className="shadow-sm focus:ring-accent-400 focus:border-accent-400 block w-full sm:text-sm border border-brand-200 rounded-md p-2"
              rows={3}
              placeholder="Ex: Cliente alérgico a amendoim..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </div>
          <Input 
            label="Condições de Pagamento" 
            value={paymentConditions} 
            onChange={(e) => setPaymentConditions(e.target.value)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-brand-200 p-4 shadow-lg md:relative md:bg-transparent md:border-0 md:shadow-none md:p-0 z-20">
        <div className="max-w-4xl mx-auto flex gap-4 justify-end">
          <Button 
            variant="outline" 
            onClick={() => handleGenerate('Orçamento')}
            isLoading={isGenerating}
            className="flex-1 md:flex-none"
          >
            <FileText className="w-4 h-4 mr-2" />
            Gerar Orçamento
          </Button>
          <Button 
            variant="primary" 
            onClick={() => handleGenerate('Contrato')}
            isLoading={isGenerating}
            className="flex-1 md:flex-none"
          >
            <Check className="w-4 h-4 mr-2" />
            Gerar Contrato
          </Button>
        </div>
      </div>

    </div>
  );
};
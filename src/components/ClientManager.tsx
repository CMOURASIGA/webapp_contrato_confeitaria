import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Client } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Search, Plus, Edit2, Trash2, User } from 'lucide-react';

export const ClientManager: React.FC = () => {
  const { clients, addClient, updateClient, deleteClient } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Client>>({});

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.cpfCnpj.includes(searchTerm) ||
    c.phone.includes(searchTerm)
  );

  const openModal = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      setFormData(client);
    } else {
      setEditingClient(null);
      setFormData({});
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return; // Basic validation

    if (editingClient) {
      updateClient({ ...editingClient, ...formData } as Client);
    } else {
      addClient({
        id: Date.now().toString(),
        ...formData
      } as Client);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      deleteClient(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* Header / Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Buscar cliente..."
            className="pl-10 w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-accent-400 focus:border-accent-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-brand-400 absolute left-3 top-2.5" />
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="w-5 h-5 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map(client => (
          <div key={client.id} className="bg-white rounded-lg shadow-sm border border-brand-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mr-3">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-900">{client.name}</h3>
                  <p className="text-sm text-brand-500">{client.phone}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-brand-50 text-sm text-brand-700 space-y-1">
              <p><span className="font-medium">CPF/CNPJ:</span> {client.cpfCnpj}</p>
              {client.address && <p className="truncate"><span className="font-medium">Endereço:</span> {client.address}</p>}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="secondary" className="p-2" onClick={() => openModal(client)}>
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="danger" className="p-2" onClick={() => handleDelete(client.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        {filteredClients.length === 0 && (
          <div className="col-span-full text-center py-10 text-brand-500 bg-white rounded-lg border border-dashed border-brand-300">
            Nenhum cliente encontrado.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-brand-50 px-6 py-4 border-b border-brand-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-brand-900">
                {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-400 hover:text-brand-600">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input 
                label="Nome Completo" 
                value={formData.name || ''} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required 
              />
              <Input 
                label="CPF / CNPJ" 
                value={formData.cpfCnpj || ''} 
                onChange={e => setFormData({...formData, cpfCnpj: e.target.value})} 
              />
              <Input 
                label="Telefone" 
                value={formData.phone || ''} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                required 
              />
              <Input 
                label="Email" 
                type="email" 
                value={formData.email || ''} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
              <div>
                <label className="block text-sm font-medium text-brand-800 mb-1">Endereço</label>
                <textarea
                  className="w-full px-3 py-2 border border-brand-200 rounded-md focus:ring-accent-400 focus:border-accent-400 sm:text-sm"
                  rows={2}
                  value={formData.address || ''}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" fullWidth onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" fullWidth>
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
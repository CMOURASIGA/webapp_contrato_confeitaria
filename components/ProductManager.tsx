import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Product } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Search, Plus, Edit2, Tag, Archive } from 'lucide-react';

export const ProductManager: React.FC = () => {
  const { products, addProduct, updateProduct, toggleProductStatus } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({});

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({ active: true, unit: 'unidade', category: 'Bolo' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (editingProduct) {
      updateProduct({ ...editingProduct, ...formData } as Product);
    } else {
      addProduct({
        id: Date.now().toString(),
        ...formData
      } as Product);
    }
    setIsModalOpen(false);
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* Header / Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Buscar produto por nome ou categoria..."
            className="pl-10 w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-accent-400 focus:border-accent-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-brand-400 absolute left-3 top-2.5" />
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="w-5 h-5 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Table List */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-100 overflow-hidden">
        <table className="min-w-full divide-y divide-brand-100">
          <thead className="bg-brand-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-700 uppercase tracking-wider">Produto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-700 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-700 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-brand-700 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-brand-100">
            {filteredProducts.map(product => (
              <tr key={product.id} className="hover:bg-brand-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-brand-100 rounded flex items-center justify-center text-brand-500">
                      <Tag className="w-4 h-4" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-brand-900">{product.name}</div>
                      <div className="text-sm text-brand-500">Por {product.unit}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accent-100 text-accent-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-900 font-medium">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {product.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button onClick={() => openModal(product)} className="text-brand-600 hover:text-brand-800">
                    <Edit2 className="w-4 h-4 inline" />
                  </button>
                  <button onClick={() => toggleProductStatus(product.id)} className={`${product.active ? 'text-orange-500' : 'text-green-500'} hover:opacity-75`}>
                    <Archive className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <div className="text-center py-10 text-brand-500">
            Nenhum produto encontrado.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-brand-50 px-6 py-4 border-b border-brand-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-brand-900">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-400 hover:text-brand-600">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input 
                label="Nome do Produto" 
                value={formData.name || ''} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required 
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-800 mb-1">Categoria</label>
                  <select 
                    className="block w-full px-3 py-2 border border-brand-200 rounded-md shadow-sm focus:ring-accent-400 focus:border-accent-400 sm:text-sm"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  >
                    <option value="Bolo">Bolo</option>
                    <option value="Doce">Doce</option>
                    <option value="Salgado">Salgado</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <Input 
                  label="Unidade" 
                  placeholder="Ex: kg, cento"
                  value={formData.unit || ''} 
                  onChange={e => setFormData({...formData, unit: e.target.value})} 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Preço Unitário (R$)" 
                  type="number"
                  step="0.01"
                  value={formData.price || ''} 
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})} 
                  required 
                />
                <div className="flex items-center pt-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.active !== false}
                      onChange={e => setFormData({...formData, active: e.target.checked})}
                      className="form-checkbox h-5 w-5 text-brand-600 rounded"
                    />
                    <span className="text-brand-800 text-sm">Produto Ativo</span>
                  </label>
                </div>
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
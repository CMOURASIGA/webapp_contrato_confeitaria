import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Client, Product } from '../types';

interface DataContextType {
  clients: Client[];
  products: Product[];
  addClient: (client: Client) => void;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  toggleProductStatus: (id: string) => void;
}

const initialClients: Client[] = [
  { id: '1', name: 'Ana Silva', cpfCnpj: '123.456.789-00', phone: '(11) 99999-9999', email: 'ana@email.com', address: 'Rua das Flores, 123' },
  { id: '2', name: 'Carlos Oliveira', cpfCnpj: '987.654.321-11', phone: '(11) 98888-8888', email: 'carlos@email.com', address: 'Av. Paulista, 1000' },
];

const initialProducts: Product[] = [
  { id: '1', name: 'Bolo de Chocolate', category: 'Bolo', unit: 'kg', price: 85.00, active: true },
  { id: '2', name: 'Brigadeiro Gourmet', category: 'Doce', unit: 'cento', price: 120.00, active: true },
  { id: '3', name: 'Coxinha de Frango', category: 'Salgado', unit: 'cento', price: 90.00, active: true },
  { id: '4', name: 'Bolo Red Velvet', category: 'Bolo', unit: 'kg', price: 110.00, active: true },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addClient = (client: Client) => setClients([...clients, client]);
  
  const updateClient = (updatedClient: Client) => {
    setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
  };

  const addProduct = (product: Product) => setProducts([...products, product]);

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const toggleProductStatus = (id: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <DataContext.Provider value={{ 
      clients, products, 
      addClient, updateClient, deleteClient, 
      addProduct, updateProduct, toggleProductStatus 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
export interface Client {
  id: string;
  name: string;
  cpfCnpj: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Bolo' | 'Doce' | 'Salgado' | 'Outro';
  unit: string;
  price: number;
  active: boolean;
}

export interface BudgetItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type EventType = 'Aniversário' | 'Casamento' | 'Batizado' | 'Corporativo' | 'Outro';
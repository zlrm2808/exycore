import { Producto } from "./types";

// Simulamos que estos datos vienen de una base de datos
export const obtenerProductos = (): Producto[] => {
  return [
    { id: '1', nombre: 'Laptop Pro', sku: 'LAP-001', precio: 1200, stock: 15, categoria: 'Electrónica' },
    { id: '2', nombre: 'Teclado Mecánico', sku: 'TEC-002', precio: 80, stock: 45, categoria: 'Accesorios' },
    { id: '3', nombre: 'Monitor 4K', sku: 'MON-003', precio: 400, stock: 8, categoria: 'Electrónica' },
  ];
};
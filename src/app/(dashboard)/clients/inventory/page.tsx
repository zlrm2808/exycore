"use client";
import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CrearProductoModal } from "@/modules/inventory/components/CrearProducto";
import { ERP_ICONS, ICON_STYLES } from "@/components/ui/icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function InventoryPage() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productos, setProductos] = useState<any[]>([]);

  const cargarDatos = useCallback(async () => {
    const { data } = await supabase
      .from('products')
      .select(`
        prd_id, prd_name, prd_sku, prd_price,
        inventory_stock ( stk_quantity )
      `)
      .order('prd_created_at', { ascending: false });
    if (data) setProductos(data);
  }, []);

  useEffect(() => { cargarDatos(); }, [cargarDatos]);

  return (
    <div className="-m-6 bg-(--bg-main) min-h-full transition-colors duration-300">
      <div className="p-6">
        {/* Título de Página */}
        <div className="flex items-center gap-2 mb-6 text-(--text-main)">
          <ERP_ICONS.Inventario size={24} stroke={1.5} className="text-(--brand-primary)" />
          <h1 className="text-xl font-semibold">Gestión de Productos</h1>
        </div>

        {/* Contenedor de Tabla */}
        <div className="bg-(--bg-card) border border-(--border-color) rounded-(--radius) shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-(--bg-main)">
              <TableRow className="hover:bg-transparent border-b border-(--border-color)">
                <TableHead className="font-semibold text-(--text-main)">SKU</TableHead>
                <TableHead className="font-semibold text-(--text-main)">Producto</TableHead>
                <TableHead className="text-right font-semibold text-(--text-main)">Stock</TableHead>
                <TableHead className="text-right font-semibold text-(--text-main)">Precio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productos.length > 0 ? (
                productos.map((p) => (
                  <TableRow
                    key={p.prd_id}
                    className="hover:bg-(--bg-main)/50 border-b border-(--border-color) transition-colors"
                  >
                    <TableCell className="font-mono text-xs text-(--text-muted)">
                      {p.prd_sku}
                    </TableCell>
                    <TableCell className="font-medium text-(--text-main)">
                      {p.prd_name}
                    </TableCell>
                    <TableCell className="text-right text-(--text-main)">
                      {p.inventory_stock?.[0]?.stk_quantity ?? 0}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-(--brand-primary)">
                      ${Number(p.prd_price).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-(--text-muted)">
                    No se encontraron productos.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <CrearProductoModal
          abierto={modalAbierto}
          setAbierto={setModalAbierto}
          alGuardar={cargarDatos}
        />
      </div>
    </div>
  );
}
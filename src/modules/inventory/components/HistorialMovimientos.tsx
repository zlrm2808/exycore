"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function HistorialMovimientos() {
  const [movimientos, setMovimientos] = useState<any[]>([]);

  useEffect(() => {
    async function cargarHistorial() {
      const { data } = await supabase
        .from('inventory_transactions')
        .select(`
          trns_id, trns_type, trns_quantity, trns_reason, trns_created_at,
          products ( prd_name, prd_sku )
        `)
        .order('trns_created_at', { ascending: false });
      if (data) setMovimientos(data);
    }
    cargarHistorial();
  }, []);

  return (
    <div className="bg-(--bg-card) border border-(--border-color) rounded-(--radius) shadow-sm overflow-hidden transition-colors duration-300">
      <Table>
        <TableHeader className="bg-(--bg-main)">
          <TableRow className="hover:bg-transparent border-b border-(--border-color)">
            <TableHead className="w-48 text-(--text-main) font-semibold">Fecha</TableHead>
            <TableHead className="text-(--text-main) font-semibold">Producto</TableHead>
            <TableHead className="text-(--text-main) font-semibold">Tipo</TableHead>
            <TableHead className="text-right text-(--text-main) font-semibold">Cantidad</TableHead>
            <TableHead className="text-(--text-main) font-semibold">Motivo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movimientos.length > 0 ? (
            movimientos.map((m) => (
              <TableRow key={m.trns_id} className="text-sm border-b border-(--border-color) hover:bg-(--bg-main)/50 transition-colors">
                <TableCell className="text-(--text-muted) font-mono text-xs">
                  {new Date(m.trns_created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="font-medium text-(--text-main)">{m.products?.prd_name}</div>
                  <div className="text-xs text-(--text-muted)">{m.products?.prd_sku}</div>
                </TableCell>
                <TableCell>
                  {m.trns_type === 'IN' ? (
                    <Badge className="bg-green-500/15 text-green-600 dark:text-green-400 hover:bg-green-500/20 border-none shadow-none">
                      Entrada
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/15 text-red-600 dark:text-red-400 hover:bg-red-500/20 border-none shadow-none">
                      Salida
                    </Badge>
                  )}
                </TableCell>
                <TableCell className={`text-right font-bold ${m.trns_type === 'IN' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {m.trns_type === 'IN' ? '+' : '-'}{m.trns_quantity}
                </TableCell>
                <TableCell className="text-(--text-muted) italic text-xs">
                  {m.trns_reason || "Sin observación"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-(--text-muted)">
                No hay movimientos registrados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
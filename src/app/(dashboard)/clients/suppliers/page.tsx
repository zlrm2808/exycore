"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { CrearProveedor } from "@/modules/suppliers/components/CrearProveedor";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SuppliersPage() {
  const [proveedores, setProveedores] = useState<any[]>([]);

  const cargarProveedores = useCallback(async () => {
    // Nota: En el futuro, aquí se usará el esquema del tenant actual
    const { data } = await supabase
      .from('suppliers')
      .select('*')
      .order('sup_created_at', { ascending: false });
    if (data) setProveedores(data);
  }, []);

  useEffect(() => { cargarProveedores(); }, [cargarProveedores]);

  return (
    <div className="space-y-6 bg-(--bg-main) min-h-full transition-colors duration-300">
      <div className="flex justify-between items-center px-1">
        <h1 className="text-2xl font-semibold text-(--text-main)">
          Gestión de Proveedores
        </h1>
        <CrearProveedor alGuardar={cargarProveedores} />
      </div>

      <div className="bg-(--bg-card) border border-(--border-color) rounded-(--radius) shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-(--bg-main)">
            <TableRow className="hover:bg-transparent border-b border-(--border-color)">
              <TableHead className="font-semibold text-(--text-main)">ID Fiscal</TableHead>
              <TableHead className="font-semibold text-(--text-main)">Razón Social</TableHead>
              <TableHead className="font-semibold text-(--text-main)">Fecha Registro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proveedores.length > 0 ? (
              proveedores.map((s) => (
                <TableRow
                  key={s.sup_id}
                  className="hover:bg-(--bg-main)/50 border-b border-(--border-color) transition-colors"
                >
                  <TableCell className="font-mono text-xs text-(--text-muted)">
                    {s.sup_tax_id}
                  </TableCell>
                  <TableCell className="font-medium text-(--text-main)">
                    {s.sup_name}
                  </TableCell>
                  <TableCell className="text-(--text-muted)">
                    {new Date(s.sup_created_at).toLocaleDate
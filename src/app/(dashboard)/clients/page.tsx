"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { CrearCliente } from "@/modules/clients/components/CrearCliente";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ClientsPage() {
  const [clientes, setClientes] = useState<any[]>([]);

  const cargarClientes = useCallback(async () => {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .order('cli_created_at', { ascending: false });
    if (data) setClientes(data);
  }, []);

  useEffect(() => { cargarClientes(); }, [cargarClientes]);

  return (
    <div className="space-y-6 bg-(--bg-main) min-h-full transition-colors duration-300">
      {/* Encabezado con texto dinámico */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-(--text-main)">
          Directorio de Clientes
        </h1>
        <CrearCliente alGuardar={cargarClientes} />
      </div>

      {/* Contenedor de Tabla con variables de tema */}
      <div className="bg-(--bg-card) border border-(--border-color) rounded-(--radius) shadow-sm overflow-hidden transition-all duration-300">
        <Table>
          <TableHeader className="bg-(--bg-main)">
            <TableRow className="hover:bg-transparent border-b border-(--border-color)">
              <TableHead className="font-semibold text-(--text-main)">ID / Documento</TableHead>
              <TableHead className="font-semibold text-(--text-main)">Nombre</TableHead>
              <TableHead className="font-semibold text-(--text-main)">Contacto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.length > 0 ? (
              clientes.map((c) => (
                <TableRow
                  key={c.cli_id}
                  className="hover:bg-(--bg-main)/50 border-b border-(--border-color) transition-colors"
                >
                  <TableCell className="font-mono text-xs text-(--text-muted)">
                    {c.cli_document_id}
                  </TableCell>
                  <TableCell className="font-medium text-(--text-main)">
                    {c.cli_name}
                  </TableCell>
                  <TableCell className="text-(--text-muted)">
                    {c.cli_email || 'Sin correo'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-(--text-muted)">
                  No hay clientes registrados en la base de datos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
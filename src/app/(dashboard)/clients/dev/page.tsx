"use client";

import { CodeEditor } from "@/modules/dev/components/CodeEditor";
import { ERP_ICONS } from "@/components/ui/icons";

export default function DevPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-card)] transition-colors duration-300">
      {/* Encabezado del Editor - Estilo Dinámico */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-color)] bg-[var(--bg-main)]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ERP_ICONS.Dashboard size={16} className="text-[var(--brand-primary)]" />
            <span className="text-xs font-semibold text-[var(--text-main)]">SDK de Desarrollo</span>
          </div>
          <div className="h-4 w-[1px] bg-[var(--border-color)]" />
          <span className="text-xs text-[var(--text-muted)] italic font-mono">nuevo_modulo.ts</span>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-1.5 text-xs bg-[var(--brand-primary)] text-white rounded-[var(--radius)] hover:opacity-90 transition-all font-medium border-none">
            Compilar y Registrar
          </button>
        </div>
      </div>

      {/* El Editor de Código */}
      {/* Nota: Asegúrate de que el componente CodeEditor también reciba el tema para cambiar entre 'vs-dark' y 'light' */}
      <div className="flex-1 overflow-hidden bg-[var(--bg-card)]">
        <CodeEditor />
      </div>

      {/* Terminal de Salida - Estética de Consola Dinámica */}
      <div className="h-40 border-t border-[var(--border-color)] bg-[var(--bg-main)] p-3 overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[var(--brand-primary)] animate-pulse" />
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Consola de Salida</span>
          </div>
          <span className="text-[10px] text-[var(--text-muted)] font-mono opacity-50">UTF-8</span>
        </div>

        <div className="space-y-1 font-mono text-[11px]">
          <p className="text-[var(--brand-primary)]">
            <span className="text-[var(--text-muted)] mr-2">[12:36:03]</span>
            ✓ SDK Inicializado correctamente en entorno multi-tenant.
          </p>
          <p className="text-[var(--text-main)] opacity-80">
            <span className="text-[var(--text-muted)] mr-2">[12:36:03]</span>
            i Escuchando cambios en el sistema de archivos virtual...
          </p>
          <div className="flex gap-2 items-center text-[var(--text-muted)]">
            <span className="mr-2">[12:40:12]</span>
            <span className="inline-block h-[11px] w-1.5 bg-[var(--brand-primary)] animate-caret" />
            <span className="italic">Esperando entrada del desarrollador...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
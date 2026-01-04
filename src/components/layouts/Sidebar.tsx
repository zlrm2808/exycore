"use client";

import { ERP_ICONS } from "@/components/ui/icons";
import Link from 'next/link';
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

export function AppSidebar() {
  const [temaActual, setTemaActual] = useState("ms-light");

  // Función para cambiar el tema en el HTML
  const cambiarTema = (nuevoTema: string) => {
    setTemaActual(nuevoTema);
    document.documentElement.setAttribute("data-theme", nuevoTema);
    localStorage.setItem("erp-theme", nuevoTema);
  };

  // Cargar tema guardado al iniciar
  useEffect(() => {
    const guardado = localStorage.getItem("erp-theme") || "ms-light";
    cambiarTema(guardado);
  }, []);

  return (
    <aside className="w-16 flex flex-col items-center py-4 bg-(--bg-card) border-r border-(--border-color) transition-all duration-300">

      {/* Logo / Home */}
      <div className="mb-8">
        <Link href="/dashboard">
          <div className="bg-(--brand-primary) text-white p-2 rounded-(--radius) shadow-sm hover:opacity-90 transition-opacity">
            <ERP_ICONS.Dashboard size={20} stroke={2} />
          </div>
        </Link>
      </div>

      {/* Navegación Principal */}
      <nav className="flex-1 flex flex-col gap-4">
        <SidebarIcon icon={<ERP_ICONS.Inventario size={22} />} label="Inventario" href="/inventory" />
        <SidebarIcon icon={<ERP_ICONS.Usuarios size={22} />} label="Clientes" href="/clients" />
        <SidebarIcon icon={<ERP_ICONS.Ventas size={22} />} label="Proveedores" href="/suppliers" />
        <SidebarIcon icon={<ERP_ICONS.Configuracion size={22} />} label="Dev SDK" href="/dev" />
      </nav>

      {/* SECTOR DE USUARIO Y TEMAS */}
      <div className="mt-auto flex flex-col gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="size-10 rounded-full bg-(--bg-main) border border-(--border-color) flex items-center justify-center text-(--brand-primary) hover:border-(--brand-primary) transition-colors">
              <span className="text-xs font-bold">JD</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-56 bg-(--bg-card) border-(--border-color) rounded-(--radius) shadow-xl">
            <DropdownMenuLabel className="text-(--text-main)">Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-(--border-color)" />

            {/* Opciones de Temas */}
            <DropdownMenuLabel className="text-[10px] uppercase text-(--text-muted) mt-2">Personalización</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => cambiarTema('ms-light')} className="text-(--text-main) cursor-pointer">
              <div className="size-2 rounded-full bg-blue-500 mr-2" /> Microsoft Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => cambiarTema('ms-dark')} className="text-(--text-main) cursor-pointer">
              <div className="size-2 rounded-full bg-slate-900 mr-2" /> Microsoft Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => cambiarTema('vibrant-light')} className="text-(--text-main) cursor-pointer">
              <div className="size-2 rounded-full bg-indigo-500 mr-2" /> Modern Vibrant
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => cambiarTema('industrial-dark')} className="text-(--text-main) cursor-pointer">
              <div className="size-2 rounded-full bg-amber-500 mr-2" /> Industrial Gold
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-(--border-color)" />
            <DropdownMenuItem className="text-red-500 cursor-pointer">Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}

// Sub-componente para los iconos del Sidebar
function SidebarIcon({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link
      href={href}
      title={label}
      className="p-2 text-(--text-muted) hover:text-(--brand-primary) hover:bg-(--bg-main) rounded-(--radius) transition-all duration-200"
    >
      {icon}
    </Link>
  );
}
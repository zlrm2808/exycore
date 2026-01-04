"use client";

import { useEffect, useState } from "react";
import { ERP_ICONS } from "@/components/ui/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function AppSidebar() {
  const [tema, setTema] = useState("ms-light");

  const cambiarTema = (nuevoTema: string) => {
    setTema(nuevoTema);
    document.documentElement.setAttribute("data-theme", nuevoTema);
    localStorage.setItem("erp-theme", nuevoTema);
  };

  useEffect(() => {
    const guardado = localStorage.getItem("erp-theme") || "ms-light";
    cambiarTema(guardado);
  }, []);

  return (
    <Sidebar variant="floating" collapsible="icon" className="border-(--border-color)">
      <SidebarHeader className="h-14 flex items-center justify-center border-b border-(--border-color) bg-(--bg-card)">
        <div className="flex items-center gap-2 px-2">
          <div className="bg-(--brand-primary) p-1.5 rounded-md shadow-sm">
            <ERP_ICONS.Dashboard size={20} className="text-white" />
          </div>
          <span className="font-bold text-(--text-main) truncate group-data-[collapsible=icon]:hidden uppercase tracking-tight">
            PROVIDENCIA ERP
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-(--bg-card) transition-colors duration-300">
        <SidebarMenu className="p-2 border-b border-(--border-color) bg-(--bg-main) hover:bg-(--border-color) transition-colors">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer outline-none">
                  <div className="size-10 shrink-0 rounded-full bg-(--brand-primary) flex items-center justify-center text-white font-bold text-xs shadow-md">
                    ZR
                  </div>
                  <div className="flex flex-col group-data-[collapsible=icon]:hidden overflow-hidden">
                    <span className="text-sm font-semibold text-(--text-main) truncate">Zeus Rodríguez</span>
                    <span className="text-[10px] text-(--text-muted) truncate">Tecnología e Información</span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" className="w-56 bg-(--bg-card) border-(--border-color) rounded-(--radius)">
                <DropdownMenuLabel className="text-(--text-main)">Personalización</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-(--border-color)" />
                <DropdownMenuItem onClick={() => cambiarTema('ms-light')} className="text-(--text-main) cursor-pointer">
                  Microsoft 365 Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => cambiarTema('ms-dark')} className="text-(--text-main) cursor-pointer">
                  Microsoft 365 Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => cambiarTema('vibrant-light')} className="text-(--text-main) cursor-pointer">
                  Modern Vibrant
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => cambiarTema('industrial-dark')} className="text-(--text-main) cursor-pointer">
                  Industrial Gold
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-(--border-color)" />
                <DropdownMenuItem className="text-red-500 cursor-pointer">Cerrar Sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="p-2 space-y-1">
          <SidebarMenuItem className="list-none">
            <SidebarMenuButton asChild tooltip="Dashboard">
              <Link href="/dashboard" className="text-(--text-main) hover:bg-(--brand-primary)/10 transition-colors">
                <ERP_ICONS.Dashboard size={20} stroke={1.5} />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="list-none">
            <SidebarMenuButton asChild tooltip="Inventario">
              <Link href="/inventory" className="text-(--text-main) hover:bg-(--brand-primary)/10 transition-colors">
                <ERP_ICONS.Inventario size={20} stroke={1.5} />
                <span>Inventario</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="list-none">
            <SidebarMenuButton asChild tooltip="SDK de Desarrollo">
              <Link href="/dev" className="text-(--brand-primary) font-semibold hover:bg-(--brand-primary)/10 transition-colors">
                <ERP_ICONS.Dashboard size={20} stroke={1.5} />
                <span>Modo Desarrollador</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-(--border-color) bg-(--bg-card) p-2 text-center">
        <span className="text-[10px] text-(--text-muted) uppercase font-medium group-data-[collapsible=icon]:hidden">
          v2.0 Build 2026
        </span>
      </SidebarFooter>
    </Sidebar>
  );
}
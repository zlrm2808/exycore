import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModuleRibbon } from "@/components/ui/ModuleRibbon";
import { AutoBreadcrumb } from "@/components/ui/AutoBreadcrumb";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      {/* Contenedor principal con fondo dinámico */}
      <div className="flex h-screen w-full overflow-hidden bg-(--bg-main) transition-colors duration-300">

        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">

          {/* Header / Ribbon con bordes y fondo dinámicos */}
          <header className="flex items-center bg-(--bg-card) border border-(--border-color) rounded-(--radius) shadow-sm pr-4 mt-2.5 mx-2 transition-all duration-300">
            <SidebarTrigger className="ml-2 text-(--text-muted) hover:text-(--brand-primary)" />
            <ModuleRibbon />
          </header>

          {/* Área de Contenido Principal */}
          <main className="flex-1 pt-2 px-2 pb-2 overflow-hidden">
            <div className="bg-(--bg-card) border border-(--border-color) shadow-sm rounded-(--radius) h-full flex flex-col overflow-auto transition-all duration-300">

              {/* Breadcrumb con texto atenuado */}
              <div className="px-6 pt-4 pb-2">
                <AutoBreadcrumb />
              </div>

              {/* Contenido de la Página (children) */}
              <div className="px-6 flex-1 text-(--text-main)">
                {children}
              </div>

            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
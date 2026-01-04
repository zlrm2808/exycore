"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ERP_ICONS } from "@/components/ui/icons";
import { RibbonButton, RibbonSeparator } from "./RibbonButton";

export function ModuleRibbon() {
  const [estaColapsado, setEstaColapsado] = useState(false);
  const pathname = usePathname();

  const esInventario = pathname.includes("/inventory");
  const esVentas = pathname.includes("/sales");
  const esClientes = pathname.includes("/clients");
  const esCompras = pathname.includes("/purchases");

  const tituloModulo = esInventario ? "INVENTARIO" : esVentas ? "VENTAS" : esClientes ? "CLIENTES" : "DASHBOARD";

  return (
    <div className="flex flex-col bg-white w-full relative">
      {/* Tabs superiores */}
      <div className="flex items-center px-4 h-9 gap-8 border-b border-[#f3f2f1] bg-white">
        <span className="font-bold text-[11px] border-r border-[#e1dfdd] pr-4 text-[#0078d4] tracking-widest uppercase">
          {tituloModulo}
        </span>
        <nav className="flex h-full items-center gap-6 text-[13px]">
          <button className="border-b-2 border-[#0078d4] h-full px-1 text-[#323130] font-medium">Inicio</button>
          <button className="text-[#605e5c] hover:text-[#323130]">Ficheros</button>
          <button className="text-[#605e5c] hover:text-[#323130]">Transacciones</button>
        </nav>
      </div>

      <div className={`mb-2 rounded-lg overflow-hidden transition-all duration-300 bg-[#faf9f8] ${estaColapsado ? "max-h-0" : "max-h-20 border-b border-[#e1dfdd]"}`}>
        <div className="flex items-center p-1 gap-1 h-16">

          {esInventario && (
            <>
              <RibbonButton
                label="Nuevo Producto"
                icon={<ERP_ICONS.Inventario size={28} stroke={1.5} />}
                onClick={() => { }}
              />
              <div className="flex flex-col gap-0 justify-center">
                <RibbonButton size="medium" label="Categorías" icon={<ERP_ICONS.Dashboard size={18} />} />
                <RibbonButton size="medium" label="Almacenes" icon={<ERP_ICONS.Dashboard size={18} />} />
              </div>
              <RibbonSeparator />
              <RibbonButton size="large" label="Kardex" icon={<ERP_ICONS.Ventas size={28} />} />
            </>
          )}

          {esVentas && (
            <>
              <RibbonButton label="Nueva Venta" icon={<ERP_ICONS.Ventas size={28} />} primary />
              <RibbonSeparator />
              <div className="grid grid-cols-2 gap-1">
                <RibbonButton size="small" label="Imprimir" icon={<ERP_ICONS.Dashboard size={18} />} />
                <RibbonButton size="small" label="Anular" icon={<ERP_ICONS.Dashboard size={18} />} />
              </div>
            </>
          )}

          {esCompras && (
            <>
              <RibbonButton
                label="Nueva Orden"
                icon={<ERP_ICONS.Ventas size={28} stroke={1.5} />}
                onClick={() => setModalCompra(true)}
              />
              <RibbonSeparator />
              <div className="flex flex-col gap-0 justify-center">
                <RibbonButton size="medium" label="Proveedores" icon={<ERP_ICONS.Dashboard size={18} />} />
                <RibbonButton size="medium" label="Histórico" icon={<ERP_ICONS.Dashboard size={18} />} />
              </div>
            </>
          )}
        </div>
      </div>

      <button onClick={() => setEstaColapsado(!estaColapsado)} className="absolute bottom-3 right-2 p-1 hover:bg-[#edebe9] rounded-sm text-[#605e5c] z-20">
        {estaColapsado ? <ERP_ICONS.ChevronDown size={14} /> : <ERP_ICONS.ChevronUp size={14} />}
      </button>
    </div>
  );
}
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export function CrearProductoModal({
  abierto,
  setAbierto,
  alGuardar
}: {
  abierto: boolean,
  setAbierto: (b: boolean) => void,
  alGuardar: () => void
}) {
  const [nombre, setNombre] = useState("");
  const [sku, setSku] = useState("");
  const [precio, setPrecio] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarGuardado = async () => {
    if (!nombre || !sku || !precio) return toast.error("Completa todos los campos");

    setCargando(true);

    try {
      // 1. Insertamos el producto
      const { data: nuevoProducto, error: errorProducto } = await supabase
        .from('products')
        .insert([{
          prd_name: nombre,
          prd_sku: sku,
          prd_price: parseFloat(precio),
          prd_category: 'General'
        }])
        .select().single();

      if (errorProducto) throw errorProducto;

      // 2. Inicializamos stock en 0
      await supabase.from('inventory_stock').insert([{ stk_prd_id: nuevoProducto.prd_id, stk_quantity: 0 }]);

      toast.success("Producto creado correctamente");
      alGuardar();

      // Limpiar y cerrar
      setNombre(""); setSku(""); setPrecio("");
      setAbierto(false);

    } catch (error: any) {
      toast.error("Error: " + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>
        <Button className="bg-(--brand-primary) hover:opacity-90 text-white rounded-(--radius) border-none">
          Nuevo Producto
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-(--bg-card) border-(--border-color) rounded-(--radius) transition-all">
        <DialogHeader>
          <DialogTitle className="text-(--text-main)">Agregar Nuevo Producto</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label className="text-(--text-muted)">Nombre del Producto</Label>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Teclado Mecánico RGB"
              className="border-(--border-color) bg-transparent text-(--text-main) focus-visible:ring-(--brand-primary) rounded-(--radius)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-(--text-muted)">SKU</Label>
              <Input
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="PRD-001"
                className="border-(--border-color) bg-transparent text-(--text-main) rounded-(--radius)"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-(--text-muted)">Precio</Label>
              <Input
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                type="number"
                placeholder="0.00"
                className="border-(--border-color) bg-transparent text-(--text-main) rounded-(--radius)"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={manejarGuardado}
            disabled={cargando}
            className="w-full bg-(--brand-primary) hover:opacity-90 text-white rounded-(--radius) border-none h-11 transition-all"
          >
            {cargando ? "Registrando..." : "Guardar Producto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
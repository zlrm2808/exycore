"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

export function CrearProveedor({ alGuardar }: { alGuardar: () => void }) {
  const [nombre, setNombre] = useState("");
  const [taxId, setTaxId] = useState("");
  const [abierto, setAbierto] = useState(false);

  const manejarGuardado = async () => {
    const { error } = await supabase.from('suppliers').insert([{
      sup_name: nombre,
      sup_tax_id: taxId
    }]);

    if (error) return toast.error(error.message);

    toast.success("Proveedor registrado exitosamente");
    alGuardar();
    setAbierto(false);
    setNombre(""); setTaxId("");
  };

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>
        <Button className="bg-(--brand-primary) hover:opacity-90 rounded-(--radius) text-white border-none">
          Nuevo Proveedor
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-(--bg-card) border-(--border-color) rounded-(--radius)">
        <DialogHeader>
          <DialogTitle className="text-(--text-main)">Nuevo Proveedor</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label className="text-(--text-muted)">Razón Social / Nombre</Label>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Inversiones Globales C.A."
              className="rounded-(--radius) border-(--border-color) bg-transparent text-(--text-main) focus-visible:ring-(--brand-primary)"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-(--text-muted)">ID Fiscal (RIF/NIT)</Label>
            <Input
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              placeholder="J-12345678-0"
              className="rounded-(--radius) border-(--border-color) bg-transparent text-(--text-main) focus-visible:ring-(--brand-primary)"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={manejarGuardado}
            className="w-full bg-(--brand-primary) hover:opacity-90 rounded-(--radius) text-white border-none h-11 transition-all"
          >
            Guardar Proveedor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
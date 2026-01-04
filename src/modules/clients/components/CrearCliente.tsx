"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

export function CrearCliente({ alGuardar }: { alGuardar: () => void }) {
  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [abierto, setAbierto] = useState(false);

  const manejarGuardado = async () => {
    const { error } = await supabase.from('clients').insert([{
      cli_name: nombre,
      cli_document_id: documento,
      cli_email: email
    }]);

    if (error) return toast.error(error.message);

    toast.success("Cliente registrado correctamente");
    alGuardar();
    setAbierto(false);
    setNombre(""); setDocumento(""); setEmail("");
  };

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>
        <Button className="bg-(--brand-primary) hover:opacity-90 rounded-(--radius) text-white border-none">
          Nuevo Cliente
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-(--bg-card) border-(--border-color) rounded-(--radius)">
        <DialogHeader>
          <DialogTitle className="text-(--text-main)">Registrar Cliente</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label className="text-(--text-main)">Nombre Completo</Label>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="rounded-(--radius) border-(--border-color) bg-transparent text-(--text-main) focus-visible:ring-(--brand-primary)"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-(--text-main)">Identificación (DNI/RUT)</Label>
            <Input
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              className="rounded-(--radius) border-(--border-color) bg-transparent text-(--text-main) focus-visible:ring-(--brand-primary)"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-(--text-main)">Correo Electrónico</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="rounded-(--radius) border-(--border-color) bg-transparent text-(--text-main) focus-visible:ring-(--brand-primary)"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={manejarGuardado}
            className="w-full bg-(--brand-primary) hover:opacity-90 rounded-(--radius) text-white border-none"
          >
            Guardar Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
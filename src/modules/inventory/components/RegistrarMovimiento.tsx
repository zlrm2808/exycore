"use client";

import { useState, useEffect } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function RegistrarMovimiento({ alCompletar }: { alCompletar: () => void }) {
  const [productos, setProductos] = useState<any[]>([]);
  const [prdId, setPrdId] = useState("");
  const [tipo, setTipo] = useState("IN");
  const [cantidad, setCantidad] = useState("");
  const [motivo, setMotivo] = useState("");
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    async function obtenerProductos() {
      const { data } = await supabase.from('products').select('prd_id, prd_name');
      if (data) setProductos(data);
    }
    obtenerProductos();
  }, []);

  const manejarMovimiento = async () => {
    const cantNum = parseInt(cantidad);
    if (!prdId || !cantNum || cantNum <= 0) return toast.error("Por favor ingresa datos válidos");

    try {
      // 1. Registrar la transacción
      const { error: errTrans } = await supabase.from('inventory_transactions').insert([{
        trns_prd_id: prdId,
        trns_type: tipo,
        trns_quantity: cantNum,
        trns_reason: motivo
      }]);

      if (errTrans) throw errTrans;

      // 2. Obtener Stock Actual
      const { data: stockActual } = await supabase
        .from('inventory_stock')
        .select('stk_quantity')
        .eq('stk_prd_id', prdId)
        .single();

      const nuevoStock = tipo === "IN"
        ? (stockActual?.stk_quantity || 0) + cantNum
        : (stockActual?.stk_quantity || 0) - cantNum;

      if (nuevoStock < 0) throw new Error("Operación inválida: Stock insuficiente");

      // 3. Actualizar tabla de Stock
      const { error: errStock } = await supabase
        .from('inventory_stock')
        .update({ stk_quantity: nuevoStock, stk_last_update: new Date() })
        .eq('stk_prd_id', prdId);

      if (errStock) throw errStock;

      toast.success(`Movimiento de ${tipo === 'IN' ? 'Entrada' : 'Salida'} procesado`);
      alCompletar();
      setAbierto(false);
      setCantidad(""); setMotivo("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-(--brand-primary) text-(--brand-primary) hover:bg-(--brand-primary)/10 rounded-(--radius) transition-colors">
          Registrar Movimiento
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-(--bg-card) border-(--border-color) rounded-(--radius)">
        <DialogHeader>
          <DialogTitle className="text-(--text-main)">Movimiento de Inventario</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label className="text-(--text-muted)">Producto</Label>
            <Select onValueChange={setPrdId}>
              <SelectTrigger className="rounded-(--radius) border-(--border-color) bg-transparent text-(--text-main)">
                <SelectValue placeholder="Selecciona producto" />
              </SelectTrigger>
              <SelectContent className="bg-(--bg-card) border-(--border-color) text-(--text-main)">
                {productos.map(p => (
                  <SelectItem key={p.prd_id} value={p.prd_id}>{p.prd_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-(--text-muted)">Tipo</Label>
              <Select onValueChange={setTipo} defaultValue="IN">
                <SelectTrigger className="rounded-(--radius) border-(--border-color) bg-transparent text-(--text-main)">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-(--bg-card) border-(--border-color) text-(--text-main)">
                  <SelectItem value="IN">Entrada (+)</SelectItem>
                  <SelectItem value="OUT">Salida (-)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label className="text-(--text-muted)">Cantidad</Label>
              <Input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="rounded-(--radius) border-(--border-color) bg-transparent text-(--text-main) focus-visible:ring-(--brand-primary)"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-(--text-muted)">Motivo / Referencia</Label>
            <Input
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ej: Ajuste por inventario inicial"
              className="rounded-(--radius) border-(--border-color) bg-transparent text-(--text-main) focus-visible:ring-(--brand-primary)"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={manejarMovimiento}
            className="w-full bg-(--brand-primary) hover:opacity-90 text-white rounded-(--radius) border-none h-11"
          >
            Confirmar Movimiento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
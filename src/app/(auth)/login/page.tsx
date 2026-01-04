"use client";

import { useState } from "react";
import { LoginForm } from "@/components/login-form";
import { ERP_ICONS } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function LoginPage() {
  const [paso, setPaso] = useState<"auth" | "tenant">("auth");

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-[var(--bg-card)]">

      {/* COLUMNA IZQUIERDA: IMAGEN */}
      <div className="relative hidden lg:block bg-[var(--bg-main)] border-r border-[var(--border-color)]">
        <img
          src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1974&auto=format&fit=crop"
          alt="Corporative Building"
          className="absolute inset-0 h-full w-full object-cover grayscale opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-16 text-[var(--text-main)]">
          <div className="max-w-md space-y-4">
            <h2 className="text-4xl font-light tracking-tight text-[var(--brand-primary)]">
              Bienvenido a <span className="font-bold text-[var(--text-main)]">ExyCore</span>
            </h2>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed border-l-4 border-[var(--brand-primary)] pl-4">
              Gestión inteligente para empresas modernas. Conecta tus datos, escala tu negocio.
            </p>
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA: FORMULARIO */}
      <div className="flex flex-col gap-4 p-8 md:p-12 bg-[var(--bg-card)]">
        {/* Logo superior derecho */}
        <div className="flex justify-center md:justify-end">
          <div className="flex items-center gap-2 font-medium text-[var(--text-main)]">
            <div className="bg-[var(--brand-primary)] text-white flex size-7 items-center justify-center rounded-[var(--radius)] shadow-sm">
              <ERP_ICONS.Dashboard size={18} stroke={2} />
            </div>
            <span className="text-sm font-bold tracking-tight uppercase">ExyCore Cloud</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[340px]">
            {paso === "auth" ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <LoginForm />
                <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
                  <p className="text-[11px] text-[var(--text-muted)]">
                    ¿No tienes una cuenta? <span className="text-[var(--brand-primary)] cursor-pointer hover:underline">Contacta con soporte</span>
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="mt-2 text-[10px] text-[var(--text-muted)] hover:bg-transparent"
                  onClick={() => setPaso("tenant")}
                >
                  [ DEV: Ir a Selección de Empresa ]
                </Button>
              </div>
            ) : (
              /* SELECCIÓN DE EMPRESA */
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-400">
                <div className="space-y-2">
                  <h1 className="text-2xl font-semibold text-[var(--text-main)]">Seleccionar cuenta</h1>
                  <p className="text-sm text-[var(--text-muted)]">
                    Haga clic en una organización para continuar al ERP.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label className="text-xs font-bold text-[var(--text-main)] uppercase">Organizaciones activas</Label>
                    <Select>
                      <SelectTrigger className="rounded-[var(--radius)] border-[var(--border-color)] h-11 focus:ring-1 focus:ring-[var(--brand-primary)] text-[var(--text-main)]">
                        <SelectValue placeholder="Seleccione una organización" />
                      </SelectTrigger>
                      <SelectContent className="rounded-[var(--radius)] bg-[var(--bg-card)] border-[var(--border-color)]">
                        <SelectItem value="providencia">Providencia S.A.</SelectItem>
                        <SelectItem value="exycore">ExyCore Distribuciones</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-[var(--brand-primary)] hover:opacity-90 rounded-[var(--radius)] h-11 font-normal text-white border-none">
                    Acceder ahora
                  </Button>

                  <div className="flex flex-col gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="rounded-[var(--radius)] border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--bg-main)] h-10"
                    >
                      Crear nueva empresa
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setPaso("auth")}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    >
                      Usar otra cuenta
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer legal */}
        <div className="flex justify-center md:justify-end gap-4">
          <span className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer">Términos de uso</span>
          <span className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer">Privacidad y cookies</span>
        </div>
      </div>
    </div>
  );
}
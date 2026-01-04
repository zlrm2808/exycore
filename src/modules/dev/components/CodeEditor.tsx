"use client";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

export function CodeEditor() {
  const [monacoTheme, setMonacoTheme] = useState("light");

  useEffect(() => {
    // Función para detectar si el tema actual del ERP es oscuro
    const actualizarTemaEditor = () => {
      const temaActivo = document.documentElement.getAttribute("data-theme") || "";
      const esOscuro = temaActivo.includes("dark") || temaActivo.includes("industrial");
      setMonacoTheme(esOscuro ? "vs-dark" : "light");
    };

    // 1. Ejecutar al montar
    actualizarTemaEditor();

    // 2. Escuchar cambios en los atributos del HTML (cuando cambias el tema en el Sidebar)
    const observer = new MutationObserver(actualizarTemaEditor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full border border-(--border-color) rounded-(--radius) overflow-hidden transition-all duration-300">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue={`// Bienvenido al SDK de Providencia ERP
// Aquí puedes definir la lógica de tu nuevo módulo

interface Modulo {
  id: string;
  nombre: string;
  version: string;
}

const nuevoModulo: Modulo = {
  id: 'ventas_pos',
  nombre: 'Punto de Venta',
  version: '1.0.0'
};

console.log("Módulo cargado:", nuevoModulo.nombre);`}
        theme={monacoTheme}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: "'Cascadia Code', Consolas, monospace",
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          readOnly: false,
          padding: { top: 16 },
          automaticLayout: true, // Importante para que se ajuste al redimensionar
        }}
      />
    </div>
  );
}
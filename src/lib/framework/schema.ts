// Este es el contrato que el desarrollador debe seguir en el editor
export interface ModuleManifest {
  id: string;
  version: string;
  author: string;
  ui: {
    displayName: string;
    icon: string; // Nombre del icono en ERP_ICONS
    category: "ventas" | "compras" | "inventario" | "rrhh" | "otros";
  };
  ribbon: {
    tabs: Array<{
      id: string;
      label: string;
      groups: Array<{
        id: string;
        label: string;
        actions: Array<{
          id: string;
          label: string;
          icon: string;
          size: "large" | "medium" | "small";
          task: string; // Nombre de la función a ejecutar
        }>;
      }>;
    }>;
  };
}
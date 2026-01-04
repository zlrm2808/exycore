import { ReactNode } from "react";

export interface ERPModule {
  id: string;
  name: string;
  icon: ReactNode;
  route: string;
  ribbonConfig: {
    tabs: {
      label: string;
      groups: {
        label: string;
        actions: any[];
      }[];
    }[];
  };
  component: React.ComponentType;
}

export const ModuleRegistry: Map<string, ERPModule> = new Map();

export function registerModule(module: ERPModule) {
  ModuleRegistry.set(module.id, module);
}
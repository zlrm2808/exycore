import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend: string;
}

export function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-all border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">
          {title}
        </CardTitle>
        <div className="h-8 w-8 bg-slate-100 rounded-md flex items-center justify-center text-slate-600">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-green-600 mt-1 font-semibold">
          {trend} <span className="text-slate-400 font-normal ml-1">vs mes anterior</span>
        </p>
      </CardContent>
    </Card>
  );
}
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("erp-theme", newTheme);
  };

  return (
    <div className="p-4 grid grid-cols-2 gap-2">
      <Button variant="outline" size="sm" onClick={() => changeTheme("light")}>MS Light</Button>
      <Button variant="outline" size="sm" onClick={() => changeTheme("ms-dark")}>MS Dark</Button>
      <Button variant="outline" size="sm" onClick={() => changeTheme("vibrant-light")}>Vibrant</Button>
      <Button variant="outline" size="sm" onClick={() => changeTheme("industrial-dark")}>Industrial</Button>
    </div>
  );
}
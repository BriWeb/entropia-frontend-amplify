import { ThemeColorToggle } from "./theme-color-toggle";
import { ThemeModeToggle } from "./theme-mode-toggle";
import { useAuth } from "@/app/context/AuthContext";
export default function NavBar() {
  const { usuario } = useAuth();
  return (
    <div className="flex-1 flex justify-between items-center p-4 w-full border-b border-gray-200 relative">
      <h1 className="text-xl font-bold">Panel de {usuario?.tipo_persona_descripcion}</h1>
      <div className="flex w-full justify-center rounded-md border p-2 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto">
        <ThemeColorToggle />
        <ThemeModeToggle />
      </div>
    </div>
  );
}

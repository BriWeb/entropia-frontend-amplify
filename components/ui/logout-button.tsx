// components/BotonLogout.tsx

"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("myToken");
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 p-2 w-full hover:bg-red-50 text-red-600 rounded-lg cursor-pointer"
    >
      <LogOut size={20} />
      <span>Cerrar Sesión</span>
    </button>
  );
}

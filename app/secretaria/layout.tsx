"use client";

import NavBar from "@/components/general/NavBar";
import {
  LayoutDashboard,
  UserCircle,
  Calendar,
  Clock,
  Users,
  Settings,
  Menu,
  X,
  CalendarArrowUp,
} from "lucide-react";
import LogoutButton from "@/components/ui/logout-button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";

export default function SecretariaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { usuario } = useAuth();
  // Valores predeterminados que funcionan tanto en servidor como cliente
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Este efecto se ejecuta solo una vez al cargar en el cliente
  useEffect(() => {
    setIsClient(true);

    const checkScreenSize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setIsSidebarOpen(!isMobileView);
    };

    // Verificar al cargar
    checkScreenSize();

    // Verificar al cambiar tamaño de ventana
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {isClient && (
          <aside
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } 
                                md:translate-x-0 w-64 bg-secondary shadow-lg transition-all duration-300 
                                fixed md:fixed top-0 left-0 h-screen z-50 overflow-y-auto pt-14`}
          >
            <div className="h-full flex flex-col bg-secondary">
              <div className="flex justify-between items-center p-4 border-b">
                {isMobile && (
                  <button onClick={toggleSidebar} className="md:hidden">
                    <X size={24} />
                  </button>
                )}
              </div>

              {/* Menú Principal */}
              <div className="flex-1 p-4 bg-sidebar">
                <nav className="space-y-2">
                  <Link
                    href="/secretaria/dashboard"
                    className="flex items-center gap-2 p-2 hover:text-accent hover:bg-primary rounded-lg"
                  >
                    <LayoutDashboard size={20} />
                    <span>Panel</span>
                  </Link>
                  <Link
                    href="/secretaria/perfil"
                    className="flex items-center gap-2 p-2 hover:text-accent hover:bg-primary rounded-lg"
                  >
                    <UserCircle size={20} />
                    <span>Perfil</span>
                  </Link>
                  <Link
                    href="/secretaria/agenda"
                    className="flex items-center gap-2 p-2 hover:text-accent hover:bg-primary rounded-lg"
                  >
                    <Calendar size={20} />
                    <span>Agenda</span>
                  </Link>
                  <Link
                    href="/secretaria/turnos"
                    className="flex items-center gap-2 p-2 hover:text-accent hover:bg-primary rounded-lg"
                  >
                    <Clock size={20} />
                    <span>Turnos</span>
                  </Link>
                  <Link
                    href="/secretaria/pacientes"
                    className="flex items-center gap-2 p-2 hover:text-accent hover:bg-primary rounded-lg"
                  >
                    <Users size={20} />
                    <span>Pacientes</span>
                  </Link>
                  <Link
                    href="/secretaria/solicitudes"
                    className="flex items-center gap-2 p-2 hover:text-accent hover:bg-primary rounded-lg"
                  >
                    <CalendarArrowUp size={20} />
                    <span>Solicitudes</span>
                  </Link>
                  <Link
                    href="/secretaria/configuracion"
                    className="flex items-center gap-2 p-2 hover:text-accent hover:bg-primary rounded-lg"
                  >
                    <Settings size={20} />
                    <span>Configuración</span>
                  </Link>
                </nav>
              </div>

              {/* Perfil y Logout */}
              <div className="p-4 border-t bg-secondary">
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <UserCircle
                      size={20}
                      className="text-gray-500 self-start mt-1"
                    />
                    <div>
                      <p className="font-medium">{usuario?.nombre}</p>
                      <p className="text-sm text-gray-500">
                        {usuario?.tipo_persona_descripcion}
                      </p>
                    </div>
                  </div>
                </div>
                <LogoutButton />
              </div>
            </div>
          </aside>
        )}

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col w-full md:ml-64">
          <div className="bg-secondary shadow-sm sticky top-0 z-40">
            <div className="flex items-center">
              {isClient && isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="p-4 focus:outline-none"
                >
                  <Menu size={24} />
                </button>
              )}
              <NavBar />
            </div>
          </div>
          <main className="bg-gray-100 flex-1 transition-all duration-300 relative">
            {isClient && isMobile && isSidebarOpen && (
              <div
                className="absolute inset-0 bg-gray-600 opacity-75 z-30"
                onClick={toggleSidebar}
              ></div>
            )}
            {children}
            {/*mi hijito contenido osea el home*/}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

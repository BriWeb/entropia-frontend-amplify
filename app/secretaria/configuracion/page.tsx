import {
  Settings,
  Bell,
  Shield,
  Users,
  Clock,
  Globe,
  HelpCircle,
} from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";

export default function ConfiguracionPage() {
  return (
    <AuthGuard>
      <div className="h-full bg-background mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Configuración</h1>
          <p className="text-gray-500">
            Personaliza y configura el sistema según tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Panel lateral de navegación */}
          <div className="md:col-span-1">
            <div className="bg-secondary rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-primary border-b">
                <h2 className="text-lg font-medium text-secondary">Ajustes</h2>
              </div>
              <nav className="p-2 bg-card">
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-gray-800 bg-gray-100 rounded-md"
                >
                  <Settings className="h-5 w-5" />
                  <span>General</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-primary-700 hover:bg-accent hover:text-primary rounded-md mt-1"
                >
                  <Bell className="h-5 w-5" />
                  <span>Notificaciones</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-primary-700 hover:bg-accent hover:text-primary rounded-md mt-1"
                >
                  <Shield className="h-5 w-5" />
                  <span>Seguridad</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-primary-700 hover:bg-accent hover:text-primary rounded-md mt-1"
                >
                  <Users className="h-5 w-5" />
                  <span>Usuarios</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-primary-700 hover:bg-accent hover:text-primary rounded-md mt-1"
                >
                  <Clock className="h-5 w-5" />
                  <span>Horarios</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-primary-700 hover:bg-accent hover:text-primary rounded-md mt-1"
                >
                  <Globe className="h-5 w-5" />
                  <span>Integración</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-primary-700 hover:bg-accent hover:text-primary rounded-md mt-1"
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>Ayuda</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="md:col-span-2">
            <div className="bg-secondary rounded-lg shadow-md p-6">
              <div className="border-b pb-5">
                <h3 className="text-lg font-medium">Configuración General</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Ajusta la configuración general del sistema
                </p>
              </div>

              <div className="py-5 space-y-6">
                <div>
                  <h4 className="text-sm font-medium">
                    Información de la clínica
                  </h4>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-4">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="nombre-clinica"
                        className="block text-sm font-medium text-primary-700"
                      >
                        Nombre de la clínica
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="nombre-clinica"
                          id="nombre-clinica"
                          defaultValue="Clínica Ejemplo"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="telefono"
                        className="block text-sm font-medium text-primary-700"
                      >
                        Teléfono
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="telefono"
                          id="telefono"
                          defaultValue="(123) 456-7890"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="direccion"
                        className="block text-sm font-medium text-primary-700"
                      >
                        Dirección
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="direccion"
                          id="direccion"
                          defaultValue="Calle Principal 123, Ciudad, País"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-primary-700"
                      >
                        Email de contacto
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          defaultValue="contacto@clinicaejemplo.com"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-primary bg-secondary border border-gray-300 rounded-md shadow-sm hover:bg-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="ml-3 px-4 py-2 text-sm font-medium text-secondary bg-primary border border-transparent rounded-md shadow-sm hover:bg-background hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mensaje informativo */}
            <div className="mt-6 bg-secondary border border-gray-200 rounded-lg p-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium">
                    Información importante
                  </h3>
                  <div className="mt-2 text-sm">
                    <p>
                      Esta es la sección de configuración del sistema. Aquí
                      podrás personalizar la apariencia, configurar
                      notificaciones, gestionar usuarios y más. Navega por las
                      diferentes opciones del menú lateral para acceder a todas
                      las configuraciones disponibles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

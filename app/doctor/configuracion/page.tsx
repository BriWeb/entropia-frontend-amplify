import { Settings, Clock, HelpCircle } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";

export default function ConfiguracionDoctor() {
  return (
    <AuthGuard>
      <div className="h-full bg-background mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Configuración</h1>
          <p className="text-gray-500">Personaliza tu horario de consultas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <Clock className="h-5 w-5" />
                  <span>Horarios de consulta</span>
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

          <div className="md:col-span-2">
            <div className="bg-secondary rounded-lg shadow-md p-6">
              <div className="border-b pb-5">
                <h3 className="text-lg font-medium">Configuración General</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Configura tus días de consulta
                </p>
              </div>

              <div className="py-5 space-y-6">
                <div>
                  <h4 className="text-sm font-medium">
                    Días de consulta
                  </h4>
                  <div className="mt-4">
                    <div className="mt-2 grid grid-cols-7 gap-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="lunes"
                          className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-500"
                          defaultChecked
                        />
                        <label
                          htmlFor="lunes"
                          className="ml-2 text-sm text-primary-700"
                        >
                          Lun
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="martes"
                          className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-500"
                        />
                        <label
                          htmlFor="martes"
                          className="ml-2 text-sm text-primary-700"
                        >
                          Mar
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="miercoles"
                          className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-500"
                          defaultChecked
                        />
                        <label
                          htmlFor="miercoles"
                          className="ml-2 text-sm text-primary-700"
                        >
                          Mié
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="jueves"
                          className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-500"
                        />
                        <label
                          htmlFor="jueves"
                          className="ml-2 text-sm text-primary-700"
                        >
                          Jue
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="viernes"
                          className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-500"
                          defaultChecked
                        />
                        <label
                          htmlFor="viernes"
                          className="ml-2 text-sm text-primary-700"
                        >
                          Vie
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="sabado"
                          className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-500"
                        />
                        <label
                          htmlFor="sabado"
                          className="ml-2 text-sm text-primary-700"
                        >
                          Sáb
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="domingo"
                          className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-500"
                        />
                        <label
                          htmlFor="domingo"
                          className="ml-2 text-sm text-primary-700"
                        >
                          Dom
                        </label>
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
                      className="ml-3 px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
                      Los días seleccionados son los que aparecerán disponibles
                      para que los pacientes reserven turnos. Asegúrese de
                      seleccionar solo los días en que estará disponible.
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

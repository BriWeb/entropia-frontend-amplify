import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UserCircle,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Edit,
} from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";

export default function Perfil() {
  return (
    <AuthGuard>
      <div className="h-full bg-secondary p-8 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold">Perfil de usuario</h1>
          <p className="text-sm text-gray-500">
            Gestiona tu información personal y preferencias
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">
          {/* Columna de información principal */}
          <div className="md:col-span-1">
            <Card className="text-center">
              <CardHeader className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <UserCircle size={64} className="text-gray-500" />
                </div>
                <CardTitle>María González</CardTitle>
                <p className="text-sm text-gray-500">Recepcionista</p>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full mt-4">
                  <Edit size={16} className="mr-2" />
                  Cambiar foto
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">
                  Información de contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Mail size={18} className="mr-2 text-gray-500" />
                  <span>maria.gonzalez@clinica.com</span>
                </div>
                <div className="flex items-center">
                  <Phone size={18} className="mr-2 text-gray-500" />
                  <span>+54 11 5555-1234</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="mr-2 text-gray-500" />
                  <span>Av. Corrientes 1234, Buenos Aires</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna de detalles */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Datos personales</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-sm text-gray-500 block mb-1"
                        htmlFor="nombre"
                      >
                        Nombre
                      </label>
                      <Input type="text" id="nombre" value="María" disabled />
                    </div>
                    <div>
                      <label
                        className="text-sm text-gray-500 block mb-1"
                        htmlFor="apellido"
                      >
                        Apellido
                      </label>
                      <Input
                        type="text"
                        id="apellido"
                        value="González"
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm text-gray-500 block mb-1"
                        htmlFor="documento"
                      >
                        Documento
                      </label>
                      <Input
                        type="text"
                        id="documento"
                        value="34.567.890"
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm text-gray-500 block mb-1"
                        htmlFor="nacimiento"
                      >
                        Fecha de nacimiento
                      </label>
                      <Input
                        type="text"
                        id="nacimiento"
                        value="15/06/1988"
                        disabled
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="mt-2">
                    <Edit size={16} className="mr-2" />
                    Editar información
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Horario laboral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 border rounded-md">
                    <Calendar size={20} className="mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Días</p>
                      <p>Lunes a Viernes</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 border rounded-md">
                    <Clock size={20} className="mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Horario</p>
                      <p>8:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader>
                  <p className="text-sm text-gray-500">
                    Turnos gestionados (mes)
                  </p>
                  <CardTitle>
                    <p className="text-2xl font-bold">145</p>
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <p className="text-sm text-gray-500">Pacientes registrados</p>
                  <CardTitle>
                    <p className="text-2xl font-bold">38</p>
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <p className="text-sm text-gray-500">Antigüedad</p>
                  <CardTitle>
                    <p className="text-2xl font-bold">2 años</p>
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

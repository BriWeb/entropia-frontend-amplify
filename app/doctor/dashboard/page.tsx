"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-custom";
import { useAuth } from "@/app/context/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";

export default function DashboardDoctor() {
  const { usuario } = useAuth();
  // turnos de ejemplo, despues se agrega de la base de datos
  const turnosHoy = [
    {
      id: 1,
      hora: "09:00",
      paciente: "Juan Pérez",
      estado: "Pendiente",
      notas: "Control mensual",
    },
    {
      id: 2,
      hora: "10:30",
      paciente: "María García",
      estado: "En sala",
      notas: "Primera consulta",
    },
    {
      id: 3,
      hora: "11:45",
      paciente: "Carlos López",
      estado: "Atendido",
      notas: "Seguimiento post-operatorio",
    },
    {
      id: 4,
      hora: "14:15",
      paciente: "Ana Martínez",
      estado: "Cancelado",
      notas: "-",
    },
  ];

  // turnos de ejemplo, despues se agrega de la base de datos
  const proximosTurnos = [
    {
      id: 5,
      fecha: "16/05/2023",
      hora: "09:15",
      paciente: "Pedro Ramírez",
      notas: "Control rutinario",
    },
    {
      id: 6,
      fecha: "16/05/2023",
      hora: "11:30",
      paciente: "Lucía Sánchez",
      notas: "Control de medicación",
    },
    {
      id: 7,
      fecha: "17/05/2023",
      hora: "10:00",
      paciente: "Roberto González",
      notas: "Revisión de estudios",
    },
    {
      id: 8,
      fecha: "17/05/2023",
      hora: "15:45",
      paciente: "Sofia Torres",
      notas: "Primera consulta",
    },
  ];

  // esta funcion me sirve para elegir el color segun el estado del turno
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-gray-100 text-gray-800";
      case "En sala":
        return "bg-gray-200 text-gray-800";
      case "Atendido":
        return "bg-gray-300 text-gray-800";
      case "Cancelado":
        return "bg-gray-100 text-gray-500";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AuthGuard>
      <>
        <div className="h-full p-8 sm:px-6 lg:px-8 bg-secondary">
          <div>
            <h1 className="text-2xl font-bold">Bienvenido {usuario?.nombre}</h1>
            <p className="text-sm text-gray-500">
              Panel de gestión de turnos y pacientes
            </p>
          </div>

          {/* aca van las 4 card con numeros que se ven arriba */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7 mb-6">
            <Card>
              <CardHeader>
                <h1 className="text-sm text-gray-500">Turnos de Hoy</h1>
                <CardTitle>
                  <p className="text-2xl font-bold">4</p>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <h1 className="text-sm text-gray-500">Pacientes Atendidos</h1>
                <CardTitle>
                  <p className="text-2xl font-bold">1</p>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <h1 className="text-sm text-gray-500">Turnos Programados</h1>
                <CardTitle>
                  <p className="text-2xl font-bold">8</p>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <h1 className="text-sm text-gray-500">Completados Hoy</h1>
                <CardTitle>
                  <p className="text-2xl font-bold">1</p>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Acá está la tabla con los turnos de hoy */}
          <div className="bg-card rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Turnos de Hoy</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                {/* Estas son las columnas de la tabla */}
                <thead className="bg-foreground">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                    >
                      Hora
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                    >
                      Paciente
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                    >
                      Notas
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                {/* Acá mapeo todos los turnos y los muestro en filas */}
                <tbody className="bg-secondary divide-y divide-gray-200">
                  {turnosHoy.map((turno) => (
                    <tr key={turno.id} className="bg-card hover:bg-accent">
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        {turno.hora}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                        {turno.paciente}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        {turno.notas}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(
                            turno.estado
                          )}`}
                        >
                          {turno.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button variant="outline" size="sm" className="mr-2">
                          Ver
                        </Button>
                        {/* Este botón solo aparece en los turnos que no están atendidos o cancelados */}
                        {turno.estado !== "Atendido" &&
                          turno.estado !== "Cancelado" && (
                            <Button variant="outline" size="sm">
                              Atender
                            </Button>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Acá está la tabla con los turnos programados para próximos días */}
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Próximos Turnos</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-foreground">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                    >
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                    >
                      Hora
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                    >
                      Paciente
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                    >
                      Notas
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-secondary divide-y divide-gray-200">
                  {proximosTurnos.map((turno) => (
                    <tr key={turno.id} className="bg-card hover:bg-accent">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {turno.fecha}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {turno.hora}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {turno.paciente}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {turno.notas}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button variant="outline" size="sm" className="mr-2">
                          Ver ficha
                        </Button>
                        <Button variant="outline" size="sm">
                          Reprogramar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </AuthGuard>
  );
}

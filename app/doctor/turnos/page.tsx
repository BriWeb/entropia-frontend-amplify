"use client";

import { Search, Calendar, Clock } from "lucide-react";
import { Turno } from "@/types/turno";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import PaginationButton from "@/components/ui/paginationButton";
import { useEffect, useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useFetchCallback } from "@/hooks/useFetchCallback";

export default function TurnosDoctor() {
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  interface MedicoTurnoResponse {
    count: number;
    rows: Turno[];
  }

  // Type guard para asegurar que dataTurno tiene la estructura esperada
  const isMedicoTurnoResponse = (obj: unknown): obj is MedicoTurnoResponse => {
    return !!obj && typeof obj === "object" && "count" in obj && "rows" in obj;
  };

  const {
    loading: loadingTurno,
    data: dataTurno,
    error: errorTurno,
    fetchNow,
  } = useFetchCallback<MedicoTurnoResponse>();

  const turnoCount = isMedicoTurnoResponse(dataTurno) ? dataTurno.count : 0;
  const turnosRows = isMedicoTurnoResponse(dataTurno) ? dataTurno.rows : [];

  interface MedicoResponse {
    id: number;
  }

  const usuarioStr = localStorage.getItem("usuario");
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
  const persona_id = usuario?.persona_id;

  const { data: dataIdMedico } = useFetch<MedicoResponse>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/medico/id?persona_id=${persona_id}`,
    requiredAuth: true,
  });

  useEffect(() => {
    if (!dataIdMedico?.id) return;
    const token = localStorage.getItem("myToken");
    fetchNow({
      url: `${process.env.NEXT_PUBLIC_API_URL}/turno/medico?limit=${limit}&offset=${offset}&medico_id=${dataIdMedico.id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataIdMedico, offset]);

  useEffect(() => {
    if (dataTurno) {
      // console.log("Turnos obtenidos: ", dataTurno);
      setTotalPages(Math.ceil(dataTurno.count / limit));
      setCurrentPage(Math.floor(offset / limit) + 1);
    }
  }, [dataTurno, offset]);

  // funcion para obtener color segun el estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-gray-100 text-gray-800";
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
      <div className="h-full bg-secondary mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Mis Turnos</h1>
          <p className="text-gray-500">
            Gestiona tus turnos y consultas programadas
          </p>
        </div>

        {/* filtros y acciones */}
        <div className="bg-secondary rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre de paciente..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-secondary text-primary-700 hover:bg-gray-50">
                <Calendar className="h-4 w-4" />
                <span>Fecha</span>
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-secondary text-primary-700 hover:bg-gray-50">
                <Clock className="h-4 w-4" />
                <span>Horario</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <span className="text-sm text-gray-500">
                Mostrando {turnoCount} turnos programados
              </span>
            </div>
          </div>
        </div>

        {/* Tabla de turnos */}
        {turnoCount > 0 && (
          <>
            <div className="bg-secondary rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-background">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Hora
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Paciente
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Doctor
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Especialidad
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-gray-200">
                    {turnosRows.map((turno) => (
                      <tr key={turno.id} className="hover:bg-accent">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {turno.fecha}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {turno.horario}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {`${turno.nombre_paciente}  ${turno.apellido_paciente}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {`${turno.nombre_medico}  ${turno.apellido_medico}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {turno.especialista_en}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(
                              turno.estado_turno
                            )}`}
                          >
                            {turno.estado_turno}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-secondary bg-primary p-2 mr-4 rounded-xl border-solid border-2 border-accent hover:border-foreground">
                            Editar
                          </button>
                          <button className="text-secondary bg-primary p-2 rounded-xl border-solid border-2 border-accent hover:border-foreground">
                            Cancelar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Paginación */}
            <div className="bg-secondary border-t border-gray-200 px-4 py-3 sm:px-6 mt-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-primary-700">
                      Mostrando{" "}
                      <span className="font-medium">{offset + 1}</span> a{" "}
                      <span className="font-medium">
                        {Math.min(offset + limit, turnoCount)}
                      </span>{" "}
                      de <span className="font-medium">{turnoCount}</span>{" "}
                      resultados
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          setOffset((prev) => Math.max(prev - limit, 0))
                        }
                        disabled={offset === 0}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-secondary text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Anterior</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {Array.from({ length: totalPages }).map((_, i) => {
                        const page = i + 1;
                        return (
                          <PaginationButton
                            key={page}
                            pageNumber={page}
                            isActive={page === currentPage}
                            onClick={() => setOffset((page - 1) * limit)}
                          />
                        );
                      })}
                      <button
                        onClick={() =>
                          setOffset((prev) =>
                            Math.min(prev + limit, (totalPages - 1) * limit)
                          )
                        }
                        disabled={offset + limit >= turnoCount}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-secondary text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Siguiente</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {loadingTurno && <Loading />}
        {errorTurno && <Error error={errorTurno} />}
      </div>
    </AuthGuard>
  );
}

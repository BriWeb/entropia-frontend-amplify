"use client";

import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import PaginationButton from "@/components/ui/paginationButton";
import { useEffect, useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { Solicitud } from "@/types/solicitud";

export default function SolicitudesPage() {
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  interface AllSolicitudesResponse {
    count: number;
    rows: Solicitud[];
  }

  const {
    loading: loadingTurno,
    data: dataTurno,
    error: errorTurno,
  } = useFetch<AllSolicitudesResponse>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/solicitud`,
    requiredAuth: true, // indica que debe incluir a el usuario actual en los encabezados para autorizar
  });

  useEffect(() => {
    if (dataTurno) {
      // console.log("Turnos obtenidos: ", dataTurno);
      setTotalPages(Math.ceil(dataTurno.count / limit));
      setCurrentPage(Math.floor(offset / limit) + 1);
    }
  }, [dataTurno, offset]);

  return (
    <AuthGuard>
      <div className="bg-secondary mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Solicitudes de turno</h1>
          <p className="text-gray-500">
            Visualiza las solicitudes entrantes para turnos medicos
          </p>
        </div>

        {/* Tabla de solicitudes */}
        {dataTurno && dataTurno.count && (
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
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Apellido
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Documento
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Especialidad
                      </th>
                      {/* <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                      >
                        Acciones
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-gray-200">
                    {dataTurno.rows.map((turno) => (
                      <tr key={turno.id} className="hover:bg-accent ">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {turno.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {turno.nombre_solicitud}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {`${turno.apellido_solicitud}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {`${turno.documento_solicitud}`}
                        </td>
                        <td className="px-1 py-4 text-sm">
                          {`${turno.email_solicitud}`}
                        </td>
                        <td className="py-2 flex justify-center  h-full ">
                          <div className=" px-2 py-2 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">

                          {turno.especialidad}
                          </div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-secondary bg-primary p-2 mr-4 rounded-xl border-solid border-2 border-accent hover:border-foreground">
                            Editar
                          </button>
                          <button className="text-secondary bg-primary p-2 rounded-xl border-solid border-2 border-accent hover:border-foreground">
                            Cancelar
                          </button>
                        </td> */}
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
                        {Math.min(offset + limit, dataTurno.count)}
                      </span>{" "}
                      de <span className="font-medium">{dataTurno.count}</span>{" "}
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
                        disabled={offset + limit >= dataTurno.count}
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

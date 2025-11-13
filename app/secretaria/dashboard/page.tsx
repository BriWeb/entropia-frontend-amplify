"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useFetch } from "@/hooks/useFetch";
// Traemos el contexto donde se guarda el usuario
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import ModalNuevoTurno from "@/components/ui/ModalNuevoTurno";
import { useFetchCallback } from "@/hooks/useFetchCallback";
import { TurnoSeleccionado } from "@/types/turnoseleccionado";
import { Especialidad } from "@/types/especialidad";
import { Horario } from "@/types/horario";

export default function DashboardSecretaria() {
  // extraemos el usuario
  const { usuario } = useAuth();
  const [horarioId, setHorarioId] = useState<number | null>(null);
  const [especialidadId, setEspecialidadId] = useState<number | null>(null);
  const { loading, data, error, fetchNow } = useFetchCallback();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccionado] =
    useState<TurnoSeleccionado | null>(null);

  const errorMessage = error
    ? error instanceof Error
      ? (error as Error).message
      : String(error)
    : null;

  useEffect(() => {
    // Si guardó el turno, cerramos el modal
    if (data) {
      setModalAbierto(false);
    }
  }, [data]);

  const handleTurnoClick = (turno: Turno) => {
    console.log(turno);
    const datos: TurnoSeleccionado = {
      fecha: String(turno.fecha),
      horario: turno.horario,
      horario_id: String(turno.horario_id),
      medico: turno.nombre + " " + turno.apellido,
      medico_id: String(turno.medico_id),
    };
    setTurnoSeleccionado(datos); // 1. Guarda los datos
    setModalAbierto(true); // 2. Abre el modal
  };

  interface Turno {
    medico_id: number;
    especialidad_id: number;
    especialidad: string;
    nombre: string;
    apellido: string;
    horario: string;
    horario_id: number;
    fecha: Date;
  }

  interface HorariosPorProfesional {
    [id: string]: Turno[];
  }

  const queryParams = new URLSearchParams();

  if (horarioId) queryParams.append("horario_id", horarioId.toString());
  if (especialidadId)
    queryParams.append("especialidad_id", especialidadId.toString());

  const {
    loading: loadingToday,
    data: dataToday,
    error: errorToday,
  } = useFetch<HorariosPorProfesional>({
    url: `${
      process.env.NEXT_PUBLIC_API_URL
    }/medico/today?${queryParams.toString()}`,
    requiredAuth: true,
  });

  const {
    loading: loadingEspecialidades,
    data: dataEspecialidades,
    error: errorEspecialidades,
  } = useFetch<Especialidad[]>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/medico/especialidades`,
    requiredAuth: true,
  });

  const {
    loading: loadingHorarios,
    data: dataHorarios,
    error: errorHorarios,
  } = useFetch<Horario[]>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/turno/horarios`,
    requiredAuth: true,
  });

  const handleGuardarTurno = (nuevoTurno: {
    fecha: string | null;
    horario_id: string | null;
    paciente_id: string | null;
    medico_id: string | null;
    recepcion_id: string | null;
  }) => {
    const token = localStorage.getItem("myToken");
    fetchNow({
      url: `${process.env.NEXT_PUBLIC_API_URL}/turno/add`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: {
        fecha: nuevoTurno.fecha,
        horario_id: nuevoTurno.horario_id,
        paciente_id: nuevoTurno.paciente_id,
        medico_id: nuevoTurno.medico_id,
        recepcion_id: nuevoTurno.recepcion_id,
      },
    });
  };

  return (
    <AuthGuard>
      <>
        <div className="p-8 sm:px-6 lg:px-8 bg-secondary">
          <div>
            <h1 className="text-2xl font-bold">
              Bienvenido/a {usuario?.nombre}{" "}
            </h1>
            <p className="text-sm text-gray-500">
              Gestiona turnos y registros de pacientes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7 mb-6">
            <Card>
              <CardHeader>
                <h1 className="text-sm text-gray-500">Turnos de Hoy</h1>
                <CardTitle>
                  <p className="text-2xl font-bold">2</p>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <h1 className="text-sm text-gray-500">Total de Pacientes</h1>
                <CardTitle>
                  <p className="text-2xl font-bold">4</p>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <h1 className="text-sm text-gray-500">Programados Hoy</h1>
                <CardTitle>
                  <p className="text-2xl font-bold">2</p>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <h1 className="text-sm text-gray-500">
                  Pacientes Nuevos(Semana)
                </h1>
                <CardTitle>
                  <p className="text-2xl font-bold">3</p>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="w-full  rounded-md ">
                <label className="text-md  text-gray-500" htmlFor="nombre">
                  Especialidad
                </label>
                {loadingEspecialidades && <Loading />}
                {errorEspecialidades && <Error error={errorEspecialidades} />}
                <select
                  className="w-full border border-gray-300 rounded-md p-2 bg-secondary"
                  name="especialidad"
                  id="especialidad"
                  onChange={(e) => {
                    const selected = parseInt(e.target.value);
                    setEspecialidadId(isNaN(selected) ? null : selected);
                  }}
                >
                  <option value="">Todos</option>{" "}
                  {/* Opción para limpiar filtro */}
                  {dataEspecialidades &&
                    dataEspecialidades.map((e) => {
                      return (
                        <option value={e.id} key={e.id}>
                          {e.descripcion}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="w-full  rounded-md ">
                <label className="text-md  text-gray-500" htmlFor="horario">
                  Horario
                </label>
                {loadingHorarios && <Loading />}
                {errorHorarios && <Error error={errorHorarios} />}
                <select
                  className="w-full border border-gray-300 rounded-md p-2 bg-secondary"
                  name="horario"
                  id="horario"
                  onChange={(e) => {
                    const selected = parseInt(e.target.value);
                    setHorarioId(isNaN(selected) ? null : selected);
                  }}
                >
                  <option value="">Todos</option>{" "}
                  {/* Opción para limpiar filtro */}
                  {dataHorarios &&
                    dataHorarios.map((e) => {
                      return (
                        <option value={e.id} key={e.id}>
                          {e.horario}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            {loadingToday && <Loading />}
            {errorToday && <Error error={errorToday} />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              {dataToday &&
                Object.entries(dataToday).map(([id, turnos]) => {
                  const medico = turnos[0];
                  // {
                  //   console.log(medico);
                  // }
                  return (
                    <div
                      key={id}
                      className="p-6 flex flex-col bg-card rounded-lg shadow-md"
                    >
                      <div className="flex flex-row items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserCircle size={24} className="text-gray-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">
                            Dr. {medico.nombre} {medico.apellido}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Especialidad: {medico.especialidad}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4 flex-grow mt-4">
                        <h4 className="font-medium">Horarios disponibles</h4>
                        <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-2">
                          {turnos.map((turno, index) => {
                            // {
                            //   console.log(turno);
                            // }
                            return (
                              <Button
                                onClick={() => handleTurnoClick(turno)}
                                key={`${id}-${index}`}
                                variant="outline"
                                className="bg-secondary hover:bg-gray-100 cursor-pointer"
                              >
                                {turno.horario}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </>
      {modalAbierto && (
        <ModalNuevoTurno
          isOpen={modalAbierto}
          onClose={() => setModalAbierto(false)}
          onSave={handleGuardarTurno}
          loading={loading}
          error={errorMessage}
          turnoSeleccionado={turnoSeleccionado}
        />
      )}
    </AuthGuard>
  );
}

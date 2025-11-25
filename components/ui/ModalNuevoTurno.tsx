"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label-custom";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TurnoSeleccionado } from "@/types/turnoseleccionado";
import { useFetch } from "@/hooks/useFetch";
import { Horario } from "@/types/horario";
import { Medico } from "@/types/medico";
import { useFetchCallback } from "@/hooks/useFetchCallback";
import MiniLoading from "./mini-loading";

interface ModalNuevoTurnoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (turno: {
    fecha: string | null;
    horario_id: string | null;
    paciente_id: string | null;
    medico_id: string | null;
    recepcion_id: string | null;
  }) => void;
  loading: boolean;
  error: string | null;
  turnoSeleccionado?: TurnoSeleccionado | null;
}

export default function ModalNuevoTurno({
  isOpen,
  onClose,
  onSave,
  loading,
  error,
  turnoSeleccionado,
}: ModalNuevoTurnoProps) {
  const [fecha, setFecha] = useState("");
  // const [horario, setHorario] = useState("");
  const [horarioId, setHorarioId] = useState("");
  const [pacienteDocumento, setPacienteDocumento] = useState("");
  const [pacienteId, setPacienteId] = useState("");
  const [canChoice, setCanChoice] = useState(true);
  const [medicoId, setMedicoId] = useState("");
  const [recepcionId, setRecepcionId] = useState("");

  interface Paciente {
    paciente_id: number;
    nombre: string;
    apellido: string;
  }

  interface PacienteResponse {
    rows: Paciente[];
  }

  const {
    loading: loadingPaciente,
    data: dataPaciente,
    error: errorPaciente,
    fetchNow,
  } = useFetchCallback<PacienteResponse>();

  const errorMessage = errorPaciente
    ? errorPaciente instanceof Error
      ? (errorPaciente as Error).message
      : String(errorPaciente)
    : null;

  useEffect(() => {
    if (!pacienteDocumento) return; // si está vacío, no hace nada

    const token = localStorage.getItem("myToken");

    const timeout = setTimeout(() => {
      fetchNow({
        url: `${process.env.NEXT_PUBLIC_API_URL}/paciente?documento=${pacienteDocumento}`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }, 1000);

    // limpiar el timeout si se sigue escribiendo
    return () => clearTimeout(timeout);
  }, [pacienteDocumento, fetchNow]);

  const { data: dataHorario, loading: loadingHorario } = useFetch<Horario[]>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/turno/horarios`,
    requiredAuth: true,
  });

  interface RecepcionistaResponse {
    id: number;
  }

  const usuarioStr = localStorage.getItem("usuario");
  const { persona_id } = usuarioStr ? JSON.parse(usuarioStr) : null;

  const { data: dataIdRecepcion } = useFetch<RecepcionistaResponse>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/recepcionista?persona_id=${persona_id}`,
    requiredAuth: true,
  });

  useEffect(() => {
    if (isOpen && dataIdRecepcion) {
      setRecepcionId(dataIdRecepcion.id.toString());
    }
  }, [isOpen, dataIdRecepcion]);

  useEffect(() => {
    if (isOpen && dataHorario) {
      console.log("Horario es: ", dataHorario);
    }
  }, [isOpen, dataHorario]);

  interface MedicoResponse {
    count: number;
    rows: Medico[];
  }

  const { data: dataMedico, loading: loadingMedico } = useFetch<MedicoResponse>(
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/medico?all=true`,
      requiredAuth: true,
    }
  );

  useEffect(() => {
    if (isOpen && turnoSeleccionado && dataHorario && dataMedico) {
      console.log("El turno es: ", turnoSeleccionado);
      setFecha(turnoSeleccionado.fecha.split("T")[0]);
      // setHorario(turnoSeleccionado.horario.toString());
      setHorarioId(turnoSeleccionado.horario_id.toString());
      setMedicoId(turnoSeleccionado.medico_id.toString());
      setCanChoice(false);
    }
  }, [isOpen, turnoSeleccionado, dataHorario, dataMedico]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      fecha,
      horario_id: horarioId,
      paciente_id: pacienteId,
      medico_id: medicoId,
      recepcion_id: recepcionId,
    });
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Nuevo turno</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fecha">Fecha</Label>
            <Input
              id="fecha"
              type="date"
              value={fecha}
              disabled={!canChoice}
              onChange={(e) => setFecha(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // desde hoy
              required
            />
          </div>
          <div>
            <Label htmlFor="horario">Horario</Label>
            <Select
              // value={horario}
              // onValueChange={setHorario}
              value={horarioId}
              onValueChange={setHorarioId}
              disabled={!dataHorario || !canChoice}
            >
              <SelectTrigger id="horario" className="w-full relative z-10">
                <SelectValue placeholder="Seleccionar horario" />
                {loadingHorario && <MiniLoading absolute={true} />}
              </SelectTrigger>
              <SelectContent>
                {dataHorario?.map((h) => (
                  <SelectItem key={h.id} value={`${h.id}`}>
                    {h.horario}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="pacienteDocumento">Documento paciente</Label>
            <Input
              id="pacienteDocumento"
              type="text"
              placeholder="Documento del paciente"
              value={pacienteDocumento}
              onChange={(e) => {
                const valorNumerico = e.target.value.replace(/\D/g, "");
                setPacienteDocumento(valorNumerico);
              }}
              maxLength={9}
              required
            />
          </div>

          <div>
            {errorMessage && <Error error={errorMessage} />}
            {loadingPaciente && <MiniLoading />}
            {dataPaciente && (
              <Select value={pacienteId} onValueChange={setPacienteId}>
                <SelectTrigger id="paciente_id" className="w-full">
                  <SelectValue placeholder="Personas encontradas" />
                </SelectTrigger>
                <SelectContent>
                  {dataPaciente.rows.map((p) => {
                    // console.log(p);
                    return (
                      <SelectItem
                        key={p.paciente_id}
                        value={`${p.paciente_id}`}
                      >
                        {p.nombre} {p.apellido}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          </div>

          <div>
            <Label htmlFor="medico">Médico</Label>
            <Select
              value={medicoId}
              onValueChange={setMedicoId}
              disabled={!dataMedico || !canChoice}
            >
              <SelectTrigger id="medico" className="w-full relative z-10">
                <SelectValue placeholder="Seleccionar médico" />
                {loadingMedico && <MiniLoading absolute={true} />}
              </SelectTrigger>
              <SelectContent>
                {dataMedico?.rows.map((m) => {
                  // console.log(m);
                  return (
                    <SelectItem key={m.medico_id} value={`${m.medico_id}`}>
                      {m.nombre} {m.apellido}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
            >
              Cancelar
            </Button>
            <Button type="submit" className="cursor-pointer">
              Guardar
            </Button>
          </div>
        </form>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </div>
    </div>
  );
}

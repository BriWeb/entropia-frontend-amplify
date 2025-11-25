"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label-custom";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";

interface ModalNuevoPacienteProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (paciente: {
    nombre: string;
    apellido: string;
    documento: string;
    obra_social: boolean;
  }) => void;
  loading: boolean;
  error: string | null;
}

export default function ModalNuevoPaciente({
  isOpen,
  onClose,
  onSave,
  loading,
  error,
}: ModalNuevoPacienteProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [obra_social, setObraSocial] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ nombre, apellido, documento, obra_social });
    // onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Nuevo paciente</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => {
                const soloLetras = e.target.value.replace(/[^a-zA-Z\s]+/g, "");
                setNombre(soloLetras);
              }}
              maxLength={20}
              required
            />
          </div>

          <div>
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              id="apellido"
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => {
                const soloLetras = e.target.value.replace(/[^a-zA-Z\s]+/g, "");
                setApellido(soloLetras);
              }}
              maxLength={20}
              required
            />
          </div>

          <div>
            <Label htmlFor="documento">Documento</Label>
            <Input
              id="documento"
              type="text"
              placeholder="Número de documento"
              value={documento}
              onChange={(e) => {
                const valorNumerico = e.target.value.replace(/\D/g, "");
                setDocumento(valorNumerico);
              }}
              maxLength={9}
              required
            />
          </div>

          <div>
            <Label htmlFor="obra_social">Obra Social</Label>
            <Input
              id="obra_social"
              type="checkbox"
              placeholder="Nombre del médico"
              checked={obra_social}
              onChange={(e) => setObraSocial(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 cursor-pointer"
            />
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

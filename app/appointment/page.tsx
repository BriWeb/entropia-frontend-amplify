"use client"; // pára q ue Next.js sepa que el codigo se ejecuta en el navegador y no en el servidor

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";

import { useFetchCallback } from "@/hooks/useFetchCallback";
import { ThemeModeToggle } from "@/components/general/theme-mode-toggle";
import { ThemeColorToggle } from "@/components/general/theme-color-toggle";
import { useAuth } from "@/app/context/AuthContext";
import { Usuario } from "@/types/usuario";
import { CalendarCheck, Stethoscope, User } from "lucide-react";

  interface AppointmentResponse {
    token: string;
    usuario: Usuario;
  }


export default function LoginPage() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    specialty: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const specialties = [
    {value: '', label: 'Selecciona una Especialidad'},
    { value: "cardiologia", label: "Cardiologia" },
    { value: "dermatologia", label: "Dermatologia" },
    { value: "oftalmologia", label: "Oftalmologia" },
    { value: "odontologia", label: "Odontologia" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  // const { loading, data, error, fetchNow } = useFetchCallback<LoginResponse>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData( prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

 const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  console.log(event.target.value);
  setFormData( prevData => ({
    ...prevData,
    specialty: event.target.value
  }))
};
  const handleAppointment = () => {
    console.log("make an apointment!");
  };
  

  // useEffect(() => {
  //   const token = localStorage.getItem("myToken");
  //   if (token) {
  //     const validateToken = async () => {
  //       try {
  //         const response = await fetch(
  //           `${process.env.NEXT_PUBLIC_API_URL}/usuario/validate`,
  //           {
  //             method: "GET",
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         interface ValidateResponse {
  //           ok: boolean;
  //           mensaje: string;
  //           usuario?: any;
  //         }

  //         const data: ValidateResponse = await response.json();

  //         const { usuario } = data;
  //         if (!data.ok) {
  //           localStorage.removeItem("myToken");
  //         } else {
  //           console.log("El usuario es: ", usuario);
  //           if (usuario.tipo_persona_id === 3) {
  //             router.push("/secretaria/dashboard"); // Esto lo manda a la página de secretaria
  //           } else if (usuario.tipo_persona_id === 2) {
  //             router.push("/doctor/dashboard"); // Esto lo manda a la página de doctor
  //           }
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     validateToken();
  //   } else {
  //     console.log("No hay token");
  //   }
  // }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <Card className="bg-secondary p-6">
          <div className="space-y-2 flex flex-col items-center">
            <CalendarCheck className="w-16 h-16 mx-auto text-primary" />
            <h1 className="text-3xl font-bold">Solicitar Turno Médico</h1>
            <p>Completa los detalles para agendar tu cita médica.</p>
          </div>
          <form onSubmit={handleAppointment} className="space-y-4">
            {/* Esto es el campo para el correo */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium flex items-center"
              >
                <User className="w-4 h-4 mr-2 text-primary" />
                Nombre completo del paciente:
              </label>
              <Input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange} // Esto guarda lo que escribe
                placeholder="Ej: Juan Pérez"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium flex items-center"
              >
                <Stethoscope className="w-4 h-4 mr-2 text-primary" />
                Especialidad requerida:
              </label>
              <select name="specialty" id="specialty" className="w-full py-2 px-4 border rounded-md" onChange={handleSelectChange} required>
                {specialties.map((s) => (
                  <option key={s.value} value={s.value} className="bg-secondary focus:bg-primary hover:bg-primary">{s.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)} // Esto guarda si marcó el checkbox
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-primary-700"
                >
                  Recuérdame
                </label>
              </div>
            </div>
            {/* Esto es el botón para enviar el formulario */}
            <Button type="submit" className="w-full cursor-pointer">
              Pedir turno
            </Button>
          </form>
        </Card>
        <div className="space-y-2">
          <Separator />
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex w-full justify-center rounded-md border p-2 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto">
              <ThemeColorToggle />
              <ThemeModeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

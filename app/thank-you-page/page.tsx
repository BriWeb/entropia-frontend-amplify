
"use client"; // pára que Next.js sepa que el codigo se ejecuta en el navegador y no en el servidor

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function AppointmentRequestPage() {
  const router = useRouter();

  const backToHome = () => {
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <Card className="bg-secondary p-6">
          <div className="space-y-2 flex flex-col items-center">
            <CircleCheck className="w-16 h-16 mx-auto text-green-600" />
            <h1 className="text-3xl font-bold">Gracias por elegirnos</h1>
            <p>
              Haz completado la solicitud para un turno médico. Pronto Recepción se comunicará contigo para gestionar y confirmar el turno de la especialidad elegida.
            </p>
          </div>
          <Button className="text-black dark:text-white" onClick={backToHome}>
            Volver a la Landing Page
          </Button>
        </Card>
      </div>
    </div>
  );
}

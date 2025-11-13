"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Usuario } from "@/types/usuario";

interface AuthGuardProps {
  children: React.ReactNode;
}

interface ValidateResponse {
  ok: boolean;
  mensaje: string;
  usuario?: Usuario;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("myToken");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usuario/validate`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data: ValidateResponse = await response.json();

        if (!data.ok) {
          throw new Error(data.mensaje);
        }

        const tipo = data.usuario?.tipo_persona_id;

        const noPermitida =
          (pathname.startsWith("/doctor") && tipo !== 2) ||
          (pathname.startsWith("/secretaria") && tipo !== 3);

        if (noPermitida) {
          console.log("Está en ruta no permitida");
          const destino =
            tipo === 2
              ? "/doctor/dashboard"
              : tipo === 3
              ? "/secretaria/dashboard"
              : "/login";
          router.push(destino);
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("myToken");
        router.push("/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (loading) return null;

  return <>{children}</>;
}

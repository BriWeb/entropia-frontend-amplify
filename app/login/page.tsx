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

export default function LoginPage() {
  const { setUsuario } = useAuth();

  // Acá guardo las herramientas que necesito para cambiar de página y guardar lo que escribe el usuario
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  interface LoginResponse {
    token: string;
    usuario: Usuario;
  }

  const { loading, data, error, fetchNow } = useFetchCallback<LoginResponse>();

  // Esto se ejecuta cuando el usuario hace clic en "Iniciar sesión"
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Acá verifico si el usuario escribió algo en los campos
    if (!email || !password) {
      alert("Por favor ingrese su cuenta y contraseña");
      return;
    }

    fetchNow({
      url: `${process.env.NEXT_PUBLIC_API_URL}/usuario/login`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        usuario: email,
        contrasenia: password,
      },
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const validateToken = async () => {
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

          interface ValidateResponse {
            ok: boolean;
            mensaje: string;
            usuario?: any;
          }

          const data: ValidateResponse = await response.json();

          const { usuario } = data;
          if (!data.ok) {
            localStorage.removeItem("myToken");
          } else {
            console.log("El usuario es: ", usuario);
            if (usuario.tipo_persona_id === 3) {
              router.push("/secretaria/dashboard"); // Esto lo manda a la página de secretaria
            } else if (usuario.tipo_persona_id === 2) {
              router.push("/doctor/dashboard"); // Esto lo manda a la página de doctor
            }
          }
        } catch (error) {
          console.log(error);
        }
      };

      validateToken();
    } else {
      console.log("No hay token");
    }
  }, []);

  useEffect(() => {
    if (data) {
      const { token, usuario } = data;

      // se guarda el token en el localStorage
      localStorage.setItem("myToken", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // se guarda el usuario en el contexto global
      setUsuario(usuario);

      // Acá verifico qué tipo de usuario es para mandarlo a su página
      if (usuario.tipo_persona_id === 3) {
        router.push("/secretaria/dashboard"); // Esto lo manda a la página de secretaria
      } else if (usuario.tipo_persona_id === 2) {
        router.push("/doctor/dashboard"); // Esto lo manda a la página de doctor
      }
    }
  }, [data]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Sistema de turnos</h1>
          <p className="text-gray-500">Inicie sesión en su cuenta</p>
        </div>

        {/* Acá está el formulario dentro de la card blanca */}
        <Card className="bg-secondary p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Esto es el campo para el correo */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-left"
              >
                {/* Correo electrónico */}
                Cuenta
              </label>
              <Input
                id="email"
                // type="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Esto guarda lo que escribe
                // placeholder="correo@ejemplo.com"
                className="w-full"
                required
              />
            </div>
            {/* Esto es el campo para la contraseña */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-left"
              >
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Esto guarda la contraseña
                className="w-full"
                required
              />
            </div>
            {/*  "Recuérdame" y "Olvidó su contraseña" */}
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
              <a href="#" className="text-sm text-primary-700 hover:underline">
                ¿Olvidó su contraseña?
              </a>
            </div>
            {/* Esto es el botón para enviar el formulario */}
            <Button type="submit" className="w-full cursor-pointer">
              Iniciar sesión
            </Button>

            {error && <Error error={error} />}
            {loading && <Loading />}
          </form>
        </Card>

        {/* Acá están los datos de prueba para entrar al sistema */}
        <div className="space-y-2">
          <Separator />
          <h2 className="text-sm font-medium">correo para testear algo</h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md border p-2">
              <p className="font-medium">Recepcionista</p>
              <p>vamado</p>
              <p>1234</p>
            </div>
            <div className="rounded-md border p-2">
              <p className="font-medium">Doctor</p>
              <p>esprado</p>
              <p>1234</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Separator />
          <h2 className="text-sm font-medium">Cambio de color de fondo</h2>
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

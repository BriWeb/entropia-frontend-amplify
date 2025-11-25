/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; // pára que Next.js sepa que el codigo se ejecuta en el navegador y no en el servidor

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button-custom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";

import { useFetchCallback } from "@/hooks/useFetchCallback";
import { ThemeModeToggle } from "@/components/general/theme-mode-toggle";
import { ThemeColorToggle } from "@/components/general/theme-color-toggle";
import { useAuth } from "@/app/context/AuthContext";
import { Usuario } from "@/types/usuario";
import { AtSign, CalendarCheck, IdCard, Stethoscope, User } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { Especialidad } from "@/types/especialidad";

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AppointmentResponse {
  token: string;
  usuario: Usuario;
}

export default function AppointmentRequestPage() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const formSchema = z.object({
    firstName: z
      .string()
      .min(5, "El nombre debe tener al menos 3 caracteres.")
      .max(32, "Has llegado al maximo de caracteres para el nombre."),
    lastName: z
      .string()
      .min(3, "El apellido debe tener al menos 3 caracteres.")
      .max(32),
    idNumber: z
      .string()
      .min(7, "El numero de documento tiene que tener al menos 7 numeros.")
      .max(8, "El numero de documento tiene que tener al menos 7 numeros."),
    email: z.string().email("Email invalido."),
    specialty: z.string().min(1, "Seleccione su especialidad requerida."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      idNumber: "",
      email: "",
      specialty: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(null);


  // const { loading, data, error, fetchNow } = useFetchCallback<LoginResponse>();

  const queryParams = new URLSearchParams();

  const {
    loading: loadingEspecialidades,
    data: dataEspecialidades,
    error: errorEspecialidades,
  } = useFetch<Especialidad[]>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/solicitud/especialidades`,
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <Card className="bg-secondary p-6">
          <div className="space-y-2 flex flex-col items-center">
            <CalendarCheck className="w-16 h-16 mx-auto text-primary" />
            <h1 className="text-3xl font-bold">Solicitar Turno Médico</h1>
            <p>
              Completa los detalles y recepción se comunicara contigo para
              agendar tu cita médica.
            </p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      <User className="w-4 h-4 mr-2 text-primary" />
                      Nombre
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Nombre"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      <User className="w-4 h-4 mr-2 text-primary" />
                      Apellido
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Apellido"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="idNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      <IdCard className="w-4 h-4 mr-2 text-primary" />
                      Documento
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ej: 40112345"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      <AtSign className="w-4 h-4 mr-2 text-primary" />
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ej: juan@gmail.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="specialty"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="form-rhf-select-language">
                        <Stethoscope className="w-4 h-4 mr-2 text-primary" />
                        Especialidad requerida
                      </FieldLabel>
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="form-rhf-select-language"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Especialidad" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectSeparator />
                        {dataEspecialidades &&
                          dataEspecialidades.map((especialidad) => (
                            <SelectItem
                              key={especialidad.id}
                              value={especialidad.id.toString()}
                            >
                              {especialidad.descripcion}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* <div className="flex items-center justify-between">
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
            </div> */}

            {/* Esto es el botón para enviar el formulario */}
            <Button type="submit" className="w-full cursor-pointer">
              Enviar Solicitud
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

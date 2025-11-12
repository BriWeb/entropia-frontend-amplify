"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,0,0,0.02)_0%,_transparent_100%)] dark:bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.02)_0%,_transparent_100%)]"></div>
      </div>

      <main className="h-screen flex items-center px-4 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto ">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black dark:text-white">
              Sistema de Consultas Médicas
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg mt-4 max-w-2xl mx-auto">
              Gestión moderna y eficiente para tu consultorio médico
            </p>
            <Link href="/login" className="inline-block mt-6">
              <Button className="bg-black hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black px-8 py-2 text-sm rounded-full transition-colors cursor-pointer">
                Empezar
              </Button>
            </Link>
          </div>

          {/* Cards con info */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Gestión de Pacientes",
                description:
                  "Administra historiales médicos y datos personales de forma segura y eficiente",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                ),
              },
              {
                title: "Control de Citas",
                description:
                  "Organiza y gestiona las consultas médicas de manera intuitiva",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                ),
              },
              {
                title: "Reportes y Análisis",
                description:
                  "Genera informes detallados y visualiza estadísticas en tiempo real",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4"
                  />
                ),
              },
              {
                title: "Seguridad Avanzada",
                description:
                  "Protección robusta para toda la información médica sensible",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                ),
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group border border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-300"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <div className="p-2 inline-block">
                      <svg
                        className="w-6 h-6 text-black dark:text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {feature.icon}
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-black dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer  */}
      <footer className="fixed bottom-0 left-0 w-full py-4 text-center">
        <p className="text-sm text-neutral-500">© 2025 Entropia</p>
      </footer>
    </div>
  );
}

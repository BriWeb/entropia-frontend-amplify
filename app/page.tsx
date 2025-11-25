/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCard } from "@/components/ui/animated-card";
import InfiniteScroll from "@/components/ui/infinite-carousel";
import PricingCarousel from "@/components/ui/pricing-carousel";
import Image from "next/image";

export default function Home() {
  const testimonials = [
    {
      quote:
        "Se pueden hacer las solitiudes y gestion de turnos en cualquier momento y lugar.",
      name: "Comodidad 24 x 7",
      src: "/images/foto1.jpg",
    },
    {
      quote:
        "Se evitan las esperas para conseguir turno y se optimiza el tiempo entre turnos.",
      name: "Reducción de esperas",
      src: "/images/foto2.jpg",
    },
    {
      quote:
        "Facilidad de manejo de turnos entre recepcion y el equipo médico.",
      name: "Optimización de flujo de trabajo",
      src: "/images/foto4.jpg",
    },
    {
      quote:
        "Se puede modificar el estado del turno de forma simple y con impacto inmediato.",
      name: "Mejor gestión del tiempo médico",
      src: "/images/medicos.png",
    },
        {
      quote:
        "Se mantiene comunicacion constante entre recepcion, médicos y pacientes mediante mails y notificaciones.",
      name: "Recordatorios automáticos",
      src: "/images/foto3.jpg",
    },
  ];

  const navItems = [
    {
      name: "Caracteristicas",
      href: "#features",
    },
    {
      name: "Beneficios",
      href: "#benefits",
    },
    {
      name: "Tecnologias",
      href: "#technologies",
    },
    {
      name: "Precios",
      href: "#pricing",
    },
    {
      name: "Nosotros",
      href: "#members",
    },
  ];

  const featureItems = [
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
  ];

  const membersItems = [
    {
      name: "Jose Martínez",
      description: "Analista de Negocios",
      image: "/images/profile/perfil-jose.jpg",
    },
    {
      name: "Lisett Castillo",
      description: "Product Owner",
      image: "/images/profile/perfil-lisett.jpg",
    },
    {
      name: "Brian Herrera",
      description: "Administrador de Base de Datos",
      image: "/images/profile/perfil-brian.jpg",
    },
    {
      name: "Federico Estevez",
      description: "Desarrollador Backend",
      image: "/images/profile/perfil-fede.jpg",
    },
    {
      name: "Iara Baya",
      description: "Desarrollador Frontend",
      image: "/images/profile/perfil-iara.jpg",
    },
    {
      name: "Luis Herrera",
      description: "Desarrollador Backend",
      image: "/images/profile/perfil-luis.jpg",
    },
  ];
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 antialiased  flex flex-col">
      <nav className="sticky hidden top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 shadow-md md:contents">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-16">
            <a href="#" className="flex items-center space-x-2">
              <svg
                className="w-6 h-6 text-black dark:text-white "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xl font-extrabold text-gray-600 dark:text-white">
                Sistema de{" "}
                <span className="text-blue-600">Consultas Médicas</span>
              </span>
            </a>

            <div>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 dark:text-white hover:text-blue-600 dark:hover:bg-gray-500 transition duration-150 font-medium px-3 py-2 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(
                      item.href.substring(1)
                    );
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-black hover:bg-secondary dark:bg-white dark:hover:bg-blue-800 text-white dark:text-black dark:hover:text-white px-8 py-2 text-sm rounded-full transition-colors cursor-pointer"
                >
                  {" "}
                  Iniciar Sesión{" "}
                </Button>
              </Link>
              <Link href="/appointment">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-black hover:bg-secondary dark:bg-white dark:hover:bg-pink-800 text-white dark:text-black dark:hover:text-white px-8 py-2 text-sm rounded-full transition-colors cursor-pointer"
                >
                  Pedir Turno
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="md:flex md:flex-1 items-center bg-white dark:bg-black pt-20">
        <div className="max-w-6xl mx-auto md:w-full">
          {/* Header Section */}
          <div className="text-center mb-12" id="features">
            <h1 className="text-4xl font-bold text-black dark:text-white">
              Sistema de{" "}
              <span className="text-blue-600">Consultas Médicas</span>
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg mt-4 max-w-2xl mx-auto">
              Gestión moderna y eficiente para tu consultorio médico
            </p>
            {/* Cards con info */}
            <div className="grid grid-cols-1 px-4 md:px-0 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
              {featureItems.map((feature, index) => (
                <Card
                  key={index}
                  className="group border border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-300 shadow-[0_0_8px] shadow-white-400/30"
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

          <div
            className="mx-auto flex flex-col md:flex-row justify-between items-center py-5 md:py-[100px]"
            id="benefits"
          >
            <h3 className="font-medium text-3xl md:text-6xl text-center">
              Beneficios
            </h3>

            <AnimatedCard cardInfo={testimonials} />
          </div>

          <div
            className=" mx-auto flex flex-col md:flex-row justify-between py-5 md:py-[100px] gap-10"
            id="technologies"
          >
            <h3 className="font-medium text-3xl md:text-6xl text-center h-[50px] md:h-[200px] sticky top-[100px] md:top-[300px]">
              Tecnologías
            </h3>
            <div className="flex flex-col  sticky px-4 md:px-0 w-full gap-[80px]">
              <Card className="bg-black border-4 flex flex-col justify-center items-center shadow-[0_0_10px] shadow-orange-400/30  border-orange-400 w-full md:w-[100%] h-[350px] sticky top-[160px] md:top-[300px] rounded-xl text-center text-white font-bold px-20">
                Gestion de versionado con Git
                <img src="/images/logos/git-logo.png" alt="next logo" className="w-80 bg-white rounded-2xl p-2" />

              </Card>
              <Card className="bg-black border-4 flex flex-col justify-center items-center  shadow-[0_0_10px] shadow-indigo-400/30  border-indigo-400 w-full md:w-[100%] h-[350px] sticky top-[180px] md:top-[320px] rounded-xl text-center text-white font-bold px-20">
                Base de Datos SQL server
                <img src="/images/logos/sql-server-logo.png" alt="next logo" className="w-60 bg-white rounded-2xl p-2" />

              </Card>
              <Card className="bg-black border-4 flex flex-col justify-center items-center  shadow-[0_0_10px] shadow-blue-400/30  border-blue-400 w-full md:w-[100%] h-[350px] sticky top-[200px] md:top-[340px] rounded-xl text-center text-white font-bold px-20">
                Containers de Docker
                <img src="/images/logos/docker-logo.png" alt="next logo" className="w-80 bg-white rounded-2xl p-2" />

              </Card>
              <Card className="bg-black border-4 flex flex-col justify-center items-center  shadow-[0_0_10px] shadow-green-400/30  border-green-400 w-full md:w-[100%] h-[350px] sticky top-[220px] md:top-[360px] rounded-xl text-center text-white font-bold px-20">
                Back end con Express y Node.js
                <img src="/images/logos/node-logo.png" alt="next logo" className="w-80 bg-white rounded-2xl p-2" />

              </Card>
              <Card className="bg-black border-4 flex flex-col justify-center items-center  shadow-[0_0_10px] shadow-slate-400/30  border-slate-400 w-full md:w-[100%] h-[350px] sticky top-[240px] md:top-[380px] rounded-xl text-center text-white font-bold px-20">
                Front end con Next.js (framework de React)
                <img src="/images/logos/next-logo.png" alt="next logo" className="w-60" />
              </Card>
            </div>
          </div>

          {/* Carousel infinito con Servicios de Amazon */}
          <div>
            <InfiniteScroll />
          </div>

          {/* Carousel con Pricing: planes de contratacion */}
          <div id="pricing">
            <PricingCarousel />
          </div>

          <div className="text-center mb-12" id="members">
            <h2 className="text-4xl font-bold text-black dark:text-white">
              Nuestro Equipo
            </h2>
            {/* Cards con info */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {membersItems.map((member, index) => (
                <Card
                  key={index}
                  className="w-[250px] border border-neutral-200 dark:border-primery bg-transparent hover:bg-neutral-50 dark:hover:bg-primary/30 transition-all duration-300 shadow-[0_0_10px] shadow-white-400/30"
                >
                  <CardContent className="p-6 flex flex-col items-center h-full">
                    <Image
                      width={50}
                      height={50}
                      className="w-40 h-40 rounded-full"
                      src={member.image}
                      alt={`foto de ${member.name}`}
                      quality={100}
                      unoptimized= {true}
                    />

                    <h3 className="text-lg font-medium text-black dark:text-white my-3">
                      {member.name}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mb-12" id="members">
            <h2 className="text-4xl font-bold text-black dark:text-white">
              Live Demo
            </h2>
            <div className="flex items-center justify-center gap-2 py-10">
              <Link href="/login">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-black hover:bg-secondary dark:bg-white dark:hover:bg-blue-800 text-white dark:text-black dark:hover:text-white px-8 py-2 text-sm rounded-full transition-colors cursor-pointer"
                >
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/appointment">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-black hover:bg-secondary dark:bg-white dark:hover:bg-pink-800 text-white dark:text-black dark:hover:text-white px-8 py-2 text-sm rounded-full transition-colors cursor-pointer"
                >
                  Pedir Turno
                </Button>
              </Link>
            </div>
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

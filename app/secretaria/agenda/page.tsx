import { Calendar } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";

export default function AgendaPage() {
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("es-ES", { month: "long" });
  const currentYear = currentDate.getFullYear();

  // Generar días del mes actual
  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentYear,
    currentDate.getMonth(),
    1
  ).getDay();
  const calendarDays = Array(daysInMonth)
    .fill(0)
    .map((_, index) => index + 1);

  // Eventos de ejemplo
  const events = [
    { day: 5, time: "09:00", patient: "Juan Pérez", type: "Consulta" },
    { day: 7, time: "10:30", patient: "María López", type: "Control" },
    {
      day: 12,
      time: "15:00",
      patient: "Carlos Rodríguez",
      type: "Tratamiento",
    },
    { day: 15, time: "11:15", patient: "Ana Martínez", type: "Consulta" },
    { day: 20, time: "16:30", patient: "Roberto Silva", type: "Emergencia" },
  ];

  return (
    <AuthGuard>
      <div className="h-full bg-secondary p-8 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Agenda</h1>
          <p className="text-gray-500">
            Visualiza y gestiona los turnos programados
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendario */}
          <div className="lg:col-span-2 bg-card rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold capitalize">
                {currentMonth} {currentYear}
              </h2>
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((day) => (
                <div
                  key={day}
                  className="text-center font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div className="grid grid-cols-7 gap-1">
              {/* Espacios en blanco para alinear con el día de la semana */}
              {Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1)
                .fill(0)
                .map((_, index) => (
                  <div key={`empty-${index}`} className="h-12 p-1"></div>
                ))}

              {/* Días del mes */}
              {calendarDays.map((day) => {
                const isToday = day === currentDate.getDate();
                const hasEvent = events.some((event) => event.day === day);

                return (
                  <div
                    key={day}
                    className={`h-12 p-1 relative border border-gray-100 ${
                      isToday ? "bg-gray-100" : ""
                    }`}
                  >
                    <span
                      className={`
                                            inline-flex items-center justify-center w-8 h-8 rounded-full 
                                            ${
                                              isToday
                                                ? "bg-gray-800 text-white"
                                                : ""
                                            }
                                        `}
                    >
                      {day}
                    </span>
                    {hasEvent && (
                      <span className="absolute bottom-1 right-1 w-2 h-2 bg-gray-500 rounded-full"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Próximos turnos */}
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Próximos turnos</h2>
            <div className="space-y-4">
              {events.slice(0, 3).map((event, index) => (
                <div
                  key={index}
                  className="border-l-4 border-gray-500 pl-4 py-2"
                >
                  <p className="font-medium">{event.patient}</p>
                  <p className="text-sm text-gray-500">
                    <span>
                      {currentMonth} {event.day}, {event.time}
                    </span>{" "}
                    - {event.type}
                  </p>
                </div>
              ))}
              <button className="w-full py-2 bg-input rounded-md hover:text-secondary hover:bg-gray-200 transition-colors">
                Ver todos los turnos
              </button>
            </div>
          </div>
        </div>

        {/* acciones rapida, añadir nuevo turno */}
        <div className="mt-6 bg-card rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Acciones rápidas</h2>
          <div className="flex justify-center">
            <button className="p-4 bg-input rounded-md hover:text-secondary hover:bg-primary transition-colors flex items-center justify-center gap-2">
              <Calendar size={20} />
              <span>Añadir nuevo turno</span>
            </button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

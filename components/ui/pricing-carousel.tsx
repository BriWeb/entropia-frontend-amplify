import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface PricingPlan {
  id: number;
  title: string;
  price: number;
  unit: string;
  description: string;
  features: string[];
  isPopular: boolean;
  color: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
  isActive: boolean;
  isMobile: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    title: "Consultas Básico",
    price: 49,
    unit: "/mes",
    description: "Ideal para clinicas privadas medianas",
    features: [
      "Guardado de turnos",
      "Manejo de estados del turno en vivo",
      "Hasta 10 usuarios profesionales",
    ],
    isPopular: false,
    color: "bg-teal-500",
  },
  {
    id: 2,
    title: "Plan Premium",
    price: 99,
    unit: "/mes",
    description: "El sistema más completo para tu clinica",
    features: [
      "Todo lo incluido en el plan Básico",
      "Consultas Ilimitadas",
      "Usuarios Profesionales Ilimitados",
      "Historial de paciente incluyendo estudios",
    ],
    isPopular: true,
    color: "bg-indigo-600",
  },
  {
    id: 3,
    title: "Familiar Pro",
    price: 189,
    unit: "/mes",
    description: "Ideal para clinicas asociadas a Obras Sociales",
    features: [
      "Todo lo incluido en premium",
      "Manejo de consultas a domicilio (1/mes)",
      "Envio de recetas medicas",
      "Coordinacion con laboratorios para estudios",
    ],
    isPopular: false,
    color: "bg-blue-500",
  },
];

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  index,
  isActive,
  isMobile,
}) => {

  return (
    <motion.div
      className={`relative flex flex-col p-6 bg-white shadow-[0_0_20px] shadow-indigo-400/30 rounded-xl transition-all duration-300 ${
        plan.isPopular ? "border-4 border-indigo-600" : "border border-gray-100"
      } w-full max-w-64 md:max-w-sm`}
      style={{ zIndex: isActive ? 10 : 1 }}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isActive ? 1.05 : 1,
        transition: { duration: 0.5, delay: isMobile ? 0 : index * 0.1 },
      }}
      viewport={{ once: true }}
    >
      {plan.isPopular && (
        <div className="absolute top-0 right-0 -mt-4 -mr-4 px-4 py-1 bg-indigo-600 text-white text-xs font-bold uppercase rounded-full shadow-lg transform rotate-6">
          Más popular
        </div>
      )}

      <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
      <div className="flex justify-center items-baseline mb-6">
        <span className="text-5xl font-extrabold text-gray-900">
          $ {plan.price}
        </span>
        <span className="ml-1 text-xl font-medium text-gray-500">
          {plan.unit}
        </span>
      </div>

      <ul role="list" className="flex-grow space-y-3 mb-2">
        {plan.features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-start"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.6 + index * 0.1 },
            }}
          >
            <Check className="flex-shrink-0 w-5 h-5 text-teal-500" />
            <span className="ml-3 text-sm text-gray-600">{feature}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

//=========================
//   COMPONENTE PRINCIPAL
//=========================
const PricingCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const numPlans: number = pricingPlans.length;

  const paginate = (newDirection: number) => {
    console.log("paginando");
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + newDirection + numPlans) % numPlans;
      console.log(prevIndex, nextIndex);
      return nextIndex;
    });
  };

  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    { offset }: PanInfo
  ) => {
    const swipeThreshold = 50;

    if (offset.x > swipeThreshold) {
      paginate(-1);
    } else if (offset.x < -swipeThreshold) {
      paginate(1);
    }
  };

  return (
    <div className="h-[800px] p-4 sm:p-10 font-sans overflow-hidden">
      <div className="mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-20"
        >
          Elige tu plan segun tus necesidades
        </motion.h2>
        <div className="flex relative w-full justify-center items-center h-full over-flow-">
          <AnimatePresence initial={false}>
            {pricingPlans.map((plan, index) => {
              let offset = index - currentIndex;
              if (offset < -1) offset += numPlans;
              if (offset > 1) offset -= numPlans;

              const zIndex = 10 - Math.abs(offset);
              const isCurrent = currentIndex === index;

              return (
                <motion.div
                  key={plan.id}
                  className="absolute h-full"
                  initial={{ opacity: 0, scale: 0.95, x: 0 }}
                  animate={{
                    x: `${offset * 40 }%`,
                    opacity: 1 - Math.abs(offset) * 0.4,
                    y: index === 1 ? -10 : 0,
                    scale: 1 - Math.abs(offset) * 0.15,
                    zIndex: zIndex,
                    filter: `brightness(${100 - Math.abs(offset) * 20}%)`,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.3 },
                  }}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping:30},
                    scale: { type: "spring", stiffness: 300, damping:30},
                    opacity: { duration: 0.2}
                  }}
                  style={{  
                    transform: `translateX(${offset * 50}%)`,
                    zIndex: index === 1 ? 20 : index === 0 ? 10 : 5,
                    rotateY: (index - 1) * 5, // ligera rotacion para efecto 3D
                    y: index === 1 ? -10 : 0,
                  }}
                  whileHover={{
                    y: index === 1 ? -20 : -10,
                    scale: index === 1 ? 1.1 : 1.03,
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25",
                  }}
                  drag={isCurrent ? "x": false}
                  dragConstraints={isCurrent? {left: 0, right: 0} : false}
                  onDragEnd={isCurrent? handleDragEnd : undefined}
                >
                  <PricingCard
                    plan={plan}
                    index={index}
                    isActive={isCurrent}
                    isMobile={true}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
          {/* Botones de navegacion */}
          <button
            className="absolute hidden md:block top-50 left-0 transform -translate-y-1/2 p-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg z-20 transition hover:bg-white text-gray-700 ml-2"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute hidden md:block top-50 right-0 transform -translate-y-1/2 p-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg z-20 transition hover:bg-white text-gray-700 ml-2"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute top-110 flex items-center h-10 gap-4 p-3 bg-white/70 rounded-full shadow-lg z-20 transition">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full coursor-pointer transition-colors ${
                  currentIndex === index
                    ? "bg-indigo-600 scale-110"
                    : "bg-gray-600 hover:bg-gray-900"
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCarousel;

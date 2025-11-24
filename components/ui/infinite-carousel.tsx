import { animate, useMotionValue } from "framer-motion";
import { CarouselCard } from "./carousel-card";
import useMeasure from "react-use-measure";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const awsItems = [
  {
    awsTech: "EC2",
    description: "Instancias de servidor para la ejecución de la aplicación.",
    image: "/images/ec2-icon.png",
  },
  {
    awsTech: "RDS",
    description: "Base de datos SQL Server.",
    image: "/images/rds-icon.png",
  },
  {
    awsTech: "VPC",
    description: "Red virtual aislada y privada donde se lanzan los recursos de AWS.",
    image: "/images/vpc-icon.png",
  },
  {
    awsTech: "Amplify",
    description: "Plataforma para construir, lanzar y alojar aplicaciones web y móviles.",
    image: "/images/amplify-icon.png",
  },
  {
    awsTech: "ECS",
    description: "Para administrar y escalar aplicaciones en contenedores Docker.",
    image: "/images/ecs-icon.png",
  },
  {
    awsTech: "Internet Gateway",
    description: "Componente para la comunicacion entre la VPC e internet.",
    image: "/images/gateway-icon.png",
  },
];

const FAST_DURATION = 25;
const SLOW_DURATION = 75;

export default function InfiniteScroll() {
  const [duration, setDuration] = useState(FAST_DURATION);

  const [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    let controls;
    const finalPosition = -width / 2 - 6;

    if (mustFinish) {
      controls = animate(xTranslation,[xTranslation.get(), finalPosition], {
        ease: 'linear',
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        }
      })
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls.stop;
  }, [xTranslation, width, duration, rerender, mustFinish]);

  return (
    <div className="overflow-hidden bg-black flex ">
      <motion.ul
        className="flex gap-5 text-white py-10 animate-loop-scroll"
        ref={ref}
        style={{ x: xTranslation }}
        onHoverStart={() => {
          setMustFinish(true);
          setDuration(SLOW_DURATION)
        }}
        onHoverEnd={() => {
          setMustFinish(true);
          setDuration(FAST_DURATION);
        }}
      >
        {[...awsItems, ...awsItems].map((item, index) => (
          <li key={index}>
            <CarouselCard
              title={item.awsTech}
              description={item.description}
              image={item.image}
            />
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

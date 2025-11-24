import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  image: string;
}

export const CarouselCard: React.FC<CardProps> = ({
  title,
  description,
  image,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <motion.div
      className="relative overflow-hidden border border-white shadow-[0_0_5px] shadow-white-50/50 md:shadow-none rounded-2xl h-[350px] md:h-[200px] min-w-[200px] bg-black-400 flex flex-col justify-center items-center"
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
    >
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="absolute inset-0 z-10 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute bg-black pointer-events-none opacity-80  h-full w-full flex flex-col justify-center items-center ">
              <motion.div
                className="w-full flex flex-col justify-center items-center "
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                exit={{ y: 10 }}
              >
                <h3 className="font-bold">{title}</h3>
                <p className="text-center">{description}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Image src={image} alt={image}  width={100} height={100} className="bg-white w-48 h-48 md:w-full md:h-full object-cover rounded-full md:rounded-2xl px-1 md:px-0 " />
      <div className="flex flex-col items-center mt-2 md:hidden ">
        <h3 className="font-bold mb-2">{title}</h3>
        <p className="text-center text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

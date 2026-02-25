import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BreathingOrbs from "./BreathingOrbs";

const statusMessages = [
  "Reading your PDFs...",
  "Crunching the numbers...",
  "Identifying hidden fees...",
  "Detecting 'Gastos Hormiga'...",
  "Calculating your freedom date...",
  "Optimizing wealth strategy...",
];

interface ProcessingViewProps {
  onComplete: () => void;
}

const ProcessingView = ({ onComplete }: ProcessingViewProps) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => {
        if (prev >= statusMessages.length - 1) return prev;
        return prev + 1;
      });
    }, 1500);

    const timeout = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      <BreathingOrbs className="w-64 h-64 mb-12" layoutId="breathing-orbs" />

      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        className="text-foreground font-medium text-lg tracking-wide"
      >
        {statusMessages[messageIndex]}
      </motion.p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {statusMessages.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i <= messageIndex ? "bg-primary scale-100" : "bg-border scale-75"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProcessingView;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      {/* Breathing orbs */}
      <div className="relative w-64 h-64 mb-12">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="absolute w-40 h-40 rounded-full animate-breathe"
            style={{ background: "hsl(252 80% 80% / 0.4)", filter: "blur(40px)" }}
          />
          <div
            className="absolute w-48 h-48 rounded-full animate-breathe-slow"
            style={{ background: "hsl(220 80% 78% / 0.35)", filter: "blur(50px)" }}
          />
          <div
            className="absolute w-36 h-36 rounded-full animate-breathe-alt"
            style={{ background: "hsl(30 80% 80% / 0.3)", filter: "blur(40px)" }}
          />
          <div
            className="absolute w-32 h-32 rounded-full animate-breathe"
            style={{
              background: "hsl(252 56% 57% / 0.25)",
              filter: "blur(35px)",
              animationDelay: "1s",
            }}
          />
        </div>
      </div>

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

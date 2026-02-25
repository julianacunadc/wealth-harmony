interface BreathingOrbsProps {
  className?: string;
}

const BreathingOrbs = ({ className = "w-64 h-64" }: BreathingOrbsProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute w-[62.5%] h-[62.5%] rounded-full animate-breathe"
          style={{ background: "hsl(252 80% 80% / 0.4)", filter: "blur(40px)" }}
        />
        <div
          className="absolute w-[75%] h-[75%] rounded-full animate-breathe-slow"
          style={{ background: "hsl(220 80% 78% / 0.35)", filter: "blur(50px)" }}
        />
        <div
          className="absolute w-[56.25%] h-[56.25%] rounded-full animate-breathe-alt"
          style={{ background: "hsl(30 80% 80% / 0.3)", filter: "blur(40px)" }}
        />
        <div
          className="absolute w-[50%] h-[50%] rounded-full animate-breathe"
          style={{
            background: "hsl(252 56% 57% / 0.25)",
            filter: "blur(35px)",
            animationDelay: "1s",
          }}
        />
      </div>
    </div>
  );
};

export default BreathingOrbs;

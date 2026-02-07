import { motion } from "framer-motion";

const GaugeChart = ({ score = 65, maxScore = 100 }: { score?: number; maxScore?: number }) => {
  const percentage = score / maxScore;
  const angle = percentage * 180;

  const getLabel = () => {
    if (percentage >= 0.8) return "Excellent";
    if (percentage >= 0.6) return "Optimizable";
    if (percentage >= 0.4) return "Neutral";
    return "At Risk";
  };

  const getColor = () => {
    if (percentage >= 0.8) return "hsl(152 50% 50%)";
    if (percentage >= 0.6) return "hsl(252 56% 57%)";
    if (percentage >= 0.4) return "hsl(42 80% 60%)";
    return "hsl(0 65% 60%)";
  };

  // SVG arc
  const cx = 120, cy = 110, r = 85;
  const startAngle = Math.PI;
  const endAngle = Math.PI + (angle * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);
  const largeArc = angle > 180 ? 1 : 0;

  return (
    <div className="flex flex-col items-center">
      <svg width="240" height="140" viewBox="0 0 240 140">
        {/* Background arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="hsl(240 10% 92%)"
          strokeWidth="18"
          strokeLinecap="round"
        />
        {/* Value arc */}
        <motion.path
          d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
          fill="none"
          stroke={getColor()}
          strokeWidth="18"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="-mt-14 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-4xl font-bold text-foreground"
        >
          {score}
        </motion.span>
        <span className="text-lg text-muted-foreground font-medium">/{maxScore}</span>
      </div>
      <p className="text-sm font-medium text-muted-foreground mt-1">{getLabel()}</p>
    </div>
  );
};

export default GaugeChart;

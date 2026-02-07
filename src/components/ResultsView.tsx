import { motion } from "framer-motion";
import { AlertTriangle, Wallet, Eye, TrendingUp, TrendingDown } from "lucide-react";
import GaugeChart from "./GaugeChart";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const ResultsView = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4 md:px-8 py-10 max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Your Financial Overview</h1>
        <p className="text-muted-foreground mt-1">Analysis complete — here's what we found.</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Health Score */}
        <motion.div variants={item} className="wealth-card p-8 flex flex-col items-center justify-center md:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Financial Wellness Score</p>
          <GaugeChart score={65} />
        </motion.div>

        {/* Key Metrics */}
        <motion.div variants={item} className="flex flex-col gap-4 md:col-span-1">
          <div className="surplus-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-wealth-surplus/30 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-wealth-surplus-fg" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Monthly Revenue</p>
              <p className="text-2xl font-bold text-foreground">$19.5M</p>
            </div>
          </div>

          <div className="deficit-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-wealth-deficit/30 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-wealth-deficit-fg" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Monthly Commitments</p>
              <p className="text-2xl font-bold text-foreground">$12.3M</p>
            </div>
          </div>
        </motion.div>

        {/* Action Plan */}
        <motion.div variants={item} className="md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Prioritized Action Plan</p>
          <div className="space-y-3">
            <ActionCard
              priority="high"
              icon={<AlertTriangle className="w-5 h-5" />}
              title="Stop the Bleeding"
              description="Refinance the $9.6M Credit Card debt immediately. You are paying ~24% EA."
            />
            <ActionCard
              priority="medium"
              icon={<Wallet className="w-5 h-5" />}
              title="Optimize Liquidity"
              description="Use your Stori income to clear the Sufi loan faster."
            />
            <ActionCard
              priority="insight"
              icon={<Eye className="w-5 h-5" />}
              title='The "Jineteo" Alert'
              description="We detected a $4.3M Mercado Pago move. Be careful with debt cycling."
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const priorityStyles = {
  high: {
    card: "deficit-card",
    badge: "bg-wealth-deficit/20 text-wealth-deficit-fg",
    label: "High Priority",
  },
  medium: {
    card: "warning-card",
    badge: "bg-wealth-warning/20 text-wealth-warning-fg",
    label: "Medium Priority",
  },
  insight: {
    card: "wealth-card",
    badge: "bg-accent text-accent-foreground",
    label: "Insight",
  },
};

const ActionCard = ({
  priority,
  icon,
  title,
  description,
}: {
  priority: "high" | "medium" | "insight";
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  const style = priorityStyles[priority];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`${style.card} p-5 flex items-start gap-4`}
    >
      <div className="w-10 h-10 rounded-xl bg-card/80 border border-border/40 flex items-center justify-center shrink-0 mt-0.5 text-foreground">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-foreground text-sm">{title}</h3>
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.badge}`}>
            {style.label}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default ResultsView;

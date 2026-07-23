import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [step, setStep] = useState(0);
  const steps = [
    "Analisando desenho técnico...",
    "Extraindo lista de materiais e posições...",
    "Comparando dados com o Jobbook oficial...",
    "Gerando relatório de conformidade..."
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="bg-surface p-12 rounded-2xl shadow-sm border border-border w-full max-w-md text-center flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-secondary animate-spin mb-6" />
        
        <div className="h-8 mb-6">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg font-medium text-gray-800"
          >
            {steps[step]}
          </motion.p>
        </div>

        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}

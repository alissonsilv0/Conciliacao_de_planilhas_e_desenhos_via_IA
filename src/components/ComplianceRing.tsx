interface ComplianceRingProps {
  percentage: number;
}

export function ComplianceRing({ percentage }: ComplianceRingProps) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let color = 'text-danger';
  if (percentage >= 95) color = 'text-success';
  else if (percentage >= 80) color = 'text-warning';

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90 w-40 h-40">
        <circle
          className="text-gray-100"
          strokeWidth="12"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="80"
          cy="80"
        />
        <circle
          className={`${color} transition-all duration-1000 ease-out`}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="80"
          cy="80"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Index</span>
      </div>
    </div>
  );
}

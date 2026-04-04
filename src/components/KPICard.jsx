import { ArrowUpRight, ArrowDownRight } from '@phosphor-icons/react';

const KPICard = ({ title, value, icon, bgColor, colorClass, change, isPositive }) => {
  return (
    <div className="card p-6 flex justify-between items-center relative overflow-hidden group">
      {/* Background glow effect */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-xl transition-all duration-500 group-hover:scale-150 ${bgColor}`}></div>
      
      <div className="flex flex-col gap-2 z-10 w-full">
        <div className="text-sm font-medium text-text-secondary">{title}</div>
        <div className="flex items-end justify-between w-full">
          <div className="text-3xl font-bold text-text-primary">{value}</div>
          <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-[rgba(34,197,94,0.1)] text-status-available' : 'bg-[rgba(239,68,68,0.1)] text-status-occupied'}`}>
            {isPositive ? <ArrowUpRight weight="bold" /> : <ArrowDownRight weight="bold" />}
            <span className="ml-1">{change}%</span>
          </div>
        </div>
      </div>

      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl z-10 ml-4 shadow-sm ${bgColor} ${colorClass}`}>
        {icon}
      </div>
    </div>
  );
};

export default KPICard;

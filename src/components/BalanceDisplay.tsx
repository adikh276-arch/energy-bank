import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { getBalanceColor } from '@/hooks/useEnergyStore';

interface BalanceDisplayProps {
  balance: number;
  startingEnergy: number;
  isInDebt: boolean;
  compact?: boolean;
}

export function BalanceDisplay({ balance, startingEnergy, isInDebt, compact }: BalanceDisplayProps) {
  const displayNum = useAnimatedNumber(balance);
  const colorClass = getBalanceColor(balance);
  const pct = Math.max(0, Math.min(100, (balance / Math.max(startingEnergy, 1)) * 100));

  return (
    <div className={compact ? "flex items-center gap-3" : "flex flex-col items-center gap-3"}>
      <div className={compact ? "flex items-baseline gap-1.5" : "flex items-baseline gap-2"}>
        <span className={`font-mono font-bold tracking-tight ${colorClass} ${compact ? 'text-2xl' : 'text-5xl'} balance-pulse`}>
          {isInDebt && '−'}{Math.abs(displayNum)}
        </span>
        <span className={`text-muted-foreground ${compact ? 'text-xs' : 'text-sm'}`}>units</span>
      </div>

      {isInDebt && (
        <span className="text-xs font-semibold text-debt uppercase tracking-wider debt-shake">
          ⚠️ Energy Debt
        </span>
      )}

      {!compact && (
        <div className="w-full max-w-xs">
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                isInDebt ? 'bg-debt' :
                pct > 60 ? 'bg-surplus' :
                pct > 30 ? 'bg-energy-medium' :
                pct > 15 ? 'bg-energy-low' :
                'bg-energy-critical'
              }`}
              style={{ width: `${Math.max(isInDebt ? 0 : 2, pct)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>{startingEnergy} (start)</span>
          </div>
        </div>
      )}
    </div>
  );
}

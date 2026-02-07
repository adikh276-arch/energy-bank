import { useDarkMode } from '@/hooks/useDarkMode';
import { Switch } from '@/components/ui/switch';
import { DUMMY_INSIGHTS } from '@/lib/dummy-data';

export function ProfileTab() {
  const { isDark, toggle } = useDarkMode();

  const achievements = [
    { emoji: '📊', name: 'First Week Tracked', desc: 'Tracked energy for 7 consecutive days' },
    { emoji: '🛡️', name: 'Crash Prevented', desc: 'Heeded a warning and rested in time' },
    { emoji: '📈', name: 'ROI Positive', desc: 'Made an energy investment that paid off' },
  ];

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Profile</h2>
        <p className="text-sm text-muted-foreground">Settings & achievements</p>
      </div>

      {/* Quick stats */}
      <div className="bg-card border border-border/50 rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Your Energy Profile</h3>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="font-mono font-bold text-2xl text-primary">{DUMMY_INSIGHTS.avgDailyEnergy}</p>
            <p className="text-xs text-muted-foreground">Avg daily energy</p>
          </div>
          <div>
            <p className="font-mono font-bold text-2xl text-foreground">{DUMMY_INSIGHTS.capacityPercent}%</p>
            <p className="text-xs text-muted-foreground">Of normal capacity</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Chronic illness range: 40–80 units/day
        </p>
      </div>

      {/* Settings */}
      <div className="bg-card border border-border/50 rounded-xl p-4 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Settings</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">Dark mode</p>
            <p className="text-xs text-muted-foreground">Easier on the eyes</p>
          </div>
          <Switch checked={isDark} onCheckedChange={toggle} />
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">🏆 Achievements Unlocked</h3>
        {achievements.map(a => (
          <div key={a.name} className="bg-card border border-border/50 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">{a.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-foreground">{a.name}</p>
              <p className="text-xs text-muted-foreground">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Export */}
      <div className="bg-card border border-border/50 rounded-xl p-4 space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Data</h3>
        <p className="text-xs text-muted-foreground">All data is stored locally on your device.</p>
        <button className="text-sm text-primary font-medium hover:underline">
          Export data as JSON
        </button>
      </div>
    </div>
  );
}

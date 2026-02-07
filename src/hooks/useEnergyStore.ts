import { useState, useCallback } from 'react';
import { Transaction, DayRecord, EnergyTag, EnergyZone } from '@/lib/types';
import { TODAY_RECORD, hasCheckedInToday } from '@/lib/dummy-data';
import { DEFAULT_ACTIVITIES } from '@/lib/activities';

const TODAY = '2026-02-07';

function loadDay(): DayRecord {
  const stored = localStorage.getItem('energy-day-' + TODAY);
  if (stored) return JSON.parse(stored);
  // Save dummy data initially
  localStorage.setItem('energy-day-' + TODAY, JSON.stringify(TODAY_RECORD));
  return TODAY_RECORD;
}

function saveDay(record: DayRecord) {
  localStorage.setItem('energy-day-' + TODAY, JSON.stringify(record));
}

export function getEnergyZone(balance: number, startingEnergy: number): EnergyZone {
  const pct = startingEnergy > 0 ? (balance / startingEnergy) * 100 : 0;
  if (balance <= 0) return 'critical';
  if (pct >= 60) return 'high';
  if (pct >= 30) return 'medium';
  if (pct >= 15) return 'low';
  return 'critical';
}

export function getBalanceColor(balance: number): string {
  if (balance <= 0) return 'text-debt';
  if (balance >= 60) return 'text-surplus';
  if (balance >= 30) return 'text-energy-medium';
  if (balance >= 10) return 'text-energy-low';
  return 'text-energy-critical';
}

export function useEnergyStore() {
  const [dayRecord, setDayRecord] = useState<DayRecord>(loadDay);
  const [checkedIn, setCheckedIn] = useState(hasCheckedInToday);
  const [crashMode, setCrashMode] = useState(false);

  const balance = dayRecord.transactions.length > 0
    ? dayRecord.transactions[dayRecord.transactions.length - 1].balanceAfter
    : dayRecord.startingEnergy;

  const isInDebt = balance < 0;
  const debtAmount = isInDebt ? Math.abs(balance) : 0;

  const logActivity = useCallback((activityId: string) => {
    const activity = DEFAULT_ACTIVITIES.find(a => a.id === activityId);
    if (!activity) return;

    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const newBalance = balance - activity.cost; // cost is positive for spending, negative for recovery

    const transaction: Transaction = {
      id: 'tx-' + Date.now(),
      activityId: activity.id,
      activityName: activity.name,
      emoji: activity.emoji,
      cost: activity.cost,
      time,
      balanceAfter: newBalance,
      timestamp: Date.now(),
    };

    setDayRecord(prev => {
      const updated = {
        ...prev,
        transactions: [...prev.transactions, transaction],
      };
      saveDay(updated);
      return updated;
    });
  }, [balance]);

  const deleteTransaction = useCallback((txId: string) => {
    setDayRecord(prev => {
      const txIndex = prev.transactions.findIndex(t => t.id === txId);
      if (txIndex === -1) return prev;
      
      const newTransactions = prev.transactions.filter(t => t.id !== txId);
      // Recalculate balances
      let runningBalance = prev.startingEnergy;
      const recalculated = newTransactions.map(t => {
        runningBalance -= t.cost;
        return { ...t, balanceAfter: runningBalance };
      });
      
      const updated = { ...prev, transactions: recalculated };
      saveDay(updated);
      return updated;
    });
  }, []);

  const completeCheckIn = useCallback((energy: number, tags: EnergyTag[]) => {
    const newRecord: DayRecord = {
      date: TODAY,
      startingEnergy: energy,
      expectedEnergy: 60,
      transactions: [],
      tags,
      isCrashMode: false,
    };
    saveDay(newRecord);
    setDayRecord(newRecord);
    setCheckedIn(true);
    localStorage.setItem('energy-checkin', JSON.stringify({ date: TODAY }));
  }, []);

  const toggleCrashMode = useCallback(() => {
    setCrashMode(prev => !prev);
  }, []);

  return {
    dayRecord,
    balance,
    isInDebt,
    debtAmount,
    checkedIn,
    crashMode,
    logActivity,
    deleteTransaction,
    completeCheckIn,
    toggleCrashMode,
  };
}

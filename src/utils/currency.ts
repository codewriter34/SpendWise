import type { Currency } from '../types/transaction';

export const CURRENCIES: { value: Currency; label: string; symbol: string }[] = [
  { value: 'XAF', label: 'Central African CFA Franc', symbol: 'FCFA' },
];

export const formatCurrency = (amount: number, currency: Currency): string => {
  const currencyInfo = CURRENCIES.find(c => c.value === currency);

  if (!currencyInfo) return `${amount.toFixed(2)}`;

  // Only XAF is supported now
  return `${currencyInfo.symbol} ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export const getCurrencySymbol = (currency: Currency): string => {
  const currencyInfo = CURRENCIES.find(c => c.value === currency);
  return currencyInfo?.symbol || '';
};

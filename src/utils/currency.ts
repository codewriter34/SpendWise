import type { Currency } from '../types/transaction';

export const CURRENCIES: { value: Currency; label: string; symbol: string }[] = [
  { value: 'XAF', label: 'Central African CFA Franc', symbol: 'FCFA' },
];

export const formatCurrency = (amount: number, currency: string = 'XAF'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getCurrencySymbol = (currency: Currency): string => {
  const currencyInfo = CURRENCIES.find(c => c.value === currency);
  return currencyInfo?.symbol || '';
};

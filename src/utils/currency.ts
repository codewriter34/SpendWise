import type { Currency } from '../types/transaction';

export const CURRENCIES: { value: Currency; label: string; symbol: string }[] = [
  { value: 'XAF', label: 'Central African CFA Franc', symbol: 'FCFA' },
  { value: 'USD', label: 'US Dollar', symbol: '$' },
  { value: 'NGN', label: 'Nigerian Naira', symbol: '₦' },
  { value: 'EUR', label: 'Euro', symbol: '€' },
];

export const formatCurrency = (amount: number, currency: Currency): string => {
  const currencyInfo = CURRENCIES.find(c => c.value === currency);
  
  if (!currencyInfo) return `${amount.toFixed(2)}`;

  switch (currency) {
    case 'XAF':
      return `${currencyInfo.symbol} ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    case 'USD':
      return `${currencyInfo.symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'NGN':
      return `${currencyInfo.symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'EUR':
      return `${currencyInfo.symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    default:
      return `${amount.toFixed(2)}`;
  }
};

export const getCurrencySymbol = (currency: Currency): string => {
  const currencyInfo = CURRENCIES.find(c => c.value === currency);
  return currencyInfo?.symbol || '';
};

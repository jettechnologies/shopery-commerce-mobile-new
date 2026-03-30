import { formatDistanceToNow, isToday, isYesterday, parseISO } from "date-fns";

export function formatRelativeDate(dateString: string): string {
  const date = parseISO(dateString);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  return formatDistanceToNow(date, { addSuffix: true });
}

export type CurrencyOptions = {
  currency?: "NGN" | "USD" | "GBP" | "EUR";
  compact?: boolean;
};

interface FormatCurrencyProps {
  amount: number;
  currencyOptions?: CurrencyOptions;
  maxFractionDigits?: number;
}

export const formatCurrency = ({
  amount,
  currencyOptions,
  maxFractionDigits = 0,
}: FormatCurrencyProps) => {
  const positiveAmount = Math.abs(amount);

  const { currency = "NGN", compact = false } = currencyOptions ?? {};

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: maxFractionDigits,
  }).format(positiveAmount);
};

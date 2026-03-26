// export const BLUR_HASH =
//   "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const BLUR_HASH = "LBI}}R.AE3r:V?tRRks+tTs+xVRn";

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

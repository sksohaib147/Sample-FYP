// Current exchange rate (you might want to fetch this from an API in production)
const USD_TO_PKR_RATE = 278.50; // 1 USD = 278.50 PKR

export const convertUSDToPKR = (usdAmount) => {
  return Math.round(usdAmount * USD_TO_PKR_RATE);
};

export const convertPKRToUSD = (pkrAmount) => {
  return Math.round((pkrAmount / USD_TO_PKR_RATE) * 100) / 100;
};

export const formatCurrency = (amount, currency = 'PKR') => {
  const formatter = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
};

export const formatUSD = (amount) => {
  return formatCurrency(amount, 'USD');
};

export const formatPKR = (amount) => {
  return formatCurrency(amount, 'PKR');
};

// Format price in PKR
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(price);
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Format price range
export const formatPriceRange = (min, max) => {
  if (!min && !max) return '';
  if (!min) return `Up to ${formatPrice(max)}`;
  if (!max) return `From ${formatPrice(min)}`;
  return `${formatPrice(min)} - ${formatPrice(max)}`;
};

// Format large numbers with K/M/B suffix
export const formatLargeNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}; 
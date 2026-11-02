/**
 * Format price in Indian Rupee format (Cr / L / K) or standard currency
 */
export const formatPrice = (price, currency = 'INR') => {
  if (price === null || price === undefined || isNaN(price)) return '₹0';
  
  const num = Number(price);

  if (currency === 'INR') {
    if (num >= 10000000) {
      const cr = (num / 10000000).toFixed(2);
      return `₹${parseFloat(cr)} Cr`;
    } else if (num >= 100000) {
      const lakh = (num / 100000).toFixed(2);
      return `₹${parseFloat(lakh)} Lac`;
    } else if (num >= 1000) {
      const k = (num / 1000).toFixed(1);
      return `₹${parseFloat(k)}k`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(num);
};

/**
 * Format full exact currency with commas
 */
export const formatExactCurrency = (amount) => {
  if (!amount && amount !== 0) return '₹0';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
};

/**
 * Format area in square feet
 */
export const formatArea = (sqft) => {
  if (!sqft) return '0 sq.ft';
  return `${Number(sqft).toLocaleString('en-IN')} sq.ft`;
};

/**
 * Format readable dates
 */
export const formatDate = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Relative time ago
 */
export const formatTimeAgo = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
};

/**
 * Truncate long strings
 */
export const truncateText = (str, maxLength = 60) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};

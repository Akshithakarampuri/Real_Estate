/**
 * Calculate Monthly EMI, Total Interest, and Total Payable
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate in percentage (e.g. 8.5)
 * @param {number} tenureYears - Loan tenure in years (e.g. 20)
 */
export const calculateEMI = (principal, annualRate, tenureYears) => {
  const p = Number(principal);
  const r = Number(annualRate) / (12 * 100); // monthly interest
  const n = Number(tenureYears) * 12; // total months

  if (p <= 0 || r <= 0 || n <= 0) {
    return {
      monthlyEmi: 0,
      totalInterest: 0,
      totalPayment: p,
      principal: p,
    };
  }

  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - p;

  return {
    monthlyEmi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    principal: Math.round(p),
  };
};

/**
 * Generate yearly amortization breakdown
 */
export const getAmortizationSchedule = (principal, annualRate, tenureYears) => {
  const p = Number(principal);
  const r = Number(annualRate) / (12 * 100);
  const n = Number(tenureYears) * 12;
  
  if (p <= 0 || r <= 0 || n <= 0) return [];

  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  let balance = p;
  const schedule = [];

  for (let year = 1; year <= tenureYears; year++) {
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;

    for (let m = 0; m < 12; m++) {
      const interest = balance * r;
      const principalPaid = emi - interest;
      yearlyInterest += interest;
      yearlyPrincipal += principalPaid;
      balance -= principalPaid;
      if (balance < 0) balance = 0;
    }

    schedule.push({
      year: `Year ${year}`,
      principalPaid: Math.round(yearlyPrincipal),
      interestPaid: Math.round(yearlyInterest),
      remainingBalance: Math.round(balance),
    });
  }

  return schedule;
};

const roundUp = (amount, digits) => {
  const factor = 10 ** digits;
  return (Math.round(amount * factor + 0.5) / factor).toFixed(digits);
}

export { roundUp }
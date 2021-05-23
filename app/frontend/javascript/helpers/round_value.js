function roundValue (value, digitsAfterDot = 0) {
  const precisionCoef = 10 ** digitsAfterDot;

  return Math.round((value + Number.EPSILON) * precisionCoef) / precisionCoef;
}

export default roundValue;
